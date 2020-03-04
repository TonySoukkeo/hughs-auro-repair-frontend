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
import Blog from "./layout/blog/Blog";
import Admin from "./layout/Admin";
import Dashboard from "./layout/dashboard/Dashboard";
import AddPost from "./layout/dashboard/AddPost";
import ViewBlog from "./layout/blog/ViewBlog";
import EditPost from "./layout/blog/EditPost";
import ViewPosts from "./layout/dashboard/ViewPosts";
import ManageGallery from "./layout/dashboard/ManageGallery";
import Quote from "./layout/Quote";
import NotFound from "./layout/NotFound";

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
          <Route exact path="/blog/:id" component={ViewBlog} />
          <Route exact path="/blog/edit/:id" component={EditPost} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/add-post" component={AddPost} />
          <Route exact path="/dashboard/view-posts" component={ViewPosts} />
          <Route
            exact
            path="/dashboard/manage-gallery"
            component={ManageGallery}
          />
          <Route exact path="/quote" component={Quote} />

          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
