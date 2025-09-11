import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router";
import Modal from "./Modal";
import SingIn from "./Auth/SignIn/SingIn";
import SingUp from "./Auth/SignUp/SignUp";
import { LOGO, useAuth, USER_IMG, useTheme } from "../utilis/constants";
import { doSignOut } from "../firebase/auth";
import { Edit } from "lucide-react";
import ModalContext from "../contexts/modalContext/ModalContext";
import PublishButton from "./BlogEdit/PublishButton";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ nav, flag }) {
  const { userLoggedIn, currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { showModal, setModal } = useContext(ModalContext);
  const [authMode, setAuthMode] = useState("signin");
  const user_img = currentUser?.photoURL || USER_IMG(theme);
  const logo = LOGO(theme);
  const navigation = nav;

  return (
    <>
      <Disclosure
        as="nav"
        className="relative bg-gray-300/50 dark:bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
      >
        <div
          className={`mx-auto ${
            flag !== "edit" ? "max-w-8xl" : "max-w-5xl"
          } px-2 sm:px-6 lg:px-8`}
        >
          <div className="relative flex h-16 items-center justify-around">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              {flag !== "edit" && (
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800  hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500 dark:text-gray-400">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              )}
            </div>
            <div
              className={`flex flex-1 items-center ${
                flag === "edit" ? "justify-normal" : "justify-center"
              } sm:items-stretch sm:justify-start`}
            >
              <div className="flex shrink-0 items-center">
                <Link to={"/"}>
                  <img alt="Your Company" src={logo} className="h-8 w-auto" />
                </Link>
              </div>
              {flag !== "edit" && (
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            isActive
                              ? "text-black bg-gray-300 dark:bg-gray-950/50 dark:text-white"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-white/5 hover:text-gray-700 dark:hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* publish button */}
              {flag === "edit" && <PublishButton />}

              {flag !== "edit" && (
                <Link
                  to={currentUser ? "/edit-blog" : "#"}
                  onClick={(e) => {
                    if (!currentUser) {
                      e.preventDefault();
                      setAuthMode("signin");
                      setModal(true);
                    }
                  }}
                  className="hidden md:flex me-8 dark:text-gray-400"
                >
                  <Edit className="w-6 h-6 me-1.5" />
                  <span>Write</span>
                </Link>
              )}

              {/* Theme toggle button */}
              {flag !== "edit" && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-gray-800 dark:text-gray-400 hover:text-gray-400 dark:hover:text-white"
                >
                  {theme === "dark" ? (
                    <SunIcon className="w-6 h-6" />
                  ) : (
                    <MoonIcon className="w-6 h-6" />
                  )}
                </button>
              )}

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={user_img}
                    className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 outline -outline-offset-1 outline-gray-300 dark:outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  {userLoggedIn !== true ? (
                    <>
                      <MenuItem>
                        <button
                          onClick={() => {
                            setAuthMode("signup");
                            setModal(true);
                          }}
                          type="button"
                          className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                        >
                          Sign up
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={() => {
                            setAuthMode("signin");
                            setModal(true);
                          }}
                          type="button"
                          className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                        >
                          Sign in
                        </button>
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem>
                      <button
                        onClick={doSignOut}
                        type="button"
                        className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                      >
                        Logout
                      </button>
                    </MenuItem>
                  )}

                  {flag !== "edit" && (
                    <MenuItem>
                      <Link
                        to={currentUser ? "/edit-blog" : "#"}
                        onClick={(e) => {
                          if (!currentUser) {
                            e.preventDefault();
                            setAuthMode("signin");
                            setModal(true);
                          }
                        }}
                        className="md:hidden flex ms-3 mb-5 mt-3 dark:text-gray-400"
                      >
                        <Edit className="w-6 h-6 me-1.5" />
                        <span className="text-base">Write</span>
                      </Link>
                    </MenuItem>
                  )}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-950/50 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-white/5 hover:text-gray-700 dark:hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      {/* Signup modal appears here */}
      {showModal && (
        <Modal>
          {authMode === "signin" ? (
            <SingIn switchMode={() => setAuthMode("signup")} />
          ) : (
            <SingUp switchMode={() => setAuthMode("signin")} />
          )}
        </Modal>
      )}
    </>
  );
}
