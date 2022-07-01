import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { serverDomain } from "../../../constants";
import { ThumbUpIcon } from "../../../icons/ThumbUpIcon";
import { BackDropOverlay } from "../../backdrop overlay/BackDropOverlay";
import { PublishCommentForm } from "../../publish comment form/PublishCommentForm";
import BlogModalStyles from "./BlogModal.module.css";
import { userStatus } from "../../../redux/slices/user/userSlice";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { likeBlog } from "../../../redux/slices/content/contentsSlice";
import { likeBlogsApi } from "../../../api/likeBlogsApi";
import { viewBlogApi } from "../../../api/viewBlogApi";
import { showToast } from "../../../redux/slices/toast/toastSlice";
import { CommentCard } from "../../cards/comment card/CommentCard";

export const BlogModal = function () {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const userId = useSelector((state) => state.user.credentials.account._id);
  const user = useSelector((state) => state.user);
  const userAccount = useSelector((state) => state.user.credentials.account);
  const blogData = useSelector((state) => state.contents.contentCache[blogId]);
  const [isBlogLiked, setIsBlogLiked] = useState(
    blogData?.likes[userId] ? true : false
  );

  useEffect(() => {
    if (!blogData) navigate("/", { replace: true });
  }, [blogData, navigate]);

  useEffect(() => {
    const f = async function () {
      try {
        await viewBlogApi({
          userId,
          blogId,
          date: new Date().toISOString(),
        });
      } catch (error) {
        console.error(error);
        dispatch(showToast({ toastType: "error", message: error.message }));
      }
    };

    f();
  }, [blogId, userId, dispatch]);

  if (!blogData) return <div></div>;

  const onLikeBlog = async function () {
    try {
      const date = new Date().toISOString();

      setIsBlogLiked((oldState) => !oldState);
      dispatch(likeBlog({ date, userId, blogId }));
      await likeBlogsApi({ userId, blogId, date });
    } catch (error) {
      dispatch(showToast({ toastType: "error", message: error.message }));
    }
  };

  return (
    <React.Fragment>
      <BackDropOverlay />
      <motion.div
        className={BlogModalStyles.parentContainer}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={BlogModalStyles.blogContainer}>
          <div
            className={BlogModalStyles.blogProfieImage}
            style={{
              backgroundImage: `url(${serverDomain}${blogData.blogProfileImage.destination}/${blogData.blogProfileImage.filename})`,
            }}
          >
            <p
              onClick={() => {
                navigate(
                  `${location.state.navigatedFrom}?pageNumber=${location.state.pageNumber}`,
                  { replace: true }
                );
              }}
            >
              back
            </p>
            <p>add to favourites</p>
          </div>
          <div className={BlogModalStyles.blogLowerPart}>
            <h5 className={BlogModalStyles.blogTitle}>{blogData.blogTitle}</h5>
            <p className={BlogModalStyles.description}>
              {"posted by "}
              <span className={BlogModalStyles.publisherName}>
                {blogData.publisherName ===
                `${user.credentials.account.firstName} ${user.credentials.account.lastName}`
                  ? "you"
                  : blogData.publisherName}
              </span>
              {" on "}
              <span className={BlogModalStyles.timeOfPublish}>
                {new Date(blogData.timeOfPublish).toDateString()}
              </span>
              {" at "}
              <span className={BlogModalStyles.timeOfPublish}>
                {new Date(blogData.timeOfPublish).toLocaleTimeString()}
              </span>
            </p>
            <p className={BlogModalStyles.aboutBlog}>{blogData.aboutBlog}</p>
            <div className={BlogModalStyles.statsContainer}>
              <p>{`${Object.keys(blogData.views).length} views`}</p>
              <p>
                {Object.keys(blogData.likes).length}
                <ThumbUpIcon onClick={onLikeBlog} isFilled={isBlogLiked} />
              </p>
            </div>
            <h5 className={BlogModalStyles.commentTitle}>{`${
              Object.keys(blogData.comments).length
            } ${
              Object.keys(blogData.comments).length === 1
                ? "comment"
                : "comments"
            }`}</h5>
            {user.status === userStatus.loggedIn && (
              <React.Fragment>
                <PublishCommentForm
                  blogId={blogId}
                  avatarImageUrl={`${serverDomain}${userAccount.profileImage.destination}/${userAccount.profileImage.filename}`}
                />
              </React.Fragment>
            )}
            {user.status !== userStatus.loggedIn && (
              <h5 className={BlogModalStyles.publishCommentPlaceholder}>
                login to publish comment
              </h5>
            )}
            <ul>
              {Object.keys(blogData.comments).map((commenterUserId) => (
                <li key={commenterUserId}>
                  <CommentCard
                    commenterUserId={commenterUserId}
                    blogId={blogId}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};
