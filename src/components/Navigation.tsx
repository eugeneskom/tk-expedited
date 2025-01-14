import React, { useState, useEffect, useCallback, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SectionName } from "../App";

interface NavItemProps {
  section: SectionName | "driver-setup";
  onClick: (section: SectionName | "driver-setup") => void;
  children: React.ReactNode;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ section, onClick, children, isActive }) => (
  <button
    onClick={() => onClick(section)}
    className={`relative w-full text-left px-6 py-3 text-base font-medium cursor-pointer 
      transition-all duration-300 group
      ${isActive ? "text-white bg-gradient-to-r from-red-500/20 to-transparent border-l-2 border-red-500" : "text-red-200/80 hover:text-white hover:bg-red-500/10 border-l-2 border-transparent"}`}
  >
    {children}
  </button>
);

interface NavigationProps {
  scrollToSection: (section: SectionName) => void;
}

const Navigation: React.FC<NavigationProps> = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionName | "driver-setup">("home");
  const activeSectionRef = useRef(activeSection);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (section: SectionName | "driver-setup") => {
    if (section === "driver-setup") {
      navigate("/driver-setup");
      setActiveSection("driver-setup");
    } else if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(section as SectionName);
        setActiveSection(section as SectionName);
      }, 100);
    } else {
      scrollToSection(section as SectionName);
      setActiveSection(section as SectionName);
    }
    setIsOpen(false);
  };

  const handleScroll = useCallback(() => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 64;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const currentSection = section.id as SectionName;
        if (currentSection !== activeSectionRef.current) {
          setActiveSection(currentSection);
          activeSectionRef.current = currentSection;
        }
      }
    });
  }, []);

  useEffect(() => {
    if (location.pathname === "/driver-setup") {
      setActiveSection("driver-setup");
      activeSectionRef.current = "driver-setup";
    } else {
      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname, handleScroll]);

  const navItems: (SectionName | "driver-setup")[] = ["home", "about", "services", "fleet", "coverage", "contact", "driver-setup"];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen z-50">
        <div className="h-full bg-[#2A0001]/95 backdrop-blur-sm shadow-xl shadow-red-900/10 
          flex flex-col w-48 border-r border-red-500/10">
          <div className="p-6">
            <NavLink to="/" className="block">
              <img src="logo.webp" className="w-32 h-auto" alt="TK Expedited LLC" />
            </NavLink>
          </div>
          
          <div className="flex-1 flex flex-col pt-4">
            {navItems.map((item) => (
              <NavItem 
                key={item} 
                section={item} 
                onClick={handleNavClick} 
                isActive={activeSection === item}
              >
                {item === "driver-setup" ? "DRIVER SETUP" : item.toUpperCase()}
              </NavItem>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#2A0001]/95 backdrop-blur-sm 
        shadow-lg shadow-red-900/10">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between w-full">
            <NavLink to="/" className="flex-shrink-0">
              <img 
                src="logo.webp" 
                className="w-24 sm:w-28 md:w-32 h-auto max-h-32" 
                alt="TK Expedited LLC" 
              />
            </NavLink>

            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-red-200 
                hover:text-white hover:bg-red-500/10 transition-colors duration-200"
            >
              <span className="sr-only">Open menu</span>
              {!isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - remains the same */}
        <div 
          className={`transition-all duration-300 ease-in-out transform ${
            isOpen ? 'translate-y-0 opacity-100 ' : 'hidden -translate-y-full opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 border-t border-red-500/10">
            {navItems.map((item) => (
              <NavItem 
                key={item} 
                section={item} 
                onClick={handleNavClick} 
                isActive={activeSection === item}
              >
                {item === "driver-setup" ? "DRIVER SETUP" : item.toUpperCase()}
              </NavItem>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
