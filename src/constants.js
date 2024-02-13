export const urls = {
  trending: { url: "/trending" },
  blogs: { url: "/blogs" },
  favourites: { url: "/user/:userId/favourites" },
  userBlogs: { url: "/user/:userId/blogs" },
  account: { url: "/user/:userId/account" },
  publishBlog: { url: "/user/:userId/publishBlog" },
  blog: { url: "/blog/:blogId" },
};

export const jwtKey = "proBlogger token";
export const userIdKey = "user id";

export const serverDomain = "https://problogger-server-side-production.up.railway.app/";
// export const serverDomain = "https://problogger-by-ashish.herokuapp.com/";
// export const serverDomain = "http://localhost:3001/";
