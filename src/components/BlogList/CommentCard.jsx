import { useEffect, useRef, useState } from "react";
import { useAuth, USER_IMG, useTheme } from "../../utilis/constants";
import { getDate } from "../../utilis/date";
import { MoreVertical } from "react-feather";

const CommentCard = ({
  index,
  comment,
  editIndex,
  editInput,
  setEditInput,
  setEditIndex,
  onEdit,
  onDelete,
}) => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isEditing = editIndex === index;

  return (
    <div className="mt-5 space-y-3">
      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg dark:text-white">
        <div className="flex items-center relative">
          <img
            className="w-5 h-5 rounded-full me-1"
            src={comment.commented_by.user_img || USER_IMG(theme)}
            alt="user"
          />
          <p className="font-semibold me-1">
            {comment.commented_by.fullname || comment.commented_by.username}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {getDate(new Date(comment.createdAt))}
          </p>

          {userId === comment.commented_by.userId && (
            <div className="absolute right-0" ref={menuRef}>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 shadow-md rounded-md z-50">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setEditIndex(index);
                      setEditInput(comment.comment);
                    }}
                    className="w-full text-[14px] text-left px-3 py-1 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      onDelete?.(index);
                    }}
                    className="w-full text-[14px] text-left px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="mt-2">
            <textarea
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              className="w-full bg-none resize-none outline-none border-0 border-b-2 border-b-gray-400 focus:border-b-fuchsia-700 dark:text-white"
            />

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onEdit(index, editInput)}
                disabled={editInput.trim() === comment.comment.trim()}
                className={`px-3 py-1 rounded-md text-white ${
                  editInput.trim() === comment.comment.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-900 dark:hover:bg-gray-100 dark:bg-white dark:text-black"
                }`}
              >
                Save
              </button>
              <button
                onClick={() => setEditIndex(null)}
                className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-2">{comment.comment}</p>
        )}
      </div>
    </div>
  );
};

export default CommentCard;