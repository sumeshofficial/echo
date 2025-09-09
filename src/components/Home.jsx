import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import BlogPostCard from "./BlogPostCard";
import Navbar from "./Navbar";

const Home = () => {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "My Blogs", href: "/my-blogs" },
  ];

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc"),
          limit(5) 
        );

        const querySnapshot = await getDocs(q);
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar nav={navigation} flag={"home"} />
      <div className="h-screen flex flex-col md:flex-row gap-10 px-5 md:px-10 py-5">
        <div className="w-full md:w-2/3">
          {blogs.map((blog) => (
            <BlogPostCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
