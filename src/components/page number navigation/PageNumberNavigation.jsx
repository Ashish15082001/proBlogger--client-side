import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { contentsStatus } from "../../redux/slices/content/contentsSlice";
import PageNumberNavigationStyles from "./PageNumberNavigation.module.css";

export const PageNumberNavigation = function (props) {
  const { contentType, pageNumber, currentPageContentStatus } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  const totalDocuments = useSelector(
    (state) => state.contents[contentType].totalDocuments
  );
  const navigateToPage = function (pageNumber) {
    if (
      currentPageContentStatus === contentsStatus.fetching ||
      currentPageContentStatus === contentsStatus.initiated
    )
      return;
    return navigate(`${pathName}?pageNumber=${pageNumber}`);
  };

  const calculatetTotalPages = function () {
    if (totalDocuments % 10 === 0) return totalDocuments / 10;
    return Math.floor(totalDocuments / 10) + 1;
  };

  const totalPages = calculatetTotalPages();

  const arr = [];
  for (let i = 0; i < totalPages; i++) arr[i] = i + 1;

  if (totalDocuments === -1) return null;

  return (
    <div
      className={PageNumberNavigationStyles.pageNumberNavigationContainer}
    >
      <ul className={PageNumberNavigationStyles.pageNumberNavigationList}>
        {arr.map((count) => (
          <li
            active={`${+pageNumber === count}`}
            key={count}
            onClick={() => navigateToPage(count)}
          >
            {count}
          </li>
        ))}
      </ul>
    </div>
  );
};
