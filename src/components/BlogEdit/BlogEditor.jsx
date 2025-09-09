import { useContext } from "react";
import { EditorContext } from "./BlogEdit";

const BlogEditor = () => {

  const { blog: {title, content, tags, des, }, setBlog, blog } = useContext(EditorContext);

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
          className="text-6xl font-medium w-full h-20 outline-none resize-none mt-5 leading-tight placeholder:opacity-40"
          onKeyDown={handleTitleKeyDown}
          onChange={handleTitleChange}
        ></textarea>
      </div>
    </div>
  );
};

export default BlogEditor;
