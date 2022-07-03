import { useDispatch, useSelector } from "react-redux";
import { serverDomain } from "../../constants";
import { DeleteIcon } from "../../icons/DeleteIcon";
import BlogCardStyles from "./BlogCard.module.css";
import { Avatar } from "../Avatar/Avatar";
import { showToast } from "../../redux/slices/toast/toastSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { userStatus } from "../../redux/slices/user/userSlice";
import { contentTypes } from "../../redux/slices/content/contentsSlice";

export const FavouriteBlogCard = function ({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedBlogData = useSelector(
    (state) => state.contents.contentCache[id]
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
          state: {
            navigatedFrom: location.pathname,
            pageNumber,
            contentType: contentTypes.favourites,
          },
        });
      }}
      className={BlogCardStyles.card_container}
    >
      <div
        className={BlogCardStyles.blog_profile_image}
        style={{
          backgroundImage: `url(${serverDomain}${selectedBlogData.blogProfileImage.destination}/${selectedBlogData.blogProfileImage.filename})`,
        }}
      >
        <div className={BlogCardStyles.overlay}>
          <DeleteIcon />
        </div>
      </div>
      <div className={BlogCardStyles.lower_part} grid="true">
        <Avatar
          imageUrl={`${serverDomain}${selectedBlogData.publisherProfileImage.destination}/${selectedBlogData.publisherProfileImage.filename}`}
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
              {new Date(selectedBlogData.timeOfPublish).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
