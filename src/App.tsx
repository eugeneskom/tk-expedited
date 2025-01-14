// src/App.tsx
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./templates/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LoadingSpinner from "./components/LoadingSpinner";
import CarrierSetup from "./pages/CarrierSetup";

const Home = lazy(() => import("./pages/Home"));

export type SectionName = "home" | "about" | "services" | "contact" | "testimonials" | 
  "careers" | "privacy" | "driver-setup" | "fleet" | "coverage" | "dashboard";

function App() {
  const sectionRefs = React.useRef<{ [key in SectionName]: HTMLElement | null }>({
    home: null,
    about: null,
    services: null,
    careers: null,
    contact: null,
    privacy: null,
    "driver-setup": null,
    fleet: null,
    coverage: null,
    dashboard: null,
    testimonials: null,
  });

  const scrollToSection = React.useCallback((section: SectionName) => {
    const element = sectionRefs.current[section];
    if (element) {
      const offsetTop = 0; // Removed offset since we no longer have a top header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offsetTop;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Navigation scrollToSection={scrollToSection} />
        <div className="flex-1 lg:ml-48"> {/* Added margin to account for sidebar */}
          <main className="min-h-screen">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Home 
                      sectionRefs={sectionRefs} 
                      scrollToSection={scrollToSection} 
                    />
                  } 
                />
                <Route path="/driver-setup" element={<CarrierSetup />} />
              </Routes>
            </Suspense>
          </main>
          <ScrollToTop />
          <Suspense fallback={<FooterSkeleton />}>
            <Footer scrollToSection={scrollToSection} />
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

const FooterSkeleton = () => <div className="h-40 bg-gray-200"></div>;