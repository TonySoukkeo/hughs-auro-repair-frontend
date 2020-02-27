import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import NavigationMobile from "./components/navigation/NavigationMobile";
import NavigationDesktop from "./components/navigation/NavigationDesktop";
import Home from "./layout/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationMobile />
        <NavigationDesktop />

        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
