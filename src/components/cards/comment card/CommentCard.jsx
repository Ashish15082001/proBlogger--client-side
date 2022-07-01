import { Avatar } from "../../Avatar/Avatar";
import { useSelector } from "react-redux";
import CommentCardStyles from "./CommentCard.module.css";
import { serverDomain } from "../../../constants";

export const CommentCard = function (props) {
  const { commenterUserId, blogId } = props;
  const comment = useSelector(
    (state) => state.contents.contentCache[blogId].comments[commenterUserId]
  );
  return (
    <div className={CommentCardStyles.commentCard}>
      <div className={CommentCardStyles.upperPart}>
        <div className={CommentCardStyles.commenterInfoContainer}>
          <Avatar
            imageUrl={`${serverDomain}${comment.commenterProfileImage.destination}/${comment.commenterProfileImage.filename}`}
          />
          <span className={CommentCardStyles.commenterName}>
            {comment.commenterName}
          </span>
        </div>
        <span className={CommentCardStyles.date}>
          {`${new Date(comment.date).toDateString()} at ${new Date(
            comment.date
          ).toLocaleTimeString()}`}
        </span>
      </div>
      <p className={CommentCardStyles.comment}>{comment.comment}</p>
    </div>
  );
};
