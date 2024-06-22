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
  const { isLoading, error, isAuthenticated } = useAuth0();

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
              element={
                isAuthenticated ? (
                  <Home />
                ) : (
                  <Alert type="danger">Login to view</Alert>
                )
              }
            />
            {isAuthenticated ? (
              <>
                <Route key="/profile" path="/profile" element={<Profile />} />
                <Route key="/contact" path="/contact" element={<Contact />} />
                <Route key="/about" path="/about" element={<About />} />
              </>
            ) : null}
          </Routes>
        </main>
        <footer>
          <div className="footer">
            <p>&copy; {state.name} Inc.</p>
            {/* <div dangerouslySetInnerHTML={createMarkup()}></div> */}
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
