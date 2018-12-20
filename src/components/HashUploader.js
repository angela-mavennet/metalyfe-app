import React, { Component } from 'react';
import { Input } from 'antd';



class HashUploader extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    type = "Hash"
    componentDidMount() {
        if(this.props.upload) {
            if(this.props.upload.type == this.type) {
                this.setState({
                    value: this.props.upload.data
                })
            }
        }
        
        }

  handleChange(e){
      console.log("hasher...", e.target.value)
    this.props.handleUploadChange(e.target.value, this.type, true);
  }

render() {
  
   //TODO set input to value
    return (
        <div>
            <span>Enter your own hash</span>
            <Input onChange={this.handleChange.bind(this)}/>
        </div>
    );
}
}

export default HashUploader;
