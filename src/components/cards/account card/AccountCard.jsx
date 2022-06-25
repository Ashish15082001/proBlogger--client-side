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
        <h3
          id={AccountCardStyles.userName}
        >{`${user.firstName} ${user.lastName}`}</h3>
        <h3 id={AccountCardStyles.email}>{`${user.email}`}</h3>
        <p>{user.description}</p>

        {/* <span className={AccountCardStyles.clickAble}>edit profile</span> */}

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
                  {Object.keys(user.aboutUser.followers).length}
                </span>
                <p>Followers</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(user.aboutUser.followings).length}
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
            <h5>About blogs</h5>
            <div className={AccountCardStyles.aboutItemsContainer}>
              <div>
                <span>{Object.keys(user.aboutBlogs.totalViews).length}</span>
                <p>Total views</p>
              </div>
              <div>
                <span>{Object.keys(user.aboutBlogs.totalComments).length}</span>
                <p>Total comments</p>
              </div>
              <div>
                <span>{Object.keys(user.aboutBlogs.totalLikes).length}</span>
                <p>Total likes</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(user.aboutBlogs.trendings).length}
                </span>
                <p>Trendings</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(user.aboutBlogs.publishes).length}
                </span>
                <p>Publishes</p>
              </div>
              <div>
                <span className={AccountCardStyles.clickAble}>
                  {Object.keys(user.aboutBlogs.favourites).length}
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
