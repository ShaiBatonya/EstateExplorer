// src/components/UI/sections/Hero/Hero.jsx

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import './Hero.css';
import { Link } from 'react-router-dom';
import heroImage from '../../../../assets/hero-image.png'; // Ensure this is a high-resolution image

const Hero = () => {
  // Animation controls
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // Intersection Observer to trigger animations when the component is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [controls]);

  // Animation variants
  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="hero-section" ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
        className="hero-container"
      >
        {/* Text Content - Left Side */}
        <motion.div className="hero-content" variants={fadeInLeft}>
          {/* Title */}
          <h1 className="hero-title">
            Discover the <span>Peak of Luxury</span>
          </h1>

          {/* Subtitle */}
          <h2 className="hero-subtitle">
            Find Your Perfect Dream Home
          </h2>

          {/* Description */}
          <p className="hero-description">
            Open the door to a world of luxury properties. Our exclusive collection offers unparalleled elegance and comfort.
          </p>

          {/* Call to Action Buttons */}
          <div className="cta-buttons">
            <Link to="/properties" className="button primary-button">
              View Properties
            </Link>
            <Link to="/contact" className="button secondary-button">
              Contact Us
            </Link>
          </div>

          {/* Statistics */}
          <div className="stats">
            {[
              { end: 20000, label: 'Luxury Properties' },
              { end: 10000, label: 'Satisfied Clients' },
              { end: 150, label: 'International Awards' },
            ].map((stat, i) => (
              <div key={i} className="stat">
                <CountUp start={0} end={stat.end} duration={3} delay={0.5} />
                <span className="plus-sign">+</span>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image - Right Side */}
        <motion.div
          className="hero-image-container"
          variants={fadeInRight}
        >
          <img src={heroImage} alt="Luxury Property" className="hero-image" loading="lazy" />
          {/* Decorative Overlay */}
          <div className="image-overlay"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(Hero);
