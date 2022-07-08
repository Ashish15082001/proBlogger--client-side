import AvatarStyles from "./Avatar.module.css";

// returns avatar with given image url
// image url must be absolute
export const Avatar = function ({ imageUrl }) {
  return (
    <div
      className={AvatarStyles.avatar}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    ></div>
  );
};
