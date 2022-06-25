import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { serverDomain } from "../../constants";
import BlogCardStyles from "./BlogCard.module.css";

export const BlogCard = function ({ id, contentType, pageNumber }) {
  const selectedBlogData = useSelector(
    (state) => state.contents[contentType].pages[pageNumber].entities[id]
  );

  return (
    <Link to="#" className={BlogCardStyles.card_container}>
      <div
        className={BlogCardStyles.blog_profile_image}
        style={{
          backgroundImage: `url(${serverDomain}${selectedBlogData.blogProfileImage.destination}/${selectedBlogData.blogProfileImage.filename})`,
        }}
      ></div>
      <div className={BlogCardStyles.lower_part} grid="true">
        <div
          className={BlogCardStyles.blog_avatar}
          style={{
            backgroundImage: `url(${serverDomain}${selectedBlogData.publisherProfileImage.destination}/${selectedBlogData.publisherProfileImage.filename})`,
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
