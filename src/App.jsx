import { Route, BrowserRouter as Router, Routes } from "react-router";
import MyBlogs from "./components/MyBlogs";
import NotFound from "./components/NotFound";
import BlogEdit from "./components/BlogEdit/BlogEdit";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import BlogPage from "./components/BlogList/BlogPage";
import { Loader } from "react-feather";

const Home = lazy(() => import("./components/Home"));

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader className="loader" />}>
                <Home />
              </Suspense>
            }
          />
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
          <Route path="/blog/:blog_id" element={<BlogPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
