import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteWithBackgroud } from "../../icons/DeleteWithBackgroud";
import BlogCardStyles from "./BlogCard.module.css";

export const FavouriteBlogCard = function ({ id, pageNumber }) {
  const selectedBlogData = useSelector(
    (state) => state.contents.favouritesContent.pages[pageNumber].entities[id]
  );
  return (
    <Link to="#" className={BlogCardStyles.card_container}>
      <div className={BlogCardStyles.blog_profile_image}>
        <div className={BlogCardStyles.overlay}>
          <DeleteWithBackgroud />
        </div>
      </div>
      <div className={BlogCardStyles.lower_part} grid="true">
        <div className={BlogCardStyles.blog_avatar}></div>
        <div className={BlogCardStyles.right_part}>
          <h2 className={BlogCardStyles.blog_title}>
            {selectedBlogData.title}
          </h2>
          <p className={BlogCardStyles.blog_info}>
            {selectedBlogData.publisherName}
          </p>
          <div className={BlogCardStyles.stats_container}>
            <p className={BlogCardStyles.blog_info}>
              {`${selectedBlogData.totalViews} views`}
            </p>
            <p className={BlogCardStyles.blog_info}>
              {selectedBlogData.publishDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
