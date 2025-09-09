import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { EditorContext } from "./BlogEdit";
import { useAuth } from "../../utilis/constants";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router";
import { serverTimestamp } from "firebase/firestore";

const PublishButton = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const fullname = currentUser?.displayName;
  const uid = currentUser?.uid;
  const user_img = currentUser?.photoURL;
  const email = currentUser?.email;
  const index = email?.indexOf("@");
  const username = email?.slice(0, index);
  const {
    blog: { title },
    setBlog,
    blog,
    textEditor,
  } = useContext(EditorContext);
  const navigate = useNavigate();

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const handlePublish = async () => {
    if (!currentUser) {
      return toast.error("You must be logged in to publish a blog");
    }

    if (!title.length) {
      return toast.error("Write blog title to publish it");
    }

    if (textEditor.isReady) {
      try {
        if (loading) return;
        setLoading(true);
        const data = await textEditor.save();
        if (data.blocks.length) {
          const newBlog = {
            ...blog,
            content: data,
            createdAt: serverTimestamp(),
            slug,
            author: {
              personal_info: { uid, fullname, username, user_img },
            },
          };
          setBlog(newBlog);
          await setDoc(doc(db, "blogs", slug), newBlog);

          toast.success("Your blog is published");
          navigate(`/`);
        } else {
          return toast.error("Write something in your blog to publish it");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <button
        onClick={handlePublish}
        type="button"
        disabled={loading}
        className={`bg-green-600 hover:bg-green-700 active:scale-95 transition-all 
               text-white text-sm font-medium px-3 py-1.5 
               rounded-lg shadow-md ${
                 loading && "opacity-50 cursor-not-allowed"
               }`}
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
};

export default PublishButton;
