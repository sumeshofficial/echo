import { Route, BrowserRouter as Router, Routes } from "react-router";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
