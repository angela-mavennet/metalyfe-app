import React from 'react'
import classNames from 'classnames'
import DropzoneStyled from 'react-dropzone-styled'
import SHA256 from "crypto-js/sha256";





class MyDropzone extends React.Component {

    

   onDrop = acceptedFiles => {
    acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            // do whatever you want with the file content
            console.log("file read", reader.result)
            this.props.handleUploadChange(reader.result);
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(file);
    });}


   render() {
    return (
      <DropzoneStyled onDrop={this.onDrop}>
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
            </div>
          )
        }}
      </DropzoneStyled>
    );
  }
}
export default MyDropzone