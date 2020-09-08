import React, { useState, useEffect, createContext } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const NavigationContext = createContext({
  activeLink: "home",
  isTransparent: true,
  mobileNavVisible: false,
  handleMobileNav: () => null,
});

const NavigationProvider = ({ children }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [isTransparent, setIsTransparent] = useState(true);
  const [isFullNavVisible, setIsFullNavVisible] = useState(false);

  const handleMobileNav = isVisible => {
    setIsFullNavVisible(isVisible);

    if (isVisible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  };

  useEffect(() => {
    ScrollTrigger.create({
      start: "50",
      endTrigger: "footer",
      end: "bottom top",
      onToggle: ({ isActive }) => setIsTransparent(!isActive),
    });

    ScrollTrigger.create({
      trigger: "header",
      start: "top center",
      end: "bottom 90%",
      onToggle: ({ isActive }) => isActive && setActiveLink("home"),
    });

    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom bottom",
        onToggle: ({ isActive }) => isActive && setActiveLink(section.id),
      });
    });
  }, []);

  const context = {
    activeLink,
    isTransparent,
    isFullNavVisible,
    handleFullNav,
  };

  return (
    <NavigationContext.Provider value={context}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
