import {
    Form, Icon, Input, Button,
  } from 'antd';
  
  const FormItem = Form.Item;
  
  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  
  class TimestampForm extends React.Component {
    componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    render() {
      const {
        getFieldDecorator, getFieldsError
      } = this.props.form;
  
      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
         
         <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button>
          </FormItem>
        </Form>
      );
    }
  }
  
  const TimestampForm = Form.create()(HorizontalLoginForm);
  export default TimestampForm