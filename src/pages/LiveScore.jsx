// import axios from "axios";
import { useEffect } from "react";
import { baseUrl } from "../core";
import Header from "../components/Header";
// import { GlobalContext } from "../context/Context";
// import { useContext } from "react";
import { useState } from "react";

import io from "socket.io-client";

const socket = io(baseUrl);

function LiveScore() {
  const [socketData, setsocketData] = useState([]);
  // const [profile, setProfile] = useState({});
  // let { state } = useContext(GlobalContext);

  // useEffect(() => {
  //   axios
  //     .get(`${baseUrl}/api/v1/profile`, {
  //       withCredentials: true,
  //       params: {
  //         email: state.user.email,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("res +++: ", res.data);
  //       // setProfile(res.data);
  //     });
  // }, [state.user.access_token, state.user.email]);

  useEffect(() => {
    socket.on("connect", function () {
      console.log("connected to server");
    });
    // to subcribe to a topic
    socket.on("Test topic", function (data) {
      // console.log(data);
      setsocketData((prev) => [data, ...prev]);
    });

    socket.on("disconnect", function (message) {
      console.log("disconnected from server: ", message);
    });
    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <Header />
      <h1>123</h1>
      {socketData.map((item) => {
        console.log(item.data);
        return "";
      })}
    </>
  );
}

export default LiveScore;
