import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import heroimage from "../../../../assets/hero-image.png";
import "./Hero.css";

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true; // Set to true when the component is mounted

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (isMounted.current) { // Check if component is still mounted
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      }
    }, {
      root: null,
      threshold: 0.3,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      isMounted.current = false; // Set to false when the component unmounts
      if (ref.current) observer.unobserve(ref.current);
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
            <motion.h1 initial="hidden" animate={controls} variants={fadeIn}>
              Discover Your Dream <br />
              Living Space <br /> Property
            </motion.h1>
          </div>
          <motion.div
            className="flexColStart secondaryText flexhero-des"
            initial="hidden"
            animate={controls}
            variants={fadeIn}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <span>
              Welcome to our exclusive real estate properties available for
              purchase.
            </span>
          </motion.div>
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
