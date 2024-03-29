import React from "react";
import PublishBlogModalStyles from "./PublishBlogForm.module.css";
import { Input } from "../form components/input components/input/Input";
import { useState } from "react";
import { motion } from "framer-motion";
import { TextArea } from "../form components/input components/text area/TextArea";
import { showToast } from "../../redux/slices/toast/toastSlice";
import { useDispatch } from "react-redux";
import { validateInputText, validateURL } from "../../utilities/validate";
import { sanitiseInputText } from "../../utilities/sanitise";
import { publishBlogApi } from "../../api/publishBlogApi";

export const PublishBlogForm = function () {
  const dispatch = useDispatch();
  const [isPublishingBlog, setIsPublishingBlog] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogTitleStatus, setBlogTitleStatus] = useState({ isError: false });
  const [blogProfileImageURL, setBlogProfileImageURL] = useState("");
  const [blogProfileImageURLStatus, setBlogProfileImageURLStatus] = useState({
    isError: false,
  });
  const [aboutBlog, setAboutBlog] = useState("");
  const [aboutBlogStatus, setAboutBlogStatus] = useState({ isError: false });
  const [triedFormSubmition, setTriedFormSubmition] = useState(false);

  const onBlogTitleChanged = function (event) {
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
  };

  const onBlogProfileImageURLChanged = function (event) {
    // const selectedBlogProfileImage = event.target.files[0];

    // if (triedFormSubmition) {
    //   if (validateImage(selectedBlogProfileImage) === false) {
    //     setBlogProfileImageStatus({
    //       isError: true,
    //       message: "please select valid image format",
    //     });
    //   } else setBlogProfileImageStatus({ isError: false });
    // }
    // setBlogProfileImage(selectedBlogProfileImage);

    const enteredImageURL = event.target.value.trimStart();

    if (triedFormSubmition) {
      if (validateURL(enteredImageURL) === false)
        setBlogProfileImageURLStatus({
          isError: true,
          message: "invalid image url",
        });
      else
        setBlogProfileImageURLStatus({
          isError: false,
        });
    }
    setBlogProfileImageURL(enteredImageURL);
  };

  const onAboutBlogChanged = function (event) {
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
  };

  const resetPublishBlogFormState = function () {
    setBlogTitle("");
    setBlogProfileImageURL("");
    setAboutBlog("");
    setBlogTitleStatus({ isError: false });
    setBlogProfileImageURLStatus({ isError: false });
    setAboutBlogStatus({ isError: false });
    setTriedFormSubmition(false);
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
      if (validateInputText(blogProfileImageURL) === false) {
        isError = true;
        setBlogProfileImageURLStatus({
          isError: true,
          message: "invalid image url",
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

      const date = new Date().toISOString();
      const blogData = {
        blogTitle: sanitiseInputText(blogTitle),
        aboutBlog: sanitiseInputText(aboutBlog),
        blogProfileImageURL,
        date,
      };

      setIsPublishingBlog(true);
      await publishBlogApi(blogData);
      setIsPublishingBlog(false);
      resetPublishBlogFormState();
      dispatch(
        showToast({
          toastType: "success",
          message: "blog published successfully",
        })
      );
    } catch (error) {
      dispatch(showToast({ toastType: "error", message: error.message }));
    } finally {
      setIsPublishingBlog(false);
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
            label="select blog profile image url"
            onInputChange={onBlogProfileImageURLChanged}
            inputType="text"
            autoFocus={false}
            inputValue={blogProfileImageURL}
            status={blogProfileImageURLStatus}
          />
          <TextArea
            style={{ height: "20rem" }}
            label="write about blog"
            textValue={aboutBlog}
            onTextValueChange={onAboutBlogChanged}
            status={aboutBlogStatus}
          />
          <button type="submit" disabled={isPublishingBlog}>{`${
            isPublishingBlog ? "publishing blog" : "publish"
          }`}</button>
        </form>
      </motion.div>
    </div>
  );
};
