import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import BlogEditor from "./BlogEditor";
import EditorContext from "../../contexts/EditorContext";
import { useParams } from "react-router";
import { Loader } from "react-feather";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const blogStructure = {
  title: "",
  content: [],
  des: "",
  createdAt: null,
  author: { personal_info: {} },
};

const BlogEdit = () => {
  const { blog_id } = useParams();

  const [blog, setBlog] = useState(blogStructure);
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const [loading, setLoading] = useState(true);

  const navigation = [];

  useEffect(() => {
    if (!blog_id) {
      return setLoading(false);
    }

    const fetchBlog = async () => {
      try {
        const blogsRef = collection(db, "blogs");
        const q = query(blogsRef, where("uniqueSlug", "==", blog_id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0];
          setBlog(docData.data());
        } else {
          console.log("Blog not found for slug:", blog_id);
          setBlog(null);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);
  return (
    <div>
      <EditorContext.Provider
        value={{
          blog,
          setBlog,
          textEditor,
          setTextEditor,
        }}
      >
        <Navbar nav={navigation} flag={"edit"} />
        {loading ? (
            <div className="w-full h-11/12 flex justify-center items-center loading">
              <Loader className="loader"></Loader>
            </div>
          ) : <BlogEditor />}
      </EditorContext.Provider>
    </div>
  );
};

export default BlogEdit;
