import { useState } from "react";
import { useAuth } from "../../utilis/constants";
import toast from "react-hot-toast";
import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const CommentField = ({ setComments, setBlog, blog, action }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  const fullname = currentUser?.displayName;
  const user_img = currentUser?.photoURL;
  const email = currentUser?.email || "";
  const username = email?.slice(0, email.indexOf("@"));
  const blog_id = blog?.uniqueSlug;
  const isAuthor = userId === blog?.author?.personal_info?.uid;
  const activity = blog?.activity;
  const total_comments = activity?.total_comments;

  const [commentInput, setCommentInput] = useState("");

  const handleComment = async () => {
    if (!currentUser) {
      return toast.error("Login first to leave a comment");
    }

    if (!blog_id) {
      return toast.error("Invalid blog ID");
    }

    try {
      const blogRef = doc(db, "blogs", blog_id);

      const newComment = {
        commented_by: {
          userId,
          fullname,
          username,
          user_img,
          isAuthor,
        },
        comment: commentInput,
        replies: [],
        createdAt: new Date().toISOString(),
      };

      await updateDoc(blogRef, {
        comments: arrayUnion(newComment),
        "activity.total_comments": increment(1),
      });

      setComments((prev) => [...prev, newComment]);
      setBlog({
        ...blog,
        activity: { ...activity, total_comments: total_comments + 1 },
      });

      toast.success("Comment added!");
      setCommentInput("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  return (
    <div>
      <textarea
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="Leave a comment..."
        className="p-5 bg-gray-200 dark:text-white dark:bg-gray-800 w-full rounded-[10px] placeholder:text-gray-500 
          focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-transparent resize-none h-[150px] overflow-auto"
      ></textarea>

      <button
        disabled={!commentInput.trim()}
        className="bg-black dark:bg-white text-white dark:text-black rounded-full text-[19px] mt-3 px-7 py-2 
          disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleComment}
      >
        {action}
      </button>
    </div>
  );
};

export default CommentField;
 