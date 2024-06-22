import axios from "axios";
import React, { useEffect, useState } from "react";
import Feed from "./Feed";

const Home = () => {
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    const getCourses = async () => {
      const response = await axios.get("http://localhost:4000/courses");
      setFeeds(response.data);
    };
    getCourses();
  }, []);
  return <Feed feeds={feeds} />;
};

export default Home;
