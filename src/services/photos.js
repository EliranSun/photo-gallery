import axios from "axios";
import { PHOTOS_URL } from "../constants/photos";
import Photo from "../models/Photo";

export const getPhotos = async () => {
  try {
    const { data } = await axios.get(PHOTOS_URL);
    return data.map((photo) => new Photo(photo));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
