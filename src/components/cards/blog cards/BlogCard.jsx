import { useSelector, useDispatch } from "react-redux";
import { serverDomain } from "../../../constants";
import BlogCardStyles from "./BlogCard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "../../Avatar/Avatar";
import { userStatus } from "../../../redux/slices/user/userSlice";
import { showToast } from "../../../redux/slices/toast/toastSlice";

export const BlogCard = function ({ blogId, contentType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedBlogData = useSelector(
    (state) => state.contents.contentCache[blogId]
  );
  const isLoggedIn = useSelector((state) => state.user.status);
  const pageNumber = new URLSearchParams(location.search).get("pageNumber")
    ? new URLSearchParams(location.search).get("pageNumber")
    : 1;

  return (
    <div
      onClick={() => {
        if (isLoggedIn !== userStatus.loggedIn)
          return dispatch(
            showToast({ toastType: "error", message: "login to view blog" })
          );
        navigate(`/blog/${selectedBlogData._id}`, {
          state: { navigatedFrom: location.pathname, pageNumber, contentType },
        });
      }}
      className={BlogCardStyles.card_container}
    >
      <div
        className={BlogCardStyles.blog_profile_image}
        style={{
          backgroundImage: `url(${serverDomain}uploads/images/${selectedBlogData.blogProfileImage.filename})`,
        }}
      ></div>
      <div className={BlogCardStyles.lower_part} grid="true">
        <Avatar
          imageUrl={`${serverDomain}uploads/images/${selectedBlogData.publisherProfileImage.filename}`}
        />
        <div className={BlogCardStyles.right_part}>
          <h2 className={BlogCardStyles.blog_title}>
            {selectedBlogData.blogTitle}
          </h2>
          <p className={BlogCardStyles.blog_info}>
            {selectedBlogData.publisherName}
          </p>
          <div className={BlogCardStyles.stats_container}>
            <p className={BlogCardStyles.blog_info}>
              {`${Object.keys(selectedBlogData.views).length} views`}
            </p>
            <p className={BlogCardStyles.blog_info}>
              {new Date(selectedBlogData.date).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
