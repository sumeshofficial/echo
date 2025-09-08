import { useAuth } from "../utilis/constants";

const Home = () => {
  const { currentUser } = useAuth();
  const {displayName} = currentUser || "";
  return <h2 className="dark:text-white">Welcome {displayName}</h2>;
};

export default Home;
