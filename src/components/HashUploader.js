import React, { Component } from 'react';
import { Input } from 'antd';



class HashUploader extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }

  handleChange(e){
      console.log("hasher...", e.target.value)
    this.props.handleUploadChange(e.target.value, true);
  }

render() {
  
   
    return (
        <div>
            <span>Enter your own hash</span>
            <Input onChange={this.handleChange.bind(this)}/>
        </div>
    );
}
}

export default HashUploader;
