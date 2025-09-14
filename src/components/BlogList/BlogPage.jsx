import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { db } from "../../firebase/firebase";
import { useAuth, USER_IMG, useTheme } from "../../utilis/constants";
import { getDate } from "../../utilis/date";
import Navbar from "../Navbar";
import BlogContent from "./BlogContent";
import { Loader } from "react-feather";
import Modal from "../Modal";
import toast from "react-hot-toast";
import BlogInteraction from "./BlogInteraction";
import CommentContainer from "./CommentConatiner";

const BlogPage = () => {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLikedByUser, setLikedByUser] = useState(false);
  const [commentsWrapper, setCommentsWrapper] = useState(false);

  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const { uid } = currentUser || "";
  const [showModal, setModal] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "My Blogs", href: "/my-blogs" },
  ];

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogsRef = collection(db, "blogs");
        const q = query(blogsRef, where("uniqueSlug", "==", blog_id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0];
          setBlog({ id: docData.id, ...docData.data() });
        } else {
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

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "blogs", blog.id));
      setModal(false);

      toast.success("Blog delete successful");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const title = blog?.title;
  const author = blog?.author;
  const createdAt = blog?.createdAt;
  const content = blog?.content;
  const publishedAt = createdAt?.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const name = author?.personal_info?.fullname;
  const username = author?.personal_info?.username;
  const user_img = author?.personal_info?.user_img || USER_IMG(theme);

  return (
    <>
      <Navbar nav={navigation} flag={"home"} />

       <CommentContainer setBlog={setBlog} blog={blog} commentsWrapper={commentsWrapper} setCommentsWrapper={setCommentsWrapper}/>

      <div className="max-w-[900px] mx-auto py-10 max-lg:px-[5vw]">
        <h2 className="h2 dark:text-white">{title}</h2>
        <div className="flex max-sm:flex-col justify-between my-8">
          <div className="flex gap-5 items-start">
            <img
              src={user_img}
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <p className="capitalize dark:text-white">
              {name}
              <br />@<span className="underline">{username}</span>
            </p>
          </div>
          <p className="text-gray-700 opacity-75 max-sm:mt-6 max-sm:ms-12 max-sm:l-5 dark:text-gray-300">
            Published on {getDate(publishedAt)}
          </p>
        </div>

        {uid === blog?.author?.personal_info?.uid && (
          <div className="text-end w-full">
            <Link
              to={`/edit-blog/${blog_id}`}
              className="underline hover:text-purple-500 me-5 dark:text-white"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => {
                setModal(true);
              }}
              className="underline hover:text-red-500 dark:text-white"
            >
              Delete
            </button>
          </div>
        )}

        <BlogInteraction
          blog={blog}
          setBlog={setBlog}
          isLikedByUser={isLikedByUser}
          setLikedByUser={setLikedByUser}
          setCommentsWrapper={setCommentsWrapper}
        />

        <div className="my-15">
          {loading ? (
            <div className="w-full h-11/12 flex justify-center items-center loading">
              <Loader className="loader" />
            </div>
          ) : content.blocks.length ? (
            content.blocks.map((block, i) => (
              <BlogContent key={i} block={block} />
            ))
          ) : (
            <h2>Blog Not Found</h2>
          )}
        </div>

        <BlogInteraction
          blog={blog}
          setBlog={setBlog}
          isLikedByUser={isLikedByUser}
          setLikedByUser={setLikedByUser}
          setCommentsWrapper={setCommentsWrapper}
        />
        {showModal && (
          <Modal open={showModal} close={() => setModal(false)}>
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Confirm Delete
              </h2>
              <p className="dark:text-white">
                Are you sure you want to delete this blog?
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default BlogPage;
