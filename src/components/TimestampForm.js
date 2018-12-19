import React, { Component } from 'react';

import axios from 'axios';

import './styles.css';


import {
    Form, Icon, Input, Button, Checkbox, Radio
} from 'antd';
import { checkUserCount, createHashCount } from '../util';

class TimestampForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ACCESS_KEY: "1616b5bc-3061-47d5-b7f3-aa4f02e70541",
            MAX_COUNT: 5,
            notification: "anonymous"
        };
    }

submit(postData, email) {
    // console.log("in submit method, postData", postData)
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
        .then(response => console.log(response))
        .catch(error => console.log(error));
}

componentDidMount() {
    const hashArray = createHashCount(this.state.MAX_COUNT)//TODO move to parent if re-rendering
    this.setState({ hashArray: hashArray });
}

handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if(!this.props.hash){
         alert("enter a hash")//todo validate in step 1 anyway
        }
        if (!err) {
            // console.log('Received values of form: ', values);
         
            //form postdata and submit
            console.log("notifications", values.email)
            const postData = {
                "comment": "create with existing hash",
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
        this.setState({
          notification: e.target.value,
        });  
}



render() {
    const FormItem = Form.Item;
    const RadioGroup = Radio.Group;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    //TODO how to generate certificate URL

    function hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    const {
        getFieldDecorator, getFieldsError
    } = this.props.form;

    return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem
          {...formItemLayout}
          label="Notification"
        >
          {getFieldDecorator('notification')(
            <RadioGroup  onChange={this.onNotificationChange.bind(this)} value={this.state.notification}>
              <Radio value="anonymous">Do not notify me/Anonymous</Radio>
              <Radio value="email">Notify me by email</Radio>
            </RadioGroup>
          )}
        </FormItem>
            {this.state.notification=="email" && <FormItem
                {...formItemLayout}
                label="E-mail"
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        required: this.state.notification == "email", message: 'Please input your E-mail!',
                    }],
                })(
                    <Input />
                )}
            </FormItem>}
            <FormItem
            label="create certificate"
            >   {getFieldDecorator('certificateURL', {})(
                <Checkbox/>
            )}
            </FormItem>
            <FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                >
                    Submit
            </Button>
            </FormItem>
        </Form>
    );
}
}

const WrappedTimestampForm = Form.create()(TimestampForm);
export default WrappedTimestampForm
