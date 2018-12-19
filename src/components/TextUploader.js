import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';



class TextForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();
    }

handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
            this.props.handleUploadChange(values.text);
        }
    })
}



render() {
    const FormItem = Form.Item;
    const { TextArea } = Input;
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
                label="enter text"
            >
                {getFieldDecorator('text', {
                    rules: [{
                        required: true, message: 'Please input some text',
                    }],
                })(
                    
                    <TextArea rows={4}  />
                )}
            </FormItem>
            <FormItem>
                <Button
                    type="default"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                >
                    Done
            </Button>
            </FormItem>
        </Form>
    );
}
}
const TextUploader = Form.create()(TextForm);
export default TextUploader;
