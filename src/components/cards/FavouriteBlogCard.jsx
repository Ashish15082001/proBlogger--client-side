import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteIcon } from "../../icons/DeleteIcon";
import BlogCardStyles from "./BlogCard.module.css";

export const FavouriteBlogCard = function ({ id, pageNumber }) {
  const selectedBlogData = useSelector(
    (state) => state.contents.favouritesContent.pages[pageNumber].entities[id]
  );

  console.log("FavouriteBlogCard...", selectedBlogData);
  return (
    <Link to="#" className={BlogCardStyles.card_container}>
      <div
        className={BlogCardStyles.blog_profile_image}
        style={{
          backgroundImage: `url(http://localhost:3001/${selectedBlogData.blogProfileImage.destination}/${selectedBlogData.blogProfileImage.filename})`,
        }}
      >
        <div className={BlogCardStyles.overlay}>
          <DeleteIcon />
        </div>
      </div>
      <div className={BlogCardStyles.lower_part} grid="true">
        <div
          className={BlogCardStyles.blog_avatar}
          style={{
            backgroundImage: `url(http://localhost:3001/${selectedBlogData.publisherProfileImage.destination}/${selectedBlogData.publisherProfileImage.filename})`,
          }}
        ></div>
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
    </Link>
  );
};
