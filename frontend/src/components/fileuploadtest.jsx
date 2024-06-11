import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadPercentage(0);
    setMessage('');
  };

  const handleFileUpload = () => {
    if (!file) {
      setMessage('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/upload', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadPercentage(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        setMessage('File successfully uploaded');
      } else {
        setMessage('Failed to upload file');
      }
    };

    xhr.onerror = () => {
      setMessage('Failed to upload file');
    };

    xhr.send(formData);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {message && <p>{message}</p>}
      {uploadPercentage > 0 && (
        <div>
          <p>Upload Progress: {uploadPercentage}%</p>
          <progress value={uploadPercentage} max="100">{uploadPercentage}%</progress>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
