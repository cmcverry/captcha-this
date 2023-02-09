import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import Grid from './components/Grid/Grid';
import react, { useState } from 'react';


function App() {

  const [images, setImages] = useState(null);

  const handleImages = (arr) => {
    setImages(arr);
  }

  return (
    <div className="App">
      <Header/>
      <SearchBar handleImages={handleImages}/>
      { (images) ? <Grid imageList={images} handleImages={handleImages} /> : null }
    </div>
  );
}

export default App;
