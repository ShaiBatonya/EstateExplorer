// src/components/UI/sections/Hero/Hero.jsx

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import './Hero.css';
import { Link } from 'react-router-dom';
import heroImage from '../../../../assets/hero-image.png'; // Ensure this is a high-resolution image
import valueImage from '../../../../assets/value.png';
import pic3 from '../../../../assets/pic3.avif';
import Slider from 'react-slick'; // Import react-slick for carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Hero = () => {
  // Animation controls
  const controls = useAnimation();
  const ref = useRef(null);
  const [currentImage, setCurrentImage] = useState(heroImage);
  const images = [heroImage, valueImage, pic3];

  useEffect(() => {
    if (!ref.current) return;

    // Intersection Observer to trigger animations when the component is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        } else {
          controls.start('hidden');
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

  useEffect(() => {
    // Timer to switch images every 6 seconds with fade-out and fade-in effect
    const imageSwitchInterval = setInterval(() => {
      controls.start('fadeOut').then(() => {
        setCurrentImage((prevImage) => {
          const currentIndex = images.indexOf(prevImage);
          const nextIndex = (currentIndex + 1) % images.length;
          return images[nextIndex];
        });
        controls.start('fadeIn');
      });
    }, 6000);

    return () => clearInterval(imageSwitchInterval);
  }, [controls, images]);

  // Animation variants
  const fadeInOutImage = {
    fadeOut: { opacity: 0, transition: { duration: 2, ease: 'easeInOut' } },
    fadeIn: { opacity: 1, transition: { duration: 2, delay: 0.5, ease: 'easeInOut' } },
  };

  const staggerContainer = {
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  // Slider settings
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
    adaptiveHeight: false, // Changed to false to prevent container height adjustment
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className="hero-section" ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
        className="hero-container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', height: '100vh' }}
      >
        {/* Text Content - Left Side */}
        <motion.div className="hero-content" variants={fadeInUp} style={{ flex: '1', zIndex: 2, padding: '2rem', maxWidth: '600px' }}>
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
            Step into a world of luxury properties, curated to provide unparalleled elegance and comfort. Your dream home awaits.
          </p>

          {/* Call to Action Buttons */}
          <div className="cta-buttons">
            <Link to="/properties" className="button primary-button">
              Explore Properties
            </Link>
            <Link to="/contact" className="button secondary-button">
              Get in Touch
            </Link>
          </div>

          {/* Statistics Carousel */}
          <motion.div className="stats-carousel" variants={fadeInUp} style={{ marginTop: '2rem' }}>
            <Slider {...sliderSettings}>
              {[
                { end: 20000, label: 'Luxury Properties', description: 'Exclusive homes to choose from' },
                { end: 10000, label: 'Satisfied Clients', description: 'Join our happy clients' },
                { end: 150, label: 'International Awards', description: 'Recognized globally' },
              ].map((stat, i) => (
                <div key={i} className="stat-slide">
                  <motion.div whileHover={{ scale: 1.1 }}>
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

        {/* Image - Right Side */}
        <motion.div
          className="hero-image-container"
          variants={fadeInOutImage}
          animate={controls}
          style={{ flex: '1', height: '100%', position: 'relative', maxWidth: '60%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img
            src={currentImage}
            alt="Luxury Property"
            className="hero-image"
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '600px',
              maxHeight: '600px',
              objectFit: 'cover',
              borderRadius: '20px',
              position: 'relative',
            }}
          />
          {/* Decorative Overlay */}
          <div className="image-overlay"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(Hero);
