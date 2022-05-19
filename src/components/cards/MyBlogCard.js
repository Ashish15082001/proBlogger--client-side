import { Link } from "react-router-dom";
import { DeleteWithBackgroud } from "../../icons/DeleteWithBackgroud";
import { EditWithBackground } from "../../icons/EditWithBackground";
import BlogCardStyles from "./BlogCard.module.css";

export const MyBlogCard = function () {
  return (
    <Link to="#" className={BlogCardStyles.card_container}>
      <div className={BlogCardStyles.card_image}>
        <div className={BlogCardStyles.overlay}>
          <DeleteWithBackgroud />
          <EditWithBackground />
        </div>
      </div>
      <div className={BlogCardStyles.lower_part} grid="false">
        <h2 className={BlogCardStyles.blog_title}>lorem ipsum lorem ipsum</h2>
        <p className={BlogCardStyles.blog_info}>Ashish Singh</p>
        <p className={BlogCardStyles.blog_info}>2.3K views</p>
        <p className={BlogCardStyles.blog_info}>2K likes</p>
        <div className={BlogCardStyles.stats_container}>
          <p className={BlogCardStyles.blog_info}>1.2k comments</p>
          <p className={BlogCardStyles.blog_info}>3 weeks ago</p>
        </div>
      </div>
    </Link>
  );
};
