import React, { Component } from 'react';

import axios from 'axios';

import './styles.css';


import {
    Form, Icon, Input, Button, Checkbox, Radio
} from 'antd';
import { checkUserCount, createHashCount } from '../util';
import StepButtons from './StepButtons';
import Fingerprint2 from 'fingerprintjs2';
import sha256 from 'sha256';
import Recaptcha from 'react-recaptcha';




class TimestampForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ACCESS_KEY: "1616b5bc-3061-47d5-b7f3-aa4f02e70541",
            MAX_COUNT: 5,
        };
    }

     getmefingerprint2 = async () => {
        const secure = await (new Promise(resolve => {
          Fingerprint2.get((result, components) => { 
              let stringResponse = ""
              result.forEach(item => {
                  console.log(JSON.stringify(item))
                  stringResponse = stringResponse + JSON.stringify(item)
              })
              resolve(stringResponse) 
            })
        }))
        // do things with secure, whatever you return is thenable
        return secure
      }

submit(postData, email) {
    console.log("in submit")
    
    if (!checkUserCount(email, this.state.hashArray, this.state.MAX_COUNT)) {
        alert("sorry you used up all your credits");
        return;
    }
    const apiKey = this.state.ACCESS_KEY;

    const saltedFingerprint = sha256(apiKey + email + this.state.fingerprint);
    console.log(saltedFingerprint)
    var headers = {
        'Content-Type': 'application/json',
        'AccessKey': apiKey,
        'Fingerprint': saltedFingerprint
    }
    console.log("fingerprint",sha256(apiKey + email + this.state.fingerprint))
    axios({
        url: "http://api.mavenstamp.com/v1/timestamp/create",
        method: 'post',
        data: postData,
        headers: headers
    })
    .then(response => {
        console.log(response)
        this.props.next();
        
    })
    .catch(error => console.log(error));
        
}


componentDidMount() {
    const hashArray = createHashCount(this.state.MAX_COUNT)//TODO move to parent if re-rendering
    this.setState({ hashArray: hashArray });
    this.props.form.setFieldsValue({
        notification: "email",
      });

      this.getmefingerprint2()
      .then(res => {
          this.setState({fingerprint: sha256(res)})
      })
      .catch(err => {
          console.log(err)
      })
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
      var callback = function () {
        console.log('Done!!!!');
      };
      
    return (
        <Form class={"timestamp-form"} layout={"inline"} onSubmit={this.handleSubmit}>
       
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
                        <Recaptcha
                    sitekey="6Lf1C4QUAAAAAKKzzNLmDsetPM8ZqMnTbvdZlEub"
                    render="explicit"
                    onloadCallback={callback}
                />
            </FormItem>
            <FormItem>
              
                {/* <StepButtons
                 current={this.props.current} // required
                 stepsLength={this.props.stepsLength} // required
                 next={this.props.next} // required
                 prev={this.props.prev} // required
                 nextText={"Submit"}
                 htmlType={"submit"}
                 disabled={hasErrors(getFieldsError())}
                 ></StepButtons> */}
                 <div classNames="steps-action">
        {
          this.props.current < this.props.stepsLength - 1
          && <Button 
          type="primary" 
          htmlType={"submit"} 
          disabled={hasErrors(getFieldsError())}
        //   onClick={() => this.props.next()}
        //TODO buttons don't connect to form if imported as component
          >
            {this.props.nextText || "Next"}
          </Button>
        }
        {
          this.props.current === this.props.stepsLength - 1
          && <Button type="primary" >Done</Button>
        }
        {
          this.props.current > 0
          && (
            <Button 
            type="button"
            style={{ marginLeft: 8 }} 
            onClick={() => this.props.prev()}>
              Previous
          </Button>
          )
        }
      </div>

            </FormItem>
        </Form>
    );
}
}

const WrappedTimestampForm = Form.create()(TimestampForm);
export default WrappedTimestampForm
