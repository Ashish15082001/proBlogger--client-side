import { DeleteIcon } from "../../../icons/DeleteIcon";
import { EditIcon } from "../../../icons/EditIcon";
import BlogCardStyles from "./BlogCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { serverDomain } from "../../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import {
  contentTypes,
  removeBlogFromMyBlogsContent,
} from "../../../redux/slices/content/contentsSlice";
import { removeMyBlog, userStatus } from "../../../redux/slices/user/userSlice";
import { showToast } from "../../../redux/slices/toast/toastSlice";
import React, { useState } from "react";
import { ConfirmationModel } from "../../modals/confirmation modal/ConfirmationModel";

export const MyBlogCard = function ({ blogId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirmationModal, setShowConfirmationModel] = useState(false);
  const selectedBlogData = useSelector(
    (state) => state.contents.contentCache[blogId]
  );

  const isLoggedIn = useSelector((state) => state.user.status);
  const pageNumber = new URLSearchParams(location.search).get("pageNumber")
    ? new URLSearchParams(location.search).get("pageNumber")
    : 1;

  const deleteBlog = function () {
    dispatch(removeMyBlog({ blogId }));
    dispatch(removeBlogFromMyBlogsContent({ blogId }));
  };

  const toggleDeleteConfirmationModal = function (event) {
    event.stopPropagation();
    setShowConfirmationModel((oldState) => !oldState);
  };

  return (
    <React.Fragment>
      {showConfirmationModal && (
        <ConfirmationModel
          onContinue={deleteBlog}
          onCancel={toggleDeleteConfirmationModal}
          title="Are You Sure ?"
          description="You will not be able to revert this deletion afterwards. Please proceed with caution."
        />
      )}
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
            <span onClick={toggleDeleteConfirmationModal}>
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
          <p className={BlogCardStyles.blog_info}>
            {`${Object.keys(selectedBlogData.views).length} ${
              Object.keys(selectedBlogData.views).length === 1
                ? "view"
                : "views"
            }`}
          </p>
          <p className={BlogCardStyles.blog_info}>
            {`${Object.keys(selectedBlogData.likes).length} ${
              Object.keys(selectedBlogData.likes).length === 1
                ? "like"
                : "likes"
            }`}
          </p>
          <div className={BlogCardStyles.stats_container}>
            <p className={BlogCardStyles.blog_info}>
              {`${Object.keys(selectedBlogData.comments).length} ${
                Object.keys(selectedBlogData.comments).length === 1
                  ? "comment"
                  : "comments"
              }`}
            </p>
            <p className={BlogCardStyles.blog_info}>
              {new Date(selectedBlogData.date).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
