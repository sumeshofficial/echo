import { Route, BrowserRouter as Router, Routes } from "react-router";
import Home from "./components/Home";
import MyBlogs from "./components/MyBlogs";
import NotFound from "./components/NotFound";
import BlogEdit from "./components/BlogEdit/BlogEdit";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import BlogPage from "./components/BlogList/BlogPage";

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/edit-blog"
            element={
              <ProtectedRoute>
                <BlogEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-blog/:blog_id"
            element={
              <ProtectedRoute>
                <BlogEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-blogs"
            element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/:blog_id"
            element={<BlogPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
