import { useState, useEffect, useContext } from "react";
import { ReactComponent as PhotocopySvg } from "../../../photocopy.svg";
import { PhotosContext } from "..";
import {
  INVALID_URL,
  MISSING_FIELDS,
  URL_EXIST,
  TITLE_EXIST,
} from "../../../constants/errors";

import "./CardModal.css";
import { isValidUrl } from "../../../utils/url";
import { isTitleInPhotos, isUrlInPhotos } from "../../../utils/photos";
import Photo from "../../../models/Photo";
import { CANCEL_BUTTON, SAVE_BUTTON } from "../../../constants/photos";

const PhotoOptionsModal = () => {
  const { selectedPhoto, setSelectedPhoto, setPhotos, photos } =
    useContext(PhotosContext);
  const { id, title: initTitle, url: initUrl, isNew } = selectedPhoto;

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    initUrl && setUrl(initUrl);
    initTitle && setTitle(initTitle);
  }, [initUrl, initTitle]);

  const handleSubmit = () => {
    const isTitleChanged = initTitle !== title;
    const isUrlChanged = initUrl !== url;

    if (!url || !title) {
      setErrorMessage(MISSING_FIELDS);
      return;
    }

    if (!isValidUrl(url)) {
      setErrorMessage(INVALID_URL);
      return;
    }

    if (isNew) {
      setPhotos([
        new Photo({
          id,
          title,
          url,
        }),
        ...photos,
      ]);
      setSelectedPhoto({});
      return;
    }

    if (isUrlChanged && isUrlInPhotos(url, photos)) {
      setErrorMessage(URL_EXIST);
      return;
    }

    if (isTitleChanged && isTitleInPhotos(title, photos)) {
      setErrorMessage(TITLE_EXIST);
      return;
    }

    setPhotos(
      photos.map((photo) => {
        if (photo.id === id) {
          return new Photo({
            ...photo,
            title,
            url,
          });
        }

        return photo;
      })
    );

    setSelectedPhoto({});
  };

  if (!id) {
    return null;
  }

  return (
    <>
      <div className="photo-options-modal">
        <div className="frame">
          <PhotocopySvg width="70%" />
        </div>
        <div className="photo-info">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="text"
            placeholder="Url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          <input type="text" placeholder="Id" disabled value={id} />
        </div>
        {!!errorMessage && <p className="error">{errorMessage}</p>}
        <div className="cta-wrapper">
          <button
            className="save-button"
            disabled={url === initUrl && title === initTitle}
            onClick={handleSubmit}>
            {SAVE_BUTTON}
          </button>
          <button onClick={() => setSelectedPhoto({})}>{CANCEL_BUTTON}</button>
        </div>
      </div>
      <div className="backdrop" />
    </>
  );
};

export default PhotoOptionsModal;
