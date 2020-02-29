import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import NavigationMobile from "./components/navigation/NavigationMobile";
import NavigationDesktop from "./components/navigation/NavigationDesktop";
import Home from "./layout/Home";
import Footer from "./components/footer/Footer";
import Services from "./layout/Services";
import About from "./layout/About";
import Contact from "./layout/Contact";
import Gallery from "./layout/Gallery";
import Blog from "./layout/Blog";
import Admin from "./layout/Admin";

// Context
import { DispatchContext } from "./context/StateProvider";

// Actions
import { verifyCreds } from "./reducers/actions/AuthActions";

function App() {
  const { authDispatch } = useContext(DispatchContext);

  useEffect(() => {
    const verify = async () => {
      try {
        // Check for token and userId
        const token = localStorage.getItem("token");

        const userId = localStorage.getItem("userId");

        await verifyCreds(token, userId, authDispatch);
      } catch (err) {
        console.log(err);
      }
    };
    verify();
  }, []);

  return (
    <Router>
      <div className="App">
        <NavigationMobile />
        <NavigationDesktop />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
