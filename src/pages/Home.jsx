import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../core";
import Header from "../components/Header";
import Posts from "../components/Posts";

import { GlobalContext } from "../context/Context";
import { useContext } from "react";

function Home() {
  // const [profile, setProfile] = useState({});
  let { state } = useContext(GlobalContext);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/profile`, {
        withCredentials: true,
        params: {
          email: state.user.email,
        },
      })
      .then((res) => {
        console.log("res +++: ", res.data);
        // setProfile(res.data);
      });
  }, [state.user.access_token, state.user.email]);

  return (
    <>
      <Header />
      <Posts />
    </>
  );
}

export default Home;
