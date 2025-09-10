import { useContext } from "react";
import AuthContext from "../contexts/authContext/AuthContext";
import ThemeContext from "../contexts/themeContext/ThemeContext";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useTheme = () => useContext(ThemeContext);

export const USER_IMG = (theme) =>
  theme === "dark"
    ? "/user-img.png"
    : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png";

export const LOGO = (theme) =>
  theme === "dark" ? "/echo-white.png" : "/echo-black.png";
