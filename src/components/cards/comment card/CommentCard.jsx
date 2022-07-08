import { Avatar } from "../../Avatar/Avatar";
import { useSelector } from "react-redux";
import CommentCardStyles from "./CommentCard.module.css";
import { serverDomain } from "../../../constants";
import { MenuIcon } from "../../../icons/MenuIcon";

export const CommentCard = function ({ commenterUserId, blogId }) {
  const userData = useSelector((state) => state.user);
  const commentData = useSelector(
    (state) => state.contents.contentCache[blogId].comments[commenterUserId]
  );
  const userId = userData.credentials._id;

  return (
    <div className={CommentCardStyles.commentCard}>
      <div className={CommentCardStyles.upperPart}>
        <div className={CommentCardStyles.commenterInfoContainer}>
          <Avatar
            imageUrl={`${serverDomain}${commentData.commenterProfileImage.destination}/${commentData.commenterProfileImage.filename}`}
          />
          <span className={CommentCardStyles.commenterName}>
            {commentData.commenterName}
          </span>
        </div>
        <div className={CommentCardStyles.upperLeftPart}>
          <span className={CommentCardStyles.date}>
            {`${new Date(commentData.date).toDateString()} at ${new Date(
              commentData.date
            ).toLocaleTimeString()}`}
          </span>
          {userId === commenterUserId && false && (
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
      <p className={CommentCardStyles.comment}>{commentData.comment}</p>
    </div>
  );
};
