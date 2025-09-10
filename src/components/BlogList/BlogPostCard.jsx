import { Link } from "react-router";
import { USER_IMG, useTheme } from "../../utilis/constants";
import { getDate } from "../../utilis/date";
import { Option } from "lucide-react";

const BlogPostCard = ({ blog}) => {
  const { theme } = useTheme();
  const name = blog.author.personal_info?.fullname;
  const username = blog.author.personal_info?.username;
  const user_img = blog.author.personal_info?.user_img || USER_IMG(theme);
  const title = blog?.title;
  const des = blog?.des;

  // Convert Firestore Timestamp → readable date
  const createdAt = blog.createdAt?.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link to={`/blog/${blog?.uniqueSlug}`} className="border-b border-gray pb-5 mb-4">
      <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-2 items-center mb-7">
          <img
            src={user_img}
            alt="Author"
            className="w-6 h-6 sm:w-6 sm:h-6 rounded-full object-cover"
          />
          <p className="truncate max-w-[120px] sm:max-w-[200px] text-sm sm:text-base font-medium text-black dark:text-white">
            {name}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
            @{username}
          </p>
          <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            {getDate(createdAt)}
          </span>
        </div>

        <h3 className="blog-title dark:text-white">{title}</h3>

        <p className="my-3 text-base leading-7 max-sm:hidden md-max-[1100px]:hidden line-clamp-2 dark:text-white">
          {des}
        </p>
      </div>
    </Link>
  );
};

export default BlogPostCard;
