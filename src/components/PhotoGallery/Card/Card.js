import { useState, useContext } from "react";
import { PhotosContext } from "..";
import { DELETE_BUTTON, EDIT_BUTTON } from "../../../constants/photos";

const PhotoCard = ({ id, title, url }) => {
  const { setSelectedPhoto, photos, setPhotos } = useContext(PhotosContext);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div key={id} className={`photo-card ${isLoading && "loading"}`}>
      <img onLoad={() => setIsLoading(false)} src={url} alt={title} />
      <div className="photo-card-content">
        <h3>{title}</h3>
        <p>{url}</p>
      </div>
      <footer>
        <button
          className="edit-button"
          onClick={() => setSelectedPhoto({ id, title, url })}>
          {EDIT_BUTTON}
        </button>
        <button
          className="delete-button"
          onClick={() => {
            setPhotos(photos.filter(({ id: photoId }) => photoId !== id));
          }}>
          {DELETE_BUTTON}
        </button>
      </footer>
    </div>
  );
};

export default PhotoCard;
