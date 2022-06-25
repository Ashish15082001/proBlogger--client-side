import { contentTypes } from "../../redux/slices/content/contentsSlice";
import { ContentUiGenerater } from "./ContentUiGenerater";

export const FavouritesContent = function () {
  // return <h5>{contentTypes.favourites}</h5>;
  return <ContentUiGenerater contentType={contentTypes.favourites} />;
};
