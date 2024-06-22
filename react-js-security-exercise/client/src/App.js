import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Alert, Jumbotron, Loading, Navigation } from "./components";
import "./styles/App.css";
import About from "./views/About";
import Contact from "./views/Contact";
import Home from "./views/Home";
import Profile from "./views/Profile";

const SecuredComponent = ({ Component }) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <Component />
  ) : (
    <Alert type="danger">Login to view</Alert>
  );
};

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
      <div className="app-container">
        <Navigation />
        <main>
          <Jumbotron title={state.jumbotronTitle} />
          <Routes>
            <Route
              key="/"
              exact
              path="/"
              element={<SecuredComponent Component={Home} />}
            />
            <Route
              key="/profile"
              path="/profile"
              element={<SecuredComponent Component={Profile} />}
            />
            <Route
              key="/contact"
              path="/contact"
              element={<SecuredComponent Component={Contact} />}
            />
            <Route
              key="/about"
              path="/about"
              element={<SecuredComponent Component={About} />}
            />
          </Routes>
        </main>
        <footer>
          <div className="footer">
            <p>&copy; {state.name} Inc.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
