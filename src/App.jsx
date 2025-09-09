import { Route, BrowserRouter as Router, Routes } from "react-router";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import BlogEdit from "./components/BlogEdit/BlogEdit";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
