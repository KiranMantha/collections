import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Alert, Jumbotron, Loading, Navigation } from "./components";
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
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

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
