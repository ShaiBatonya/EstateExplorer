import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useViewportScroll,
  useTransform,
} from "framer-motion";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroImage from "../../../../assets/hero-image.png";
import valueImage from "../../../../assets/value.png";
import pic3 from "../../../../assets/pic3.avif";
import "./Hero.css";

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  // Parallax scroll
  const { scrollY } = useViewportScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, 80]);

  // Hero images
  const [currentImage, setCurrentImage] = useState(heroImage);
  const images = [heroImage, valueImage, pic3];

  // Observe when the hero section is in view
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { root: null, threshold: 0.15 }
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [controls]);

  // Rotate images every 6s
  useEffect(() => {
    const interval = setInterval(() => {
      controls.start("fadeOut").then(() => {
        setCurrentImage((prev) => {
          const currentIndex = images.indexOf(prev);
          return images[(currentIndex + 1) % images.length];
        });
        controls.start("fadeIn");
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [controls, images]);

  // Framer Motion variants
  const fadeInOutVariants = {
    fadeOut: { opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } },
    fadeIn: { opacity: 1, transition: { duration: 1.5, delay: 0.5, ease: "easeInOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.15,
        duration: 1,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  // Slick carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    pauseOnHover: true,
    fade: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true },
      },
    ],
  };

  return (
    <section className="hero-section" ref={ref}>
      {/* Parallax decorative background */}
      <motion.div className="hero-parallax-bg" style={{ y: parallaxY }} />

      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="hero-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        {/* Text Block */}
        <motion.div
          className="hero-content"
          variants={fadeInUpVariants}
          style={{
            flex: "1",
            zIndex: 2,
            padding: "2rem",
            maxWidth: "600px",
          }}
        >
          <h1 className="hero-title">
            Explore the <span>Height of Elegance</span>
          </h1>
          <h2 className="hero-subtitle">Luxury Living Redefined</h2>
          <p className="hero-description">
            Indulge in a curated collection of high-end properties designed for
            comfort, sophistication, and an elevated lifestyle.
          </p>

          <div className="cta-buttons">
            <Link to="/properties" className="button primary-button">
              View Properties
            </Link>
            <Link to="/contact" className="button secondary-button">
              Contact Us
            </Link>
          </div>

          <motion.div
            className="stats-carousel"
            variants={fadeInUpVariants}
            style={{ marginTop: "2rem" }}
          >
            <Slider {...sliderSettings}>
              {[
                { end: 25000, label: "Exclusive Estates", description: "From city penthouses to island retreats" },
                { end: 12000, label: "Satisfied Clients", description: "Join our global family" },
                { end: 200, label: "Prestigious Awards", description: "Excellence recognized worldwide" },
              ].map((stat, i) => (
                <div key={i} className="stat-slide">
                  <motion.div whileHover={{ scale: 1.07 }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
                      <CountUp start={0} end={stat.end} duration={2.8} delay={0.3} />
                      <span className="plus-sign">+</span>
                    </motion.div>
                    <p className="stat-label">{stat.label}</p>
                    <p className="stat-description">{stat.description}</p>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="hero-image-container"
          variants={fadeInOutVariants}
          animate={controls}
          style={{
            flex: "1",
            maxWidth: "50%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={currentImage}
            alt="Hero property"
            className="hero-image"
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "80vh",
              objectFit: "cover",
              borderRadius: "1rem",
            }}
          />
          <div className="image-overlay" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(Hero);
