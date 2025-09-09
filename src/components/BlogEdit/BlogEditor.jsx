import { useContext, useEffect } from "react";
import { EditorContext } from "./BlogEdit";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./Tools";

const BlogEditor = () => {

  const {setBlog, blog, setTextEditor } = useContext(EditorContext);

  useEffect( () => {
    setTextEditor(new EditorJS({
      holder: "textEditor",
      tools: tools,
      placeholder: "Let's write an awesome story",
      data: {}
    }))
  }, []);

  const handleTitleKeyDown = (e) => {
    if(e.keyCode === 13) {
        e.preventDefault();
    }
  }

  const handleTitleChange = (e) => {
    let input = e.target;

    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';

    setBlog({ ...blog, title: input.value });
  }

  return (
    <div>
      <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8 mt-8">

        <textarea
          name=""
          id=""
          placeholder="Title"
          className="text-6xl font-medium w-full h-20 outline-none resize-none mt-5 leading-tight placeholder:opacity-40 dark:text-white"
          onKeyDown={handleTitleKeyDown}
          onChange={handleTitleChange}
        ></textarea>

        <hr className="w-full opacity-10 my-5 dark:text-white"/>

        <div id="textEditor" className="font-sans dark:text-white"></div>
      </div>
    </div>
  );
};

export default BlogEditor;
