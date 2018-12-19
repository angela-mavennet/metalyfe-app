import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WrappedTimestampForm from './components/TimestampForm';
import Uploader from './components/Uploader';
/**
 * start browser with command 
 *  chromium-browser --disable-web-security --userata-dir=""

 */
import { Steps, Button, message } from 'antd';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  updateHash(hash) {
    this.setState({ hash: hash });
  }

  handleCommentChange(comment) {
    this.setState({comment: comment});
    console.log("comment changed to", comment)
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }



  render() {
    const { current } = this.state;
    const Step = Steps.Step;
    const steps = [{
      title: 'First',
      content: <Uploader 
                updateHash={this.updateHash.bind(this)} 
                hash={this.state.hash}
                handleCommentChange={this.handleCommentChange.bind(this)}
                ></Uploader>,
    }, {
      title: 'Second',
      content: <WrappedTimestampForm hash={this.state.hash}></WrappedTimestampForm>,
    }, {
      title: 'Last',
      content: 'Last-content',
    }];

    return (
      <div class={"body"}>
      <h1>Try Mavenstamp</h1>
      <p>some info</p>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
        </div>
      </div>
    );
  }
}




export default App;
