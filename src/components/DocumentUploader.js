import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import FileReader from 'filereader';



class DocumentUploader extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
handleChange(info) {
        let fileList = info.fileList;
        //limit number of uploaded files
        fileList = fileList.slice(-1);

      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            // do whatever you want with the file content
            console.log("file read", reader.result)
            this.props.handleUploadChange(reader.result);
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        console.log("binary string", reader.readAsBinaryString(info.file));
    

      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }


render() {
    const Dragger = Upload.Dragger;
    
    const props = {
     name: 'file',
     multiple: true,
     action: '//jsonplaceholder.typicode.com/posts/',
  onChange: this.handleChange.bind(this)
    }
   
    return (
        <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
      </Dragger>
    );
}
}

export default DocumentUploader;
