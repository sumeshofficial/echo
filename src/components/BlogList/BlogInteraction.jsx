import { Heart, MessageCircleMore } from "lucide-react";
import { useAuth } from "../../utilis/constants";
import { useContext, useEffect } from "react";
import ModalContext from "../../contexts/modalContext/ModalContext";
import toast from "react-hot-toast";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const BlogInteraction = ({
  blog,
  setBlog,
  isLikedByUser,
  setLikedByUser,
  setCommentsWrapper,
}) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  const { setModal } = useContext(ModalContext);

  const blog_id = blog?.uniqueSlug;
  const total_comments = blog?.activity?.total_comments;
  let total_likes = blog?.activity?.total_likes;

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!currentUser || !blog_id) return;
      const blogRef = doc(db, "blogs", blog_id);

      const data = await getDoc(blogRef);
      const stat = data.data()?.likes[userId];

      if (stat) {
        setLikedByUser(stat);
      }
    };
    fetchLikeStatus();
  }, [currentUser, blog_id]);

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

      const blogRef = doc(db, "blogs", blog_id);

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
    } else {
      setModal(true);
      toast.error("Please login to like this blog");
    }
  };

  return (
    <>
      <hr className="border-gray-300 my-2 dark:border-gray-700" />

      <div className="flex gap-6 ">
        <div className="flex gap-3 items-center">
          <button
            onClick={handleLike}
            className={
              "rounded-full flex items-center justify-center w-10 h-10 cursor-pointer " +
              (isLikedByUser
                ? "bg-red-200 dark:bg-red-200/20 text-red-500 dark:text-red-400/30"
                : "bg-gray-50 dark:bg-gray-800 dark:text-white")
            }
          >
            <Heart
              className={
                "w-5 h-5 " + (isLikedByUser && "fill-red-500 stroke-red-500")
              }
            />
          </button>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {total_likes}
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setCommentsWrapper((prev) => !prev)}
            className="rounded-full flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 dark:text-white cursor-pointer"
          >
            <MessageCircleMore className="w-5 h-5" />
          </button>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {total_comments}
          </p>
        </div>

        <div className="flex gap-6 items-center"></div>
      </div>

      <hr className="border-gray-300 my-2 dark:border-gray-700" />
    </>
  );
};

export default BlogInteraction;
