import { useEffect, useState } from "react";

const useNavigation = () => {
  const [currentNav, setCurrentNav] = useState({
    home: false,
    services: false,
    about: false,
    blog: false,
    contact: false,
    admin: false
  });

  const { home, services, about, blog, contact, admin } = currentNav;

  useEffect(() => {
    const pathName = window.location.pathname.split("/")[1];
    switch (pathName) {
      case "":
        setCurrentNav({
          home: true,
          services: false,
          about: false,
          blog: false,
          contact: false,
          admin: false
        });
        break;

      case "services":
        setCurrentNav({
          home: false,
          services: true,
          about: false,
          blog: false,
          contact: false,
          admin: false
        });
        break;

      case "about":
        setCurrentNav({
          home: false,
          services: false,
          about: true,
          blog: false,
          contact: false,
          admin: false
        });
        break;

      case "blog":
        setCurrentNav({
          home: false,
          services: false,
          about: false,
          blog: true,
          contact: false,
          admin: false
        });
        break;

      case "contact":
        setCurrentNav({
          home: false,
          services: false,
          about: false,
          blog: false,
          contact: true,
          admin: false
        });
        break;

      case "admin":
        setCurrentNav({
          home: false,
          services: false,
          about: false,
          blog: false,
          contact: false,
          admin: true
        });
        break;

      default:
        break;
    }
  }, []);

  const setNav = type => {
    switch (type) {
      case "home":
        setCurrentNav({
          home: true,
          services: false,
          about: false,
          blog: false,
          contact: false,
          admin: false
        });
        break;

      case "services":
        setCurrentNav({
          home: false,
          services: true,
          about: false,
          blog: false,
          contact: false,
          admin: false
        });
        break;

      case "about":
        setCurrentNav({
          home: false,
          services: false,
          about: true,
          blog: false,
          contact: false,
          admin: false
        });
        break;

      case "blog":
        setCurrentNav({
          home: false,
          services: false,
          about: false,
          blog: true,
          contact: false,
          admin: false
        });
        break;

      case "contact":
        setCurrentNav({
          home: false,
          services: false,
          about: false,
          blog: false,
          contact: true,
          admin: false
        });
        break;

      case "admin":
        setCurrentNav({
          home: false,
          services: false,
          about: false,
          blog: false,
          contact: false,
          admin: true
        });
        break;

      default:
        break;
    }
  };

  return { home, services, about, blog, contact, admin, setCurrentNav, setNav };
};

export default useNavigation;
