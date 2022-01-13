import "./App.css";

import { useState } from "react";
import { PhotosContext, PhotosGallery } from "./components";

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState({});
  const [photos, setPhotos] = useState([]);

  return (
    <PhotosContext.Provider
      value={{ selectedPhoto, setSelectedPhoto, setPhotos, photos }}>
      <PhotosGallery />
    </PhotosContext.Provider>
  );
}

export default App;
