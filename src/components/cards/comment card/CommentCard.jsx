import { useSelector } from "react-redux";
import CommentCardStyles from "./CommentCard.module.css";
import { MenuIcon } from "../../../icons/MenuIcon";
import { NameAvatar } from "../../Avatar/NameAvatar";

export const CommentCard = function ({ commenterUserId, blogId, shortName }) {
  const userData = useSelector((state) => state.user);
  const commentData = useSelector(
    (state) => state.contents.contentCache[blogId].comments[commenterUserId]
  );
  const commenterComments = commentData?.commenterComments;
  const commenterCommentsIds = commenterComments
    ? Object.keys(commenterComments)
    : [];
  const userId = userData.credentials._id;

  return commenterCommentsIds.map((commentId) => (
    <div key={commentId} className={CommentCardStyles.commentCard}>
      <div className={CommentCardStyles.upperPart}>
        <div className={CommentCardStyles.commenterInfoContainer}>
          {/* <Avatar
            imageUrl={`${serverDomain}uploads/images/${commentData.commenterProfileImage.filename}`}
          /> */}
          <NameAvatar shortName={shortName} />
          <span className={CommentCardStyles.commenterName}>
            {`${
              commentData.commenterName.length > 10
                ? commentData.commenterName.substr(0, 15) + "..."
                : commentData.commenterName
            }`}
          </span>
        </div>
        <div className={CommentCardStyles.upperLeftPart}>
          <span className={CommentCardStyles.date}>
            {`${new Date(
              commenterComments[commentId].date
            ).toDateString()} at ${new Date(
              commenterComments[commentId].date
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
      <p className={CommentCardStyles.comment}>
        {commenterComments[commentId].comment}
      </p>
    </div>
  ));
};
