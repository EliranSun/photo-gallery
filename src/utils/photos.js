export const isUrlInPhotos = (url, photos) => {
  return photos.some((photo) => photo.url === url);
};

export const isTitleInPhotos = (title, photos) => {
  return photos.some((photo) => photo.title === title);
};
