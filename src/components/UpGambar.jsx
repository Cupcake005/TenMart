import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebaseConfig';

const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState('');

    const handleUpload = () => {
        if (image) {
            const storageRef = ref(storage, `images/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.error('Upload failed:', error);
                    alert('Error uploading image: ' + error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrl(downloadURL);
                        console.log('File available at', downloadURL);
                    });
                }
            );
        } else {
            alert('Please choose a file first!');
        }
    };

    return (
        <div>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            <p>Upload progress: {progress}%</p>
            {url && (
                <div>
                    <p>Uploaded Image URL:</p>
                    <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
