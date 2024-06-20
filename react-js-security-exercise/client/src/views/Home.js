import React, { useEffect, useState } from "react";
import data from "../data/data.json";
import Feed from "./Feed";

const Home = () => {
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    setFeeds(data);
  }, []);
  return <Feed feeds={feeds} />;
};

export default Home;
