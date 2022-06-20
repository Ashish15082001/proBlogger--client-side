export const urls = {
  trending: { url: "/trending" },
  blogs: { url: "/blogs" },
  favourites: { url: "/user/:userId/favourites" },
  userBlogs: { url: "/user/:userId/blogs" },
  account: { url: "/user/:userId/account" },
};

export const jwtKey = "proBlogger token";
export const userIdKey = "user id";
export const contentTypes = {
  blogs: "blogsContent",
  trending: "trendingContent",
  favourites: "favouritesContent",
  myBlogs: "myBlogsContent",
};
