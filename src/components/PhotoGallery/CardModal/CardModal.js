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
    if (isNew) {
      setUrl("");
      setTitle("");
      return;
    }

    initUrl && setUrl(initUrl);
    initTitle && setTitle(initTitle);
  }, [initUrl, initTitle, isNew]);

  const resetModal = () => {
    setSelectedPhoto({});
    setErrorMessage("");
  };

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
      if (isUrlInPhotos(url, photos)) {
        setErrorMessage(URL_EXIST);
        return;
      }

      if (isTitleInPhotos(title, photos)) {
        setErrorMessage(TITLE_EXIST);
        return;
      }

      setPhotos([
        new Photo({
          id,
          title,
          url,
        }),
        ...photos,
      ]);

      resetModal();
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

    resetModal();
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
        <p className="error">{!!errorMessage && errorMessage}</p>
        <div className="cta-wrapper">
          <button
            className="save-button"
            disabled={url === initUrl && title === initTitle}
            onClick={handleSubmit}>
            {SAVE_BUTTON}
          </button>
          <button onClick={resetModal}>{CANCEL_BUTTON}</button>
        </div>
      </div>
      <div className="backdrop" />
    </>
  );
};

export default PhotoOptionsModal;
