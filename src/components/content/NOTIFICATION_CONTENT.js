import { BLOG_CARD } from "../card/BLOG_CARD";

export const NOTIFICATION_CONTENT = function () {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return arr.map(() => <BLOG_CARD />);
};
