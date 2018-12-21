import React from 'react'
import classNames from 'classnames'
import { Steps, Button, message } from 'antd';

class StepButtons extends React.Component {

  /* 
  props

  current // required
  stepsLength // required
  next // required
  prev // required
  nextText
  htmlType
  disabled

  */
   render() {
    return (
        <div class={"steps-action"}>
        {
          this.props.current < this.props.stepsLength - 1
          && <Button 
          type="primary" 
          htmlType={this.props.htmlType} 
          disabled={this.props.disabled}
          onClick={() => this.props.next()}>
            {this.props.nextText || "Next"}
          </Button>
        }
        {
          this.props.current === this.props.stepsLength - 1
          && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
        }
        {
          this.props.current > 0
          && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.props.prev()}>
              Previous
          </Button>
          )
        }
      </div>
    );
  }
}
export default StepButtons