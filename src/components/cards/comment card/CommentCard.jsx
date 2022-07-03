import { Avatar } from "../../Avatar/Avatar";
import { useSelector } from "react-redux";
import CommentCardStyles from "./CommentCard.module.css";
import { serverDomain } from "../../../constants";
import { MenuIcon } from "../../../icons/MenuIcon";

export const CommentCard = function (props) {
  const { commenterUserId, blogId } = props;
  const user = useSelector((state) => state.user.credentials);
  const comment = useSelector(
    (state) => state.contents.contentCache[blogId].comments[commenterUserId]
  );

  // console.log(comment);

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
        <div className={CommentCardStyles.upperLeftPart}>
          <span className={CommentCardStyles.date}>
            {`${new Date(comment.date).toDateString()} at ${new Date(
              comment.date
            ).toLocaleTimeString()}`}
          </span>
          {user._id === commenterUserId && false && (
            <div className={CommentCardStyles.menuContainer}>
              <span className={CommentCardStyles.MenuIconContainer}>
                <MenuIcon />
              </span>
              <ul className={CommentCardStyles.menuOptionsContainer}>
                <li className={CommentCardStyles.menuOption}>edit</li>
                <li className={CommentCardStyles.menuOption}>delete</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className={CommentCardStyles.comment}>{comment.comment}</p>
    </div>
  );
};
