import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../utilis/constants";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate, useParams } from "react-router";
import { serverTimestamp } from "firebase/firestore";
import EditorContext from "../../contexts/EditorContext";
import getUniqueSlug from "../../utilis/getUniqueSlug";

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
    blog: { title, des },
    setBlog,
    blog,
    textEditor,
  } = useContext(EditorContext);
  const navigate = useNavigate();
  const { blog_id } = useParams();

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const handlePublish = async () => {
    if (!currentUser) {
      return toast.error("You must be logged in to publish a blog");
    }

    if (!title.trim().length) {
      return toast.error("Write blog title to publish it");
    }

    if (textEditor.isReady) {
      try {
        if (!des.trim().length) {
          return toast.error("Write blog description to publish it");
        }
        if (loading) return;
        setLoading(true);
        const data = await textEditor.save();

        const isBlockEmpty = (block) => {
          if (block?.type === "paragraph" || block?.type === "header") {
            const text = block.data?.text?.replace(/&nbsp;/g, " ").replace(/<[^>]+>/g, "").trim();
            return text.length === 0;
          }

          if (block.type === "list") {
            return Array.isArray(block?.data?.items) || block?.data?.items?.some(
              (item) => item.replace(/&nbsp;/g, " ").replace(/<[^>]+>/g, "").trim().length > 0
            );
          }

          if (block?.type === "code") {
            return block?.data?.code?.trim().replace(/<[^>]+>/g, "").length;
          }

          return true;
        };

        if (data.blocks.length === 0 || isBlockEmpty(data.blocks[0])) {
          toast.error("Write something in your blog to publish it");
          setLoading(false);
          return;
        }

        const uniqueSlug = blog_id || (await getUniqueSlug(slug));
        const newBlog = {
          ...blog,
          content: data,
          createdAt: serverTimestamp(),
          uniqueSlug,
          author: {
            personal_info: { uid, fullname, username, user_img },
          },
        };
        if (blog_id) {
          await setDoc(doc(db, "blogs", blog_id), newBlog, { merge: true });
        } else {
          setBlog(newBlog);
          await setDoc(doc(db, "blogs", uniqueSlug), newBlog);
        }

        toast.success("Your blog is published");
        navigate(`/blog/${uniqueSlug}`);
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
