import { useAuth, USER_IMG, useTheme } from "../utilis/constants";

const BlogPostCard = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const name = currentUser?.displayName;
  const email = currentUser?.email;
  const index = email?.indexOf("@");
  const username = email?.slice(0, index);
  return (
    <div className="">
      <div className="flex gap-2 items-center mb-7">
        <img src={USER_IMG(theme)} className="w-6 h-6 rounded-full" />
        <p className="line-clamp-1 text-black dark:text-white">{name} @{username}</p>
        <p className="min-w-fit"></p>
      </div>
    </div>
  );
};

export default BlogPostCard;
