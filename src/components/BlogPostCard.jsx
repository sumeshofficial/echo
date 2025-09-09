import { USER_IMG, useTheme } from "../utilis/constants";

const BlogPostCard = ({ blog }) => {
  const { theme } = useTheme();
  const name = blog.author.personal_info?.fullname;
  const username = blog.author.personal_info?.username;
  const user_img = blog.author.personal_info?.user_img || USER_IMG(theme);

  // Convert Firestore Timestamp → readable date
  const createdAt = blog.createdAt?.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
      {/* Author Info */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4">
        <img
          src={user_img}
          alt="Author"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0">
          <p className="truncate max-w-[120px] sm:max-w-[200px] text-sm sm:text-base font-medium text-black dark:text-white">
            {name}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
            @{username}
          </p>
          {createdAt && (
            <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
              • {createdAt}
            </span>
          )}
        </div>
      </div>

      {/* Blog title */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-black dark:text-white line-clamp-2">
          {blog.title}
        </h2>
      </div>
    </div>
  );
};

export default BlogPostCard;
