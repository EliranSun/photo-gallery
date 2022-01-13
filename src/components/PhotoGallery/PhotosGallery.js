import { useContext, useEffect, lazy, Suspense, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ErrorBoundary } from "../ErrorBoundary";
import { CardModal } from "./CardModal";
import { Loader } from "../Loader";
import { PhotosContext } from ".";
import { getPhotos } from "../../services/photos";

import "./PhotosGallery.css";
import { ReactComponent as CameraPlusLogo } from "../../camera-plus.svg";
import Photo from "../../models/Photo";
const Card = lazy(() => import("./Card/Card"));

const ITEMS_PER_PAGE = 20;
const SCROLL_THRESHOLD = 100;
const INIT_THRESHOLD = 500;

const PhotosGallery = () => {
  const { setPhotos, photos, setSelectedPhoto } = useContext(PhotosContext);
  const [itemsToRenderLimit, setItemsToRenderLimit] = useState(ITEMS_PER_PAGE);
  const [threshold, setThreshold] = useState(INIT_THRESHOLD);

  useEffect(() => {
    getPhotos()
      .then((photos) => setPhotos(photos))
      .catch((error) => console.error(error));
  }, [setPhotos]);

  return (
    <ErrorBoundary>
      <div
        className="photos-gallery"
        onScroll={(event) => {
          if (event.target.scrollTop > threshold) {
            setItemsToRenderLimit(itemsToRenderLimit + ITEMS_PER_PAGE);
            setThreshold(event.target.scrollHeight - SCROLL_THRESHOLD);
          }
        }}>
        <Suspense fallback={<Loader />}>
          {photos.slice(0, itemsToRenderLimit).map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </Suspense>
      </div>
      <button
        className="add-button"
        onClick={() => {
          setSelectedPhoto(
            new Photo({
              id: uuidv4(),
              title: "",
              url: "",
              isNew: true,
            })
          );
        }}>
        <CameraPlusLogo />
      </button>
      <CardModal />
    </ErrorBoundary>
  );
};

export default PhotosGallery;
