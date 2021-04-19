import React, { useState, useEffect, createContext } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const defaultValues = {
  activeLink: "home",
  isTransparent: true,
  mobileNavVisible: false,
  handleMobileNav: () => null,
};

export const NavigationContext = createContext(defaultValues);

const NavigationProvider = ({ children }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [isTransparent, setIsTransparent] = useState(true);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  const handleMobileNav = isVisible => {
    setIsMobileNavVisible(isVisible);
    if (isVisible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const footer = document.querySelector("footer");

    ScrollTrigger.create({
      trigger: sections[0],
      start: "top bottom",
      endTrigger: footer,
      end: "bottom bottom",
      onToggle: ({ isActive }) => setIsTransparent(!isActive),
    });

    ScrollTrigger.create({
      trigger: "header",
      start: "top center",
      end: "bottom 90%",
      onToggle: ({ isActive }) => isActive && setActiveLink("home"),
    });

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
    isMobileNavVisible,
    handleMobileNav,
  };

  return (
    <NavigationContext.Provider value={context}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
