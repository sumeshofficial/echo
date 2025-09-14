import { Loader, X } from "react-feather";
import CommentField from "./CommentField";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import CommentCard from "./CommentCard";
import toast from "react-hot-toast";

const CommentContainer = ({
  setBlog,
  blog,
  commentsWrapper,
  setCommentsWrapper,
}) => {
  const title = blog?.title;
  const blog_id = blog?.uniqueSlug;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    if (blog_id) {
      const fetchComments = async () => {
        try {
          const blogRef = doc(db, "blogs", blog_id);
          const snap = await getDoc(blogRef);
          if (snap.exists()) {
            setComments(snap.data().comments || []);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching comments:", error);
          setLoading(true);
        }
      };
      fetchComments();
    }
  }, [blog_id]);

  const onEdit = async (index, newText) => {
    if (!blog_id) return;

    try {
      const updatedComments = [...comments];
      updatedComments[index].comment = newText;

      await updateDoc(doc(db, "blogs", blog_id), {
        comments: updatedComments,
      });

      setComments(updatedComments);
      setEditIndex(null);
      setEditInput("");
      toast.success("Comment edited");
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const onDelete = async (index) => {
    if (!blog_id) return;
    try {
      const newComments = comments.filter((_, i) => i !== index);

      await updateDoc(doc(db, "blogs", blog_id), {
        "activity.total_comments": increment(-1),
        comments: newComments,
      });

      setComments(newComments);
      setBlog((prev) => ({
        ...prev,
        activity: {
          ...prev.activity,
          total_comments: prev.activity.total_comments - 1,
        },
      }));

      toast.success("Comment deleted");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div
      className={
        "max-sm:w-full fixed " +
        (commentsWrapper
          ? "top-0 sm:right-[0]"
          : "top-[100%] sm:right-[-100%]") +
        " duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white dark:bg-gray-900 shadow-2xl p-8 px-8 overflow-y-auto overflow-x-hidden"
      }
    >
      <div className="relative">
        <h1 className="text-xl font-medium dark:text-white">Comments</h1>
        <p className="text-lg mt-2 w-[100%] text-gray-700 dark:text-gray-400">
          {title}
        </p>

        <button
          onClick={() => setCommentsWrapper((prev) => !prev)}
          className="absolute top-0 right-0 flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          <X className="w-8 h-8" />
        </button>

        <hr className="border-gray-300 my-8 dark:border-gray-700" />

        <CommentField
          setComments={setComments}
          setBlog={setBlog}
          blog={blog}
          action="Comment"
        />

        {loading ? (
          <div className="w-full h-[300px] flex justify-center items-center loading">
            <Loader className="loader" />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment, i) => (
            <CommentCard
              key={i}
              index={i}
              comment={comment}
              editIndex={editIndex}
              editInput={editInput}
              setEditInput={setEditInput}
              setEditIndex={setEditIndex}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-300">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentContainer;
