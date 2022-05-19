import MainHeaderStyles from "./MainHeader.module.css";

export const MainHeader = function () {
  return (
    <div className={MainHeaderStyles.main_header_container}>
      <div className={MainHeaderStyles.main_header}>
        <h1 className={MainHeaderStyles.main_logo}>ProBlogger</h1>
      </div>
    </div>
  );
};
