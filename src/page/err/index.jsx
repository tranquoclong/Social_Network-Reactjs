import PageNotFound from "../../images/pageNotFound.png";
import { Link } from "react-router-dom";
export const ErrPage = () => {
  return (
    <div
      className="lg:p-12 max-w-md max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-"
      style={{ textAlign: "center" }}
    >
      <img src={PageNotFound} alt="PageNotFound" />
      <p class="text-xl font-medium capitalize mt-6 mb-6 uk-link-reset">
        OOPS, THE PAGE YOU ARE LOOKING FOR CAN'T BE FOUND!
      </p>
      <Link
        to="/"
        class="bg-gradient-to-bl font-semibold from-pink-400 px-9 py-3 rounded text-sm text-white to-pink-600 hover:shadow-lg hover:text-white"
      >
        Return To Homepage
      </Link>
    </div>
  );
};
