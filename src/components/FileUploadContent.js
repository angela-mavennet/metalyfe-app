import React, { Component, PropTypes } from 'react';
import IPFS from 'ipfs';
import streamBuffers from 'stream-buffers';
import ProgressBar from 'progress';


export default class FileUploadInput extends Component {
    static propTypes = {
      readAs: PropTypes.oneOf(['readAsDataURL', 'readAsArrayBuffer', 'readAsBinaryString', 'readAsText']),
      onReadSuccess: PropTypes.func.isRequired,
      onReadFailure: PropTypes.func.isRequired,
      allowMultiple: PropTypes.bool,
      validateFiles: PropTypes.func,
      initialText: PropTypes.string,
      inputProps: PropTypes.object,
      fileInputProps: PropTypes.object,
    };
  
    static defaultProps = {
      readAs: 'readAsArrayBuffer',
      allowMultiple: false,
      validateFiles: files => null,
      initialText: '',
      inputProps: {},
      fileInputProps: {},
    };
  
    node: any;
    stream: any;
  
    state = {
      progress: 0,
      totalFileSize: 0,
    };
  
    constructor(props) {
      super(props);
      this.state = { text: props.initialText, files: [] };
  
      // use random repo to initialize ipfs
      const repoPath = 'ipfs-' + Math.random();
      this.node = new IPFS({ repo: repoPath });
  
      // 'ready' will trigger after ipfs has start connecting to other peer
      this.node.on('ready', () => console.log('Online status: ', this.node.isOnline() ? 'online' : 'offline'));
    }
  
    /** 3.put file into IPFS */
    uploadIPFS = (fileArrayBuffer: ArrayBuffer): Promise<Buffer> => {
      return new Promise((resolve, reject) => {
        // set progress
        this.setState({ progress: 0 });
        // create stream that used to change progress
        const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
          chunkSize: 25000,
        });
        // set progress
        myReadableStreamBuffer.on('data', (chunk: Buffer) => {
          this.setState({ progress: this.state.progress + chunk.byteLength });
          myReadableStreamBuffer.resume();
        });
  
  
        this.stream = this.node.files.addReadableStream();
        // resolve after file has uploaded
        this.stream.on('data', (file: Buffer) => resolve(file));
  
        // put file stream into IPFS's stream
        this.stream.write(myReadableStreamBuffer);
        myReadableStreamBuffer.put(Buffer.from(fileArrayBuffer));
  
        // close it after uploading
        myReadableStreamBuffer.on('end', () => this.stream.end());
        myReadableStreamBuffer.stop();
      });
    };
  
    /** 2.prepare file for IPFS uploading */
    readFile(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = event => resolve(this.uploadIPFS(event.target.result));
        fileReader.onerror = reject;
        fileReader[this.props.readAs](file);
      });
    }
  
    /** clear display */
    resetState() {
      this.setState({ text: '', files: [] });
    }
  
    /** 1.get file from <input/> */
    async handleChange(event: SyntheticInputEvent<EventTarget>) {
      // dealwith errors
      const files: File[] = Array.from(event.target.files);
      if (!files.length) {
        return this.resetState();
      }
      const errMsg = this.props.validateFiles(files);
      if (errMsg) {
        this.resetState();
        return this.props.onReadFailure(errMsg);
      }
  
      // update display
      const text = files.length > 1 ? `${files.length} files...` : files[0].name;
      this.setState({ text, files });
  
      // set progress's total size
      let totalFileSize = 0;
      files.forEach(file => {
        totalFileSize += file.size;
      });
      this.setState({ totalFileSize });
      // put file
      try {
        const response = await Promise.all([...files.map(aFile => this.readFile(aFile))]);
        this.props.onReadSuccess(response);
      } catch (err) {
        this.resetState();
        this.props.onReadFailure(err.message);
      }
    }
  
    render() {
      return (
        <span className={this.props.className}>
          {/* input used for display */}
          <input
            placeholder={this.props.allowMultiple ? 'Select files' : 'Select a file'}
            value={this.state.text}
            readOnly
            onClick={() => this.fileInput.click()}
            {...this.props.inputProps}
          />
          {/* input used for upload */}
          <input
            style={{ display: 'none' }}
            ref={el => (this.fileInput = el)}
            type="file"
            multiple={this.props.allowMultiple}
            onChange={e => this.handleChange(e)}
            {...this.props.fileInputProps}
          />
          <ProgressBar progress={this.state.progress} total={this.state.totalFileSize} />
        </span>
      );
    }
  }