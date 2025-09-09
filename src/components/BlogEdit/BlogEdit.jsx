import { createContext, useState } from "react";
import Navbar from "../Navbar";
import BlogEditor from "./BlogEditor";
import PublishForm from "./PublishForm";

const blogStructure = {
  title: "",
  content: [],
  tags: [],
  des: "",
  author: { personal_info: {} },
};

export const EditorContext = createContext();

const BlogEdit = () => {
  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");

  const navigation = [];
  return (
    <div>
      <Navbar nav={navigation} flag={"edit"} />
      <EditorContext.Provider value={{blog, setBlog, editorState, setEditorState}}>
        {editorState === "editor" ? <BlogEditor /> : <PublishForm />}
      </EditorContext.Provider>
    </div>
  );
};

export default BlogEdit;
