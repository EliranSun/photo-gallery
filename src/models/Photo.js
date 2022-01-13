class Photo {
  constructor({ id = "", title = "", url = "", isNew = false }) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.isNew = isNew;
  }
}

export default Photo;
