import React from 'react';
 
import FileBase64 from 'react-file-base64';
 
class Base64Uploader extends React.Component {
 
  constructor() {
    super()
    this.state = {
      files: []
    }
  }
 
  // Callback~
  getFiles(files){
    this.setState({ files: files })
    console.log(files)
    //limit to 1
    this.props.handleUploadChange(files[0].base64)
  }
 
  render() {
    return (
      <FileBase64
        multiple={ true }
        onDone={ this.getFiles.bind(this) } />
    )
  }
 
}
export default Base64Uploader 