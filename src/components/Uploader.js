import React, { Component } from 'react';
import DragNDrop from './DragNDrop';
import TextUploader from './TextUploader';
import HashUploader from './HashUploader';
import { Tabs, Icon, Input } from 'antd';
import sha256 from 'sha256';
import StepButtons from './StepButtons';

import './styles.css';

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    callback(key) {
        console.log(key);
    }
    handleUploadChange = (fileData, type, isHash) => {
        let hash;
        if (isHash) {
            hash = fileData
        } else {
            hash = sha256(fileData);
        }
        this.props.updateHash(hash);
        // this.props.handleUploadTypeChange(type);
        this.props.updateUpload(type, fileData)
    }

    handleCommentChange(e) {
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

                                <DragNDrop
                                    handleUploadChange={this.handleUploadChange}
                                    upload={this.props.upload}
                                ></DragNDrop>
                            </TabPane>
                            <TabPane key="2" tab={<span><Icon type="edit" />Text</span>}>
                                <TextUploader
                                    handleUploadChange={this.handleUploadChange}
                                    upload={this.props.upload}
                                />
                            </TabPane>
                            <TabPane tab={<span><Icon type="lock" />Hash</span>} key="3">
                                <HashUploader
                                    handleUploadChange={this.handleUploadChange}
                                    upload={this.props.upload}
                                />
                            </TabPane>
                        </Tabs>
                    </div>

                    <div class="content">
                        <p> Description </p>
                        <TextArea rows={4} onChange={this.handleCommentChange.bind(this)} />
                    </div>
                </div>

                {/* {this.props.hash &&
        <span class="hash">
            your hash: {this.props.hash}
            <Icon type="question-circle" />
        </span>} */}
                <StepButtons
                    current={this.props.current}
                    stepsLength={this.props.stepsLength}
                    next={this.props.next}
                    prev={this.props.prev}
                    disabled={!this.props.hash}
                ></StepButtons>
            </div>
        )
    }
}

export default Uploader;
