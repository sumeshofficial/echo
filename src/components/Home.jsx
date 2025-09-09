import BlogPostCard from "./BlogPostCard";
import Navbar from "./Navbar";

const Home = () => {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "My Blogs", href: "/my-blogs" },
  ];
  return (
    <>
      <Navbar nav={navigation} flag={"home"}/>
      <div className="flex justify-center mt-15">
        <BlogPostCard />
      </div>
    </>
  );
};

export default Home;
