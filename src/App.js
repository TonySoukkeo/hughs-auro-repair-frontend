import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import NavigationMobile from "./components/navigation/NavigationMobile";
import NavigationDesktop from "./components/navigation/NavigationDesktop";
import Home from "./layout/Home";
import Footer from "./components/footer/Footer";
import Services from "./layout/Services";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationMobile />
        <NavigationDesktop />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/services" component={Services} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
