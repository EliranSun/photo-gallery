import { createContext } from "react";

export const PhotosContext = createContext({
  photos: [],
  selectedPhoto: {},
  setPhotos: () => {},
  setSelectedPhoto: () => {},
});
