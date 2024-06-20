import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import data from "../data/data.json";
import About from "./About";
import "./App.css";
import Contact from "./Contact";
import Feed from "./Feed";
import Jumbotron from "./Jumbotron";
import Navigation from "./Navigation";

// const createMarkup = () => {
//   return { __html: 'i"m so dangerous' };
// };

function App() {
  const [state, setState] = useState({
    name: "Manny Henri",
    jumbotronTitle: "List of courses",
    feeds: [],
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, feeds: data }));
  }, []);

  return (
    <Router>
      <div className="container">
        <Navigation />
        <Jumbotron title={state.jumbotronTitle} />
        <Routes>
          <Route key="/contact" path="/contact" element={<Contact />} />
          <Route key="/about" path="/about" element={<About />} />
          <Route
            key="/"
            exact
            path="/"
            element={<Feed feeds={state.feeds} />}
          />
        </Routes>
        <div className="footer">
          <p>&copy; {state.name} Inc.</p>
          {/* <div dangerouslySetInnerHTML={createMarkup()}></div> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
