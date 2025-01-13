import React, { lazy, useState } from "react";
import {
  Hero,

  // AboutUs,
  //  OurServices,
  //  ContactUs,
  //  FAQ
} from "../components/home";
import { SectionName } from "../App";
import QuoteModal from "../components/QuoteModal";

const AboutUs = lazy(() => import("../components/home/AboutUs"));
const TransportationSolutions = lazy(() => import("../components/home/TransportationSolutions"));
const ContactUs = lazy(() => import("../components/home/ContactUs"));
const ServicesSection = lazy(() => import("../components/home/ServicesSection"));
const Testimonials = lazy(() => import("../components/home/Testimonials"));
const DriverCareers = lazy(() => import("../components/home/DriverCareers"));
const FleetSection = lazy(() => import("../components/home/FleetSection"));
const CoverageSection = lazy(() => import("../components/home/CoveregeSection"));

interface HomeProps {
  sectionRefs: React.MutableRefObject<{ [key in SectionName]: HTMLElement | null }>;
  scrollToSection: (section: SectionName) => void;
}

export interface ModalConfig {
  msg: string;
  type: string;
  isOpen: boolean;
}


function Home({ sectionRefs, scrollToSection }: HomeProps) {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    msg: "",
    type: "success",
    isOpen: false,
  });

  const onModalToggle = ({ msg, type, isOpen }: ModalConfig) => {
    setModalConfig({
      msg,
      type: "success",
      isOpen: true,
    });
  };

  return (
    <div className="">
      <section ref={(el) => (sectionRefs.current.home = el)} id="home">
        <Hero scrollToSection={scrollToSection} onModalToggle={onModalToggle} />
      </section>
      <section ref={(el) => (sectionRefs.current.about = el)} id="about">
        <AboutUs />
      </section>
      <section ref={(el) => (sectionRefs.current.services = el)} id="services">
        <ServicesSection />
      </section>
      <section ref={(el) => (sectionRefs.current.fleet = el)} id="fleet">
        <FleetSection onModalToggle={onModalToggle} />
      </section>
      <section ref={(el) => (sectionRefs.current.coverage = el)} id="coverage">
        <CoverageSection onModalToggle={onModalToggle} />
      </section>
      <section ref={(el) => (sectionRefs.current.contact = el)} id="contact">
        <ContactUs />
      </section>

      <QuoteModal isOpen={modalConfig.isOpen} msg={modalConfig.msg} type={modalConfig.type} onClose={() => setModalConfig(prev => ({...prev, isOpen: false}))} />
    </div>
  );
}

export default Home;
