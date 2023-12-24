import React from 'react';

function SimpleFileUpload(props) {
  return (
    <div>
      <input type="file" onChange={props.onFileUpload} />
    </div>
  );
}

export default SimpleFileUpload;