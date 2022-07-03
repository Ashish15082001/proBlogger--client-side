import { DeleteIcon } from "../../icons/DeleteIcon";
import { EditIcon } from "../../icons/EditIcon";
import BlogCardStyles from "./BlogCard.module.css";
import { useSelector } from "react-redux";
import { serverDomain } from "../../constants";

export const MyBlogCard = function ({ id }) {
  const selectedBlogData = useSelector(
    (state) => state.contents.contentCache[id]
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
          <EditIcon />
        </div>
      </div>
      <div className={BlogCardStyles.lower_part} grid="false">
        <h2 className={BlogCardStyles.blog_title}>
          {selectedBlogData.blogTitle}
        </h2>
        <p className={BlogCardStyles.blog_info}>
          {" "}
          {selectedBlogData.publisherName}
        </p>
        <p className={BlogCardStyles.blog_info}>{`${
          Object.keys(selectedBlogData.views).length
        } views`}</p>
        <p className={BlogCardStyles.blog_info}>{`${
          Object.keys(selectedBlogData.likes).length
        } likes`}</p>
        <div className={BlogCardStyles.stats_container}>
          <p className={BlogCardStyles.blog_info}>{`${
            Object.keys(selectedBlogData.comments).length
          } comments`}</p>
          <p className={BlogCardStyles.blog_info}>
            {new Date(selectedBlogData.timeOfPublish).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
