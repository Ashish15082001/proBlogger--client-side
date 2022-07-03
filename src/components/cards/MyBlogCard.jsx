import { DeleteIcon } from "../../icons/DeleteIcon";
import { EditIcon } from "../../icons/EditIcon";
import BlogCardStyles from "./BlogCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { serverDomain } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { contentTypes } from "../../redux/slices/content/contentsSlice";
import { userStatus } from "../../redux/slices/user/userSlice";
import { showToast } from "../../redux/slices/toast/toastSlice";

export const MyBlogCard = function ({ id }) {
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
          <span>
            <DeleteIcon />
          </span>
          <span>
            <EditIcon />
          </span>
        </div>
      </div>
      <div className={BlogCardStyles.lower_part} grid="false">
        <h2 className={BlogCardStyles.blog_title}>
          {selectedBlogData.blogTitle}
        </h2>
        <p className={BlogCardStyles.blog_info}>
          {" "}
          {selectedBlogData.publisherName}
        </p>
        <p className={BlogCardStyles.blog_info}>{`${
          Object.keys(selectedBlogData.views).length
        } views`}</p>
        <p className={BlogCardStyles.blog_info}>{`${
          Object.keys(selectedBlogData.likes).length
        } likes`}</p>
        <div className={BlogCardStyles.stats_container}>
          <p className={BlogCardStyles.blog_info}>{`${
            Object.keys(selectedBlogData.comments).length
          } comments`}</p>
          <p className={BlogCardStyles.blog_info}>
            {new Date(selectedBlogData.timeOfPublish).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
