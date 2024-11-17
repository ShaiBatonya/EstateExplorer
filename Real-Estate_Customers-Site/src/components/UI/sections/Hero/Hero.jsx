import "./Hero.css";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import heroimage from "../../../../assets/hero-image.png";

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);

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
      {
        root: null,
        threshold: 0.3,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect(); 
    };
  }, [controls]);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="hero-wrapper" ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="paddings innerWidth flexCenter hero-container"
      >
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <motion.div
              className="orange-circle"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
            />
            <motion.h1 variants={fadeIn}>
              Discover Your Dream <br />
              Living Space <br /> Property
            </motion.h1>
            
          </div>

          <motion.div
            className="flexColStart secondaryText flexhero-des"
            variants={fadeIn}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <span>
              Welcome to our exclusive real estate properties available for
              purchase.
            </span>
          </motion.div>

          <div className="flexCenter stats">
            {[
              { start: 8800, end: 9879, label: "Premium Products" },
              { start: 1950, end: 2500, label: "Happy Customers" },
              { start: 0, end: 41, label: "Awards Won" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="flexColCenter stat"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <span>
                  <CountUp start={stat.start} end={stat.end} duration={3} />{" "}
                  <span>+</span>
                </span>
                <span className="secondaryText">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={controls}
            variants={fadeIn}
            transition={{ duration: 1.2, type: "spring" }}
            className="image-container"
          >
            <img src={heroimage} alt="houses" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
