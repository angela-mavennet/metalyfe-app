import React from 'react'

import config from '../config';
import { Button } from 'antd';
import axios from 'axios';


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
 
   render() {
       const batchTime = config.batch_time;
      //  const now = new DateTime(); TODO
      //  const timeToNotification = now - 12312132;
    return (
     <div>
       <p>{`All transactions are saved at ${batchTime}`}</p>
         {`You will receive a notification for your submission in x hours and y minutes`}
      <p>{"Your certificiate of proof is available for download"}</p>
         
         <Button type="primary" 
         icon="download" 
         onClick={this.getpdf.bind(this)}
         size={'large'}>Download</Button>
     </div>
    );
  }
}
export default Confirmation