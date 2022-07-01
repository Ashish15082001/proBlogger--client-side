import { useSelector } from "react-redux";
import { serverDomain } from "../../constants";
import { DeleteIcon } from "../../icons/DeleteIcon";
import BlogCardStyles from "./BlogCard.module.css";
import { Avatar } from "../Avatar/Avatar";

export const FavouriteBlogCard = function ({ id }) {
  const selectedBlogData = useSelector(
    (state) => (state) => state.contents.contentCache[id]
  );

  return (
    <div to="#" className={BlogCardStyles.card_container}>
      <div
        className={BlogCardStyles.blog_profile_image}
        style={{
          backgroundImage: `url(${serverDomain}${selectedBlogData.blogProfileImage.destination}/${selectedBlogData.blogProfileImage.filename})`,
        }}
      >
        <div className={BlogCardStyles.overlay}>
          <DeleteIcon />
        </div>
      </div>
      <div className={BlogCardStyles.lower_part} grid="true">
        <Avatar
          imageUrl={`${serverDomain}${selectedBlogData.publisherProfileImage.destination}/${selectedBlogData.publisherProfileImage.filename}`}
        />
        <div className={BlogCardStyles.right_part}>
          <h2 className={BlogCardStyles.blog_title}>
            {selectedBlogData.blogTitle}
          </h2>
          <p className={BlogCardStyles.blog_info}>
            {selectedBlogData.publisherName}
          </p>
          <div className={BlogCardStyles.stats_container}>
            <p className={BlogCardStyles.blog_info}>
              {`${Object.keys(selectedBlogData.views).length} views`}
            </p>
            <p className={BlogCardStyles.blog_info}>
              {new Date(selectedBlogData.timeOfPublish).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
