import AccountCardStyles from "./AccountCard.module.css";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export const AccountCard = function () {
  const user = useSelector((state) => state.user.credentials.account);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        // exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={AccountCardStyles.AccountCardContainer}
      >
        <div
          style={{
            backgroundImage: `url(http://localhost:3001/${user.profileImage.destination}/${user.profileImage.filename})`,
          }}
          className={AccountCardStyles.profilePicture}
        ></div>
        <h3>{`${user.firstName} ${user.lastName}`}</h3>
        <p>{user.description}</p>

        <span className={AccountCardStyles.clickAble}>edit profile</span>

        <div className={AccountCardStyles.flexContainer}>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={AccountCardStyles.aboutContainer}
          >
            <h5>About</h5>
            <div className={AccountCardStyles.aboutItemsContainer}>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(user.about.followers).length}
                </span>
                <p>Followers</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(user.about.followings).length}
                </span>
                <p>Followings</p>
              </div>
              <div>
                <span>{Object.keys(user.about.publishedBlogs).length}</span>
                <p>Published blogs</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 30, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={AccountCardStyles.aboutContainer}
          >
            <h5>About blogs</h5>
            <div className={AccountCardStyles.aboutItemsContainer}>
              <div>
                <span>{Object.keys(user.about.followers).length}</span>
                <p>Total views</p>
              </div>
              <div>
                <span>{Object.keys(user.about.followings).length}</span>
                <p>Total comments</p>
              </div>
              <div>
                <span>{Object.keys(user.about.publishedBlogs).length}</span>
                <p>Total likes</p>
              </div>
              <div>
                <span>{Object.keys(user.about.publishedBlogs).length}</span>
                <p>Trending</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
