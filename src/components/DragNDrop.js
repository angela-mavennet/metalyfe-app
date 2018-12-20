import React from 'react'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import SHA256 from "crypto-js/sha256";





class DragNDrop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
}

  type="File Upload"

  componentDidMount() {
    if(this.props.upload) {
        if(this.props.upload.type == this.type) {
            this.setState({
                value: this.props.upload.data
            })
        }
    }
    
    }

   onDrop = acceptedFiles => {
    acceptedFiles.forEach(file => {
      console.log("file", file)
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            // do whatever you want with the file content
            console.log("file read", reader.result)
            this.props.handleUploadChange(reader.result, this.type);
            //have to save file.name as well...file object...
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(file);
        this.setState({fileName: file.name})
    });}

  



   render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div
              {...getRootProps()}
              className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
            >
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop files here...</p> :
                  <p>Try dropping some files here, or click to select files to upload.</p>
              }
              {this.state.fileName && <div>
                {this.state.fileName}
              </div>}
            </div>
          )
        }}
      </Dropzone>
    );
  }
}
export default DragNDrop