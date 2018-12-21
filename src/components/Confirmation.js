import React from 'react'

import config from '../config';
import { Button } from 'antd';
import axios from 'axios';
import StepButtons from './StepButtons';
import Countdown from './Countdown';



class Confirmation extends React.Component {
//html...

getpdf() {
    const postData = {
      "currency": 0,
      "hash_string":
        this.props.hash,
      "proof_type": 1
    }
    const apiKey = config.ACCESS_KEY;
    var headers = {
      'Content-Type': 'application/json',
      'AccessKey': apiKey
    }
    axios({
      url: "http://api.mavenstamp.com/v1/timestamp/proof",
      method: 'post',
      data: postData,
      headers: headers
    })
      .then(response => {

        console.log(response)
        console.log(typeof response.data)

        const file = new Blob(
          [response.data.body],
          { type: "application/octet-stream" })

        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch(error => console.log(error));
  }

  getNextBatchTime() {
    //create new date with time set to 6pm EST
    let nextBatchTime = new Date();
      if (nextBatchTime.getHours() > 18) {
      nextBatchTime.addDays(1);
    }
    nextBatchTime.setHours(18);
    nextBatchTime.setMinutes(0);
    nextBatchTime.setSeconds(0);
  
    console.log("time ", nextBatchTime.toString())
    return nextBatchTime
}
 
   render() {
      //  const batchTime = config.batch_time;
      //  const now = new DateTime(); TODO
      //  const timeToNotification = now - 12312132;
    return (
     <div class={"confirmation"}>
       <p>{`All transactions are saved at 6:00pm EST`}</p>
       <p>{"Your certificiate of proof is available for download"}</p>
         {`You will receive a notification for your submission in`}
      
         <Countdown
         date={this.getNextBatchTime().toString()}
         ></Countdown>
         <Button type="primary" 
         icon="download" 
         onClick={this.getpdf.bind(this)}
         size={'large'}>Download</Button>

<StepButtons
                 current={this.props.current} // required
                 stepsLength={this.props.stepsLength} // required
                 next={this.props.next} // required
                 prev={this.props.prev} // required
                //  nextText={"Submit"}
                //  htmlType={"submit"}
                //  disabled={hasErrors(getFieldsError())}
                 ></StepButtons>
     </div>
    );
  }
}
export default Confirmation