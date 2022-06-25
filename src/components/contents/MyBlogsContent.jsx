import { contentTypes } from "../../redux/slices/content/contentsSlice";
import { ContentUiGenerater } from "./ContentUiGenerater";

export const MyBlogsContent = function () {
  return <ContentUiGenerater contentType={contentTypes.myBlogs} />;
};
