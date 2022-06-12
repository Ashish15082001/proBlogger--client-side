import ContentStyles from "./Content.module.css";
import { FavouriteBlogCard } from "../cards/FavouriteBlogCard";

export const FavouritesContent = function () {
  const arr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];

  return (
    <ul className={ContentStyles.content_grid}>
      {arr.map((item) => (
        <li key={item}>
          <FavouriteBlogCard />
        </li>
      ))}
    </ul>
  );
};
