import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useViewportScroll, useTransform } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Box, Text, Avatar } from "@chakra-ui/react";
import { HiShieldCheck } from "react-icons/hi";
import { MdCancel, MdAnalytics, MdOutlineArrowDropDown } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import valueImage from "../../../../assets/value.png";
import "./Value.css";

// Example data
const accordionData = [
  {
    icon: <HiShieldCheck />,
    heading: "Best Interest Rates",
    detail:
      "We combine market expertise with strong lender partnerships to secure unbeatable rates for your dream property.",
  },
  {
    icon: <MdCancel />,
    heading: "Prevent Unstable Prices",
    detail:
      "Benefit from transparent, reliable deals that protect you from sudden market fluctuations and hidden fees.",
  },
  {
    icon: <MdAnalytics />,
    heading: "Top-Tier Pricing",
    detail:
      "Leverage our global network to unlock exclusive listings and ensure you get the best price on the market.",
  },
];

const testimonials = [
  {
    text: "Amazing service, very professional!",
    name: "Emily Johnson",
    role: "Luxury Consultant",
    avatar: "https://i.pravatar.cc/300?img=1",
  },
  {
    text: "Found the perfect property effortlessly!",
    name: "Michael Brown",
    role: "Market Analyst",
    avatar: "https://i.pravatar.cc/300?img=2",
  },
  {
    text: "Highly recommend, fantastic experience!",
    name: "Sarah Lee",
    role: "Property Specialist",
    avatar: "https://i.pravatar.cc/300?img=3",
  },
];

const Value = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  // Parallax effect (similar to Hero)
  const { scrollY } = useViewportScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, 80]);

  // Reveal animations on scroll
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) controls.start("visible");
        else controls.start("hidden");
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.15 },
    },
  };
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="value-section" ref={ref}>
      {/* Parallax background overlay (matching Hero) */}
      <motion.div className="value-parallax-bg" style={{ y: parallaxY }} />

      <motion.div
        className="value-container"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {/* Left: Image */}
        <motion.div className="value-left" variants={fadeInUpVariants}>
          <div className="image-wrapper">
            <img
              src={valueImage}
              alt="Value"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>

        {/* Right: Text + Accordion */}
        <motion.div className="value-right" variants={fadeInUpVariants}>
          <h2 className="value-title">
            Our <span>Value</span>
          </h2>
          <h3 className="value-subtitle">Excellence You Deserve</h3>
          <p className="value-description">
            Experience unparalleled expertise, competitive rates, and tailored
            solutions that make your real estate journey truly exceptional.
          </p>

          <Accordion allowZeroExpanded className="value-accordion">
            {accordionData.map((item, idx) => (
              <AccordionItem key={idx} className="accordion-item">
                <AccordionItemHeading>
                  <AccordionItemButton className="accordion-button">
                    <div className="icon">{item.icon}</div>
                    <span>{item.heading}</span>
                    <MdOutlineArrowDropDown />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>{item.detail}</p>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>

      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="testimonials-carousel"
      >
        {testimonials.map((testimonial, i) => (
          <SwiperSlide key={i}>
            <Box className="testimonial-card">
              <Avatar
                src={testimonial.avatar}
                size="xl"
                mb={4}
                border="2px solid var(--luxury-color)"
              />
              <Text fontSize="lg" fontStyle="italic" mb={2} color="#ffffff">
                "{testimonial.text}"
              </Text>
              <Text fontWeight="bold" color="var(--luxury-color)">
                {testimonial.name}
              </Text>
              <Text fontSize="sm" color="gray.400">
                {testimonial.role}
              </Text>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Value;
