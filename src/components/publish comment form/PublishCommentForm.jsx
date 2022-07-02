import { Avatar } from "../Avatar/Avatar";
import PublishCommentFormStyles from "./PublishCommentForm.module.css";
import { TextArea } from "../form components/input components/text area/TextArea";
import { useState } from "react";
import { sanitiseInputText } from "../../utilities/sanitise";
import { validateInputText } from "../../utilities/validate";
import { publishCommentApi } from "../../api/publishCommentApi";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../redux/slices/toast/toastSlice";
import { commentOnBlog } from "../../redux/slices/content/contentsSlice";

export const PublishCommentForm = function (props) {
  const { avatarImageUrl, blogId } = props;
  const dispatch = useDispatch();
  const userCredentials = useSelector((state) => state.user.credentials);
  const [comment, setComment] = useState("");
  const [isPublishingComment, setIsPublishingComment] = useState(false);
  const onCommentChange = function (event) {
    setComment(event.target.value);
  };

  const publishComment = async function () {
    try {
      setIsPublishingComment(true);
      const enteredComment = sanitiseInputText(comment);
      const date = new Date().toISOString();
      const commentData = {
        comment: enteredComment,
        userId: userCredentials._id,
        blogId,
        date,
      };

      await publishCommentApi(commentData);
      dispatch(
        commentOnBlog({
          ...commentData,
          commenterName:
            userCredentials.firstName + " " + userCredentials.lastName,
          commenterProfileImage: userCredentials.profileImage,
        })
      );

      setComment("");
    } catch (error) {
      dispatch(showToast({ toastType: "error", message: error.message }));
    } finally {
      setIsPublishingComment(false);
    }
  };

  return (
    <div className={PublishCommentFormStyles.PublishCommentFormContainer}>
      <Avatar imageUrl={avatarImageUrl} />
      <TextArea
        style={{ height: "6rem" }}
        textValue={comment}
        onTextValueChange={onCommentChange}
        status
      />
      <div></div>
      <div className={PublishCommentFormStyles.btnContainer}>
        <button onClick={() => setComment("")}>cancel</button>
        <button
          onClick={publishComment}
          disabled={
            !validateInputText(sanitiseInputText(comment)) ||
            isPublishingComment
          }
        >
          {isPublishingComment ? "publishing comment" : "publish comment"}
        </button>
      </div>
    </div>
  );
};
