import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WrappedTimestampForm from './components/TimestampForm';
import Uploader from './components/Uploader';
import Confirmation from './components/Confirmation';
import axios from 'axios';
/**
 * start browser with command 
 *  chromium-browser --disable-web-security --user-data-dir=""

 */
import { Steps, Button, message } from 'antd';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,

    };
  }

//step component related
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }



  componentDidMount() {
  
  }

  //form related
  updateHash(hash) {
    this.setState({ hash: hash });
  }

  handleCommentChange(comment) {
    this.setState({ comment: comment });
  }

  updateUpload(type, data){
    const upload = {
      type: type,
      data: data
    }
    this.setState({
      upload: upload
    });
  }

  render() {
    const { current } = this.state;
    const Step = Steps.Step;
   
    const steps = [{
      title: 'Upload',
      content: <Uploader
        updateHash={this.updateHash.bind(this)}
        hash={this.state.hash}
        handleCommentChange={this.handleCommentChange.bind(this)}
        updateUpload={this.updateUpload.bind(this)}
        next={this.next.bind(this)}
        prev={this.prev.bind(this)}
        current={this.state.current} // required
        stepsLength={3} // required
        upload={this.state.upload}
      ></Uploader>,
    }, {
      title: 'Submit',
      content: <WrappedTimestampForm 
        hash={this.state.hash}
        comment={this.state.comment}
        next={this.next.bind(this)}
        prev={this.prev.bind(this)}
        current={this.state.current} // required
        stepsLength={3} // required
       
        ></WrappedTimestampForm>,
    }, {
      title: 'Done',
      content: <Confirmation 
      hash={this.state.hash}
      next={this.next.bind(this)}
      prev={this.prev.bind(this)}
      current={this.state.current} // required
      stepsLength={3} // required
      ></Confirmation>,
    }];

    return (
      <div class={"body"}>
      <div class={"modal"}>
        <Steps current={current}>
          {steps.map(item => <Step 
          key={item.title} 
          title={item.title}
          />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        {/* <div className="steps-action">
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
        </div> */}
        </div>
      </div>
    );
  }
}




export default App;
