import React, { Component } from 'react';

import axios from 'axios';

import './styles.css';


import {
    Form, Icon, Input, Button, Checkbox, Radio
} from 'antd';
import { checkUserCount, createHashCount } from '../util';
import StepButtons from './StepButtons';

class TimestampForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ACCESS_KEY: "1616b5bc-3061-47d5-b7f3-aa4f02e70541",
            MAX_COUNT: 5,
        };
    }

submit(postData, email) {
    console.log("in submit")
    this.props.next();
    if (!checkUserCount(email, this.state.hashArray, this.state.MAX_COUNT)) {
        alert("sorry you used up all your credits");
        return;
    }
    const apiKey = this.state.ACCESS_KEY;
    var headers = {
        'Content-Type': 'application/json',
        'AccessKey': apiKey
    }
    axios({
        url: "http://api.mavenstamp.com/v1/timestamp/create",
        method: 'post',
        data: postData,
        headers: headers
    })
    .then(response => {
        console.log(response)
        
    })
    .catch(error => console.log(error));
        
}


componentDidMount() {
    const hashArray = createHashCount(this.state.MAX_COUNT)//TODO move to parent if re-rendering
    this.setState({ hashArray: hashArray });
    // console.log("form", this.props.form)
    // console.log(this.props.form.getFieldValue("notification"))
    this.props.form.setFieldsValue({
        notification: "email",
      });
}

handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
     
        if (!err) {
            console.log("notifications", values.email)
            const postData = {
                "comment": this.props.comment,
                "notifications": [
                    {
                        "currency": 0,
                        "notification_type": 0,
                        "target": values.email
                    }
                ],
                "hash": this.props.hash
            }
            this.submit(postData, values.email);
        }
    });

}

onNotificationChange(e) {
        console.log('radio checked', e.target.value);
      
        // handleSelectChange = (value) => {
        //     console.log(value);
            this.props.form.setFieldsValue({
              notification: e.target.value,
            });
        //   }
}



render() {
    const FormItem = Form.Item;
    const RadioGroup = Radio.Group;

    //TODO how to generate certificate URL

    function hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    const {
        getFieldDecorator, getFieldsError
    } = this.props.form;
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
      };
    return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem
          {...formItemLayout}
          label="Notification"
        >
          {getFieldDecorator('notification', {
              rules: [{ required: true, message: 'Please select a notification option' }]
          })(
            <RadioGroup  onChange={this.onNotificationChange.bind(this)}>
             <Radio value="email">Notify me by email</Radio>
              <Radio value="anonymous">Do not notify me/Anonymous</Radio>
            </RadioGroup>
          )}
        </FormItem>
            {this.props.form.getFieldValue("notification")=="email" && <FormItem
             
                label="E-mail"
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        required: this.props.form.getFieldValue("notification") == "email", message: 'Please input your E-mail!',
                    }],
                })(
                    <Input />
                )}
            </FormItem>}
         
            <FormItem>
              
                <StepButtons
                 current={this.props.current} // required
                 stepsLength={this.props.stepsLength} // required
                 next={this.props.next} // required
                 prev={this.props.prev} // required
                 nextText={"Submit"}
                 htmlType={"submit"}
                 disabled={hasErrors(getFieldsError())}
                 ></StepButtons>

            </FormItem>
        </Form>
    );
}
}

const WrappedTimestampForm = Form.create()(TimestampForm);
export default WrappedTimestampForm
