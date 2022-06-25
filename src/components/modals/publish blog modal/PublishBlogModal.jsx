import React from "react";
import PublishBlogModalStyles from "./PublishBlogModal.module.css";
import { Input } from "../../form components/input components/input/Input";
import { useState } from "react";
import { motion } from "framer-motion";
import { TextArea } from "../../form components/input components/text area/TextArea";
import { showToast } from "../../../redux/slices/toast/toastSlice";
import { useDispatch } from "react-redux";
import { validateImage, validateInputText } from "../../../utilities/validate";
import { sanitiseInputText } from "../../../utilities/sanitise";
import { publishUserBlog } from "../../../api/publishUserBlog";

export const PublishBlogModal = function () {
  const dispatch = useDispatch();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogTitleStatus, setBlogTitleStatus] = useState({ isError: false });
  const [blogProfileImage, setBlogProfileImage] = useState(null);
  const [blogProfileImageStatus, setBlogProfileImageStatus] = useState({
    isError: false,
  });
  const [aboutBlog, setAboutBlog] = useState("");
  const [aboutBlogStatus, setAboutBlogStatus] = useState({ isError: false });
  const [triedFormSubmition, setTriedFormSubmition] = useState(false);

  const onBlogTitleChanged = function (event) {
    try {
      const enteredBlogTitle = event.target.value;
      if (triedFormSubmition) {
        if (validateInputText(enteredBlogTitle) === false)
          setBlogTitleStatus({
            isError: true,
            message: "invalid blog title",
          });
        else setBlogTitleStatus({ isError: false });
      }
      setBlogTitle(enteredBlogTitle);
    } catch (error) {
      dispatch(showToast({ toastType: "error", message: error.message }));
    }
  };

  const onBlogProfileImageChanged = function (event) {
    try {
      const selectedBlogProfileImage = event.target.files[0];

      if (triedFormSubmition) {
        if (validateImage(selectedBlogProfileImage) === false) {
          setBlogProfileImageStatus({
            isError: true,
            message: "please select valid image format",
          });
        } else setBlogProfileImageStatus({ isError: false });
      }
      setBlogProfileImage(selectedBlogProfileImage);
    } catch (error) {
      dispatch(showToast({ toastType: "error", message: error.message }));
    }
  };

  const onAboutBlogChanged = function (event) {
    try {
      const enteredAboutBlog = event.target.value;
      if (triedFormSubmition) {
        if (validateInputText(enteredAboutBlog) === false)
          setAboutBlogStatus({
            isError: true,
            message: "invalid about blog",
          });
        else setAboutBlogStatus({ isError: false });
      }
      setAboutBlog(enteredAboutBlog);
    } catch (error) {
      dispatch(showToast({ toastType: "error", message: error.message }));
    }
  };

  const onPublish = async function (event) {
    try {
      event.preventDefault();
      let isError = false;

      if (validateInputText(sanitiseInputText(blogTitle)) === false) {
        isError = true;
        setBlogTitleStatus({
          isError: true,
          message: "invalid blog title",
        });
      }
      if (validateImage(blogProfileImage) === false) {
        isError = true;
        setBlogProfileImageStatus({
          isError: true,
          message: "please select valid image format",
        });
      }
      if (validateInputText(sanitiseInputText(aboutBlog)) === false) {
        isError = true;
        setAboutBlogStatus({
          isError: true,
          message: "invalid about blog",
        });
      }

      if (isError && triedFormSubmition === false) setTriedFormSubmition(true);
      if (isError) return;

      const blogData = new FormData();

      blogData.set("blogTitle", sanitiseInputText(blogTitle));
      blogData.set("aboutBlog", sanitiseInputText(aboutBlog));
      blogData.set("blogProfileImage", blogProfileImage);

      await publishUserBlog(blogData);

      dispatch(
        showToast({
          toastType: "success",
          message: "blog published successfully",
        })
      );
    } catch (error) {
      dispatch(showToast({ toastType: "error", message: error.message }));
    }
  };

  return (
    <div className={PublishBlogModalStyles.mainContainer}>
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={PublishBlogModalStyles.formContainer}
      >
        <form onSubmit={onPublish}>
          <Input
            label="blog title"
            inputValue={blogTitle}
            onInputChange={onBlogTitleChanged}
            inputType="text"
            autoFocus={true}
            status={blogTitleStatus}
          />
          <Input
            label="select blog profile image"
            onInputChange={onBlogProfileImageChanged}
            inputType="file"
            autoFocus={false}
            status={blogProfileImageStatus}
          />
          <TextArea
            label="write about blog"
            textValue={aboutBlog}
            onTextValueChange={onAboutBlogChanged}
            status={aboutBlogStatus}
          />
          <button type="submit">publish</button>
        </form>
      </motion.div>
    </div>
  );
};
