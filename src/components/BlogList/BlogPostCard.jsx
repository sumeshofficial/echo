import { Link } from "react-router";
import { useAuth, USER_IMG, useTheme } from "../../utilis/constants";
import { getDate } from "../../utilis/date";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import ModalContext from "../../contexts/modalContext/ModalContext";

const BlogPostCard = ({ blogData }) => {
  const [ blog, setBlog ] = useState(blogData);
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  const { theme } = useTheme();
  const name = blog?.author?.personal_info?.fullname;
  const username = blog?.author?.personal_info?.username;
  const user_img = blog?.author?.personal_info?.user_img || USER_IMG(theme);
  const title = blog?.title;
  const des = blog?.des;
  let total_likes = blog?.activity?.total_likes;
  const blogId = blog?.uniqueSlug;

  const { setModal } = useContext(ModalContext);

  const [ isLikedByUser, setLikedByUser ] = useState(blog?.likes[userId])

  const createdAt = blog?.createdAt?.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    try {
      const fetchLikeStatus = async () => {
        if (!currentUser || !blogId) return;
        const blogRef = doc(db, "blogs", blogId);

        const data = await getDoc(blogRef);
        const stat = data.data()?.likes[userId];

        if (stat) {
          setLikedByUser(stat);
        }
      };
      fetchLikeStatus();
    } catch (error) {
      console.log(error.message);
    }
  }, [currentUser, blogId]);

  const handleLike = async () => {
    let incValue = 0;

    if (currentUser) {
      setLikedByUser((prev) => !prev);

      if (!isLikedByUser) {
        total_likes++;
        incValue++;
        toast.dismiss();
        toast.success("like added");
      } else {
        total_likes--;
        incValue--;
        toast.dismiss();
        toast.success("like removed");
      }

      const blogRef = doc(db, "blogs", blogId);

      try {
        await updateDoc(blogRef, {
          "activity.total_likes": increment(incValue),
          [`likes.${userId}`]: !isLikedByUser,
        });

        setBlog((prev) => ({
          ...prev,
          activity: {
            ...prev.activity,
            total_likes: prev.activity.total_likes + incValue,
          },
        }));
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setModal(true);
      toast.error("Please login to like this blog");
    }
  };

  return (
    <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
      <Link
        to={`/blog/${blog?.uniqueSlug}`}
        className="border-b border-gray pb-5 mb-4"
      >
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
      </Link>

      <div className="mt-2">
        <button
          onClick={handleLike}
          className={`w-9 h-9 flex items-center gap-2 text-gray-500 dark:text-gray-400 `}
        >
          <Heart
            className={`${
              isLikedByUser && "fill-red-500 stroke-red-500"
            } cursor-pointer`}
          />
          {total_likes}
        </button>
      </div>
    </div>
  );
};

export default BlogPostCard;
