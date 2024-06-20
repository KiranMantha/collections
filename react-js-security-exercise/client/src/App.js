import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Alert } from "./components/Alert";
import Jumbotron from "./components/Jumbotron";
import Navigation from "./components/Navigation";
import "./styles/App.css";
import About from "./views/About";
import Contact from "./views/Contact";
import Home from "./views/Home";
import Profile from "./views/Profile";

// const createMarkup = () => {
//   return { __html: 'i"m so dangerous' };
// };

function App() {
  const state = {
    name: "Manny Henri",
    jumbotronTitle: "List of courses",
  };

  return (
    <Router>
      <div className="container">
        <Navigation />
        <Jumbotron title={state.jumbotronTitle} />
        <Alert>Hello All</Alert>
        <Routes>
          <Route key="/" exact path="/" element={<Home />} />
          <Route key="/profile" path="/profile" element={<Profile />} />
          <Route key="/contact" path="/contact" element={<Contact />} />
          <Route key="/about" path="/about" element={<About />} />
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
