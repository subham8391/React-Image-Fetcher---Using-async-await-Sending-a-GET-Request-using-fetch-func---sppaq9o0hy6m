import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { Loader } from './Loader';
import { PhotoFrame } from './PhotoFrame';

const App = () => {
  const [inputNumber, setInputNumber] = useState('');
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputNumber(event.target.value);
  };

  useEffect(() => {
    if (inputNumber) {
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/photos/${inputNumber}`)
        .then(response => response.json())
        .then(data => {
          setPhotoData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [inputNumber]);

  return (
    <div className="app">
      <input
        type="number"
        placeholder="Enter a number between 1 and 5000"
        value={inputNumber}
        onChange={handleInputChange}
      />
      {loading ? <Loader /> : null}
      {photoData && <PhotoFrame url={photoData.url} title={photoData.title} />}
    </div>
  );
}

export default App;
