import React, { Component } from 'react';
import Base64Uploader from './Base64Uploader';
import MyDropzone from './dropzone';
import TextUploader from './TextUploader';
import HashUploader from './HashUploader';
import { Tabs, Icon, Input } from 'antd';
import sha256 from 'sha256';

import './styles.css';
import DocumentUploader from './DocumentUploader';

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    callback(key) {
        console.log(key);
    }
    handleUploadChange = (fileData, isHash) => {
        //isHash false by default
        let hash;
        if (isHash) {
            hash = fileData
        } else {
            hash = sha256(fileData);
        }
        // this.setState({ hash: hash })
        this.props.updateHash(hash);
        console.log("hash", hash)
    
    }

    handleCommentChange (e) {
        console.log(e.target.value)
        this.props.handleCommentChange(e.target.value);
    }



    render() {
        const TabPane = Tabs.TabPane
        const { TextArea } = Input;
        return (
<div class="uploader">
    <div class="form">
        <div className="card-container">
                <Tabs type="card" defaultActiveKey="1" onChange={this.callback} >
                    <TabPane tab={<span><Icon type="upload" />Upload</span>} key="1">
                        {/* <Base64Uploader
                            handleUploadChange={this.handleUploadChange}
                        ></Base64Uploader> */}
                        <MyDropzone
                        handleUploadChange={this.handleUploadChange}
                        ></MyDropzone>
                        {/* <DocumentUploader
                        handleUploadChange={this.handleUploadChange}
                        >
                        </DocumentUploader> */}
                    </TabPane>
                    <TabPane  key="2" tab={<span><Icon type="edit" />Text</span>}>
                        <TextUploader 
                        handleUploadChange={this.handleUploadChange}
                        />
                    </TabPane>
                    <TabPane tab={<span><Icon type="lock" />Hash</span>}key="3">
                        <HashUploader 
                        handleUploadChange={this.handleUploadChange}
                        />
                    </TabPane>
                </Tabs>
        </div>
    
        <div class="content">
                <p> comments (optional) </p>
                <TextArea rows={4} onChange={this.handleCommentChange.bind(this)} />
        </div>
    </div>
       
    {this.props.hash &&
        <span class="hash">
            your hash: {this.props.hash}
            <Icon type="question-circle" />
        </span>}
</div>
        )
    }
}

export default Uploader;
