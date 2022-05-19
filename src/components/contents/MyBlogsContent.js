import ContentStyles from "./Content.module.css";
import { MyBlogCard } from "../cards/MyBlogCard";

export const MyBlogsContent = function () {
  const arr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];

  return (
    <div className={ContentStyles.content_grid}>
      {arr.map(() => (
        <MyBlogCard />
      ))}
    </div>
  );
};
