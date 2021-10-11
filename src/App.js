import React, {useState} from 'react'
import {storage} from './firebase/index'

function App() {
  const [image, setImage] = useState(null);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const uploadHandler = e => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {},
      err => console.log(err),
      () => {
        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url => console.log(url))        
      }
    )
  }

  console.log(image)

  return (
    <form onSubmit={uploadHandler}>
      <input type="file" onChange={handleChange} />
      <button>Submit</button>
    </form>
  );
}

export default App;
