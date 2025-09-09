import { useState } from "react";
import Navbar from "../Navbar";
import BlogEditor from "./BlogEditor";
import EditorContext from "../../contexts/EditorContext";

const blogStructure = {
  title: "",
  content: [],
  createdAt: null,
  author: { personal_info: {} },
};

const BlogEdit = () => {
  const [blog, setBlog] = useState(blogStructure);
  const [textEditor, setTextEditor] = useState({ isReady: false });

  const navigation = [];
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
        <BlogEditor />
      </EditorContext.Provider>
    </div>
  );
};

export default BlogEdit;
