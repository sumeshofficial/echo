import { useContext, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import EditorContext from "../../contexts/EditorContext";
import { tools } from "./Tools";
import toast from "react-hot-toast";
import { useAuth } from "../../utilis/constants";
import { useNavigate, useParams } from "react-router";

const BlogEditor = () => {
  const { setBlog, blog, setTextEditor } = useContext(EditorContext);
  const { blog_id } = useParams();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  const navigate = useNavigate();

  useEffect(() => {
    if (blog_id && uid !== blog?.author?.personal_info?.uid) {
      return navigate(`/blog/${blog_id}`);
    }
    setTextEditor(
      new EditorJS({
        holder: "textEditor",
        tools: tools,
        placeholder: "Let's write an awesome story",
        data: blog.content,
      })
    );
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value });
  };

  const handleDesChange = (e) => {
    let input = e.target;
    let value = input.value;

    if (value.length <= 200) {
      input.style.height = "auto";
      input.style.height = input.scrollHeight + "px";

      setBlog({ ...blog, des: value });
    } else {
      toast.error("Description cannot exceed 200 characters!");

      let trimmed = value.slice(0, 200);
      input.value = trimmed;
      setBlog({ ...blog, des: trimmed });
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8 mt-8">
        <textarea
          name="title"
          id="title"
          value={blog.title}
          placeholder="Title"
          className="text-6xl font-medium w-full h-20 outline-none resize-none mt-5 leading-tight placeholder:opacity-40 dark:text-white"
          onKeyDown={handleKeyDown}
          onChange={handleTitleChange}
        ></textarea>

        <hr className="w-full opacity-10 my-5 dark:text-white" />

        <div id="textEditor" className="font-sans dark:text-white"></div>

        <hr className="w-full opacity-10 my-5 dark:text-white" />
        <textarea
          name="description"
          id="description"
          value={blog.des}
          placeholder="Description"
          className="text-base font-medium w-full h-50 outline-none resize-none mt-5 leading-tight placeholder:opacity-40 dark:text-white"
          onKeyDown={handleKeyDown}
          onChange={handleDesChange}
        ></textarea>
      </div>
    </div>
  );
};

export default BlogEditor;
