import React from "react";
import Login from "@/components/login";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  history.push("/login");
  return <div className="App">{/* <Login /> */}</div>;
}

export default Home;
