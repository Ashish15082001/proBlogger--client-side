import AvatarStyles from "./Avatar.module.css";

// returns avatar with given image url
// image url must be absolute
export const NameAvatar = function ({ shortName }) {
  return (
    <div className={AvatarStyles.avatar}>
      <p>{shortName}</p>
    </div>
  );
};
