import { Link } from "react-router-dom";
import { DeleteWithBackgroud } from "../../icons/DeleteWithBackgroud";
import BlogCardStyles from "./BlogCard.module.css";

export const FavouriteBlogCard = function () {
  return (
    <Link to="#" className={BlogCardStyles.card_container}>
      <div className={BlogCardStyles.card_image}>
        <div className={BlogCardStyles.overlay}>
          <DeleteWithBackgroud />
        </div>
      </div>
      <div className={BlogCardStyles.lower_part} grid="true">
        <div className={BlogCardStyles.blog_avatar}></div>
        <div className={BlogCardStyles.right_part}>
          <h2 className={BlogCardStyles.blog_title}>lorem ipsum lorem ipsum</h2>
          <p className={BlogCardStyles.blog_info}>Ashish Singh</p>
          <div className={BlogCardStyles.stats_container}>
            <p className={BlogCardStyles.blog_info}>2.3K views</p>
            <p className={BlogCardStyles.blog_info}>3 weeks ago</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
