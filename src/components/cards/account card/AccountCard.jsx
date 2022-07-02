import AccountCardStyles from "./AccountCard.module.css";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { serverDomain } from "../../../constants";

export const AccountCard = function () {
  const userCredentials = useSelector((state) => state.user.credentials);
  const userStatistics = useSelector((state) => state.user.statistics);

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
            backgroundImage: `url(${serverDomain}${userCredentials.profileImage.destination}/${userCredentials.profileImage.filename})`,
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
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(aboutUser.followers).length}
                </span>
                <p>Followers</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(aboutUser.followings).length}
                </span>
                <p>Followings</p>
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
                <p>Total views</p>
              </div>
              <div>
                <span>{Object.keys(aboutBlogs.totalComments).length}</span>
                <p>Total comments</p>
              </div>
              <div>
                <span>{Object.keys(aboutBlogs.totalLikes).length}</span>
                <p>Total likes</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(aboutBlogs.trendings).length}
                </span>
                <p>Trendings</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(aboutBlogs.publishes).length}
                </span>
                <p>Publishes</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(aboutBlogs.favourites).length}
                </span>
                <p>favourites</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
