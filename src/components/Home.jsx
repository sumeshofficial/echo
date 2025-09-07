import { useAuth } from "../utilis/constants";

const Home = () => {
  const { currentUser } = useAuth();
  const {displayName} = currentUser || "";
  return <h2>Welcome {displayName}</h2>;
};

export default Home;
