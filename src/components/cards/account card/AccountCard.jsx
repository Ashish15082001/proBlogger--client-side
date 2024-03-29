import AccountCardStyles from "./AccountCard.module.css";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { serverDomain } from "../../../constants";

export const AccountCard = function () {
  const userData = useSelector((state) => state.user);
  const userCredentials = userData.credentials;
  const userStatistics = userData.statistics;
  const aboutUser = userStatistics.aboutUser;
  const aboutBlogs = userStatistics.aboutBlogs;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={AccountCardStyles.AccountCardContainer}
      >
        <div
          style={{
            backgroundImage: `url(${serverDomain}uploads/images/${userCredentials.profileImage.filename})`,
          }}
          className={AccountCardStyles.profilePicture}
        ></div>
        <h3
          id={AccountCardStyles.userName}
        >{`${userCredentials.firstName} ${userCredentials.lastName}`}</h3>
        <h3 id={AccountCardStyles.email}>{`${userCredentials.email}`}</h3>
        <p>{userCredentials.description}</p>

        {/* <span className={AccountCardStyles.clickAble}>edit profile</span> */}

        <div className={AccountCardStyles.flexContainer}>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={AccountCardStyles.aboutContainer}
          >
            <h5 className={AccountCardStyles.aboutItemsContainerTitle}>
              About
            </h5>
            <div className={AccountCardStyles.aboutItemsContainer}>
              <div className={AccountCardStyles.aboutItem}>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(aboutUser.followers).length}
                </span>
                <p>Total numbers of Followers</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(aboutUser.followings).length}
                </span>
                <p>Total numbers of Followings</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 30, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={AccountCardStyles.aboutContainer}
          >
            <h5 className={AccountCardStyles.aboutItemsContainerTitle}>
              About blogs
            </h5>
            <div className={AccountCardStyles.aboutItemsContainer}>
              <div>
                <span>{Object.keys(aboutBlogs.totalViews).length}</span>
                <p>Sum of total views in each blog you published</p>
              </div>
              <div>
                <span>{Object.keys(aboutBlogs.totalComments).length}</span>
                <p>Sum of total comments in each blog you published</p>
              </div>
              <div>
                <span>{Object.keys(aboutBlogs.totalLikes).length}</span>
                <p>Sum of total likes in each blog you published</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(aboutBlogs.trendings).length}
                </span>
                <p>Total numbers of blog publishes by you which are trending</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(aboutBlogs.publishes).length}
                </span>
                <p>Total numbers of blogs published by you</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(aboutBlogs.favourites).length}
                </span>
                <p>Total numbers of blogs added to favourites</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
