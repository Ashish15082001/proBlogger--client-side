import { useDispatch, useSelector } from "react-redux";
import { DeleteIcon } from "../../../icons/DeleteIcon";
import BlogCardStyles from "./BlogCard.module.css";
import { showToast } from "../../../redux/slices/toast/toastSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  removeBlogFromFavourites,
  userStatus,
} from "../../../redux/slices/user/userSlice";
import {
  contentTypes,
  removeBlogFromFavouritesContent,
} from "../../../redux/slices/content/contentsSlice";
import { removeBlogFromFavouritesApi } from "../../../api/removeBlogFromFavouritesApi";
import { NameAvatar } from "../../Avatar/NameAvatar";

export const FavouriteBlogCard = function ({ blogId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedBlogData = useSelector(
    (state) => state.contents.contentCache[blogId]
  );
  const userData = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.user.status);
  const userCredentials = userData.credentials;
  const pageNumber = new URLSearchParams(location.search).get("pageNumber")
    ? new URLSearchParams(location.search).get("pageNumber")
    : 1;

  const removeFromFavourites = async function (event) {
    try {
      event.stopPropagation();
      dispatch(removeBlogFromFavouritesContent({ blogId }));
      dispatch(removeBlogFromFavourites({ blogId }));
      await removeBlogFromFavouritesApi({
        blogId,
        userId: userCredentials._id,
      });
    } catch (error) {
      dispatch(showToast({ toastType: "error", message: error.message }));
    }
  };
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
          backgroundImage: `url(${selectedBlogData.blogProfileImageURL})`,
        }}
      >
        <div className={BlogCardStyles.overlay}>
          <span onClick={removeFromFavourites}>
            <DeleteIcon />
          </span>
        </div>
      </div>
      <div className={BlogCardStyles.lower_part} grid="true">
        {/* <Avatar
          imageUrl={`${serverDomain}uploads/images/${selectedBlogData.publisherProfileImage.filename}`}
        /> */}
        <NameAvatar
          shortName={selectedBlogData.publisherName
            .split(" ")
            .slice(0, 2)
            .map((str) => str[0])
            .join("")}
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
