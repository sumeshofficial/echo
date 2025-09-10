import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Navbar from "./Navbar";
import BlogPostCard from "./BlogList/BlogPostCard";
import { useAuth } from "../utilis/constants";
import { Loader } from "react-feather";

const MyBlogs = () => {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "My Blogs", href: "/my-blogs" },
  ];

  const { currentUser } = useAuth();
  const userId = currentUser.uid;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("author.personal_info.uid", "==", userId),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar nav={navigation} flag={"home"} />
      <div className="h-screen flex flex-col md:flex-row gap-10 px-5 md:px-25 py-5">
        <div className="w-full">
          {loading ? (
            <div className="w-full h-11/12 flex justify-center items-center loading">
              <Loader className="loader"></Loader>
            </div>
          ) : blogs.length ? (
            blogs.map((blog) => <BlogPostCard key={blog.id} blog={blog} />)
          ) : (
            <h2 className="dark:text-white">No Blogs Available</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBlogs;
