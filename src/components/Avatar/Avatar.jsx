import AvatarStyles from "./Avatar.module.css";

export const Avatar = function (props) {
  const { imageUrl } = props;

  return (
    <div
      className={AvatarStyles.avatar}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    ></div>
  );
};
