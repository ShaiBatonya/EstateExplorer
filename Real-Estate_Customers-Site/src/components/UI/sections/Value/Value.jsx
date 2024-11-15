import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { HiShieldCheck } from "react-icons/hi";
import { MdCancel, MdAnalytics, MdOutlineArrowDropDown } from "react-icons/md";
import valueImage from "../../../../assets/value.png";
import "./Value.css";

const Value = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.3, // Trigger animation when 30% of the section is visible
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [controls]);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section id="value" className="v-wrapper" ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="paddings innerWidth flexCenter v-container"
      >
        {/* Left Side */}
        <div className="v-left">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1.2 } },
            }}
            className="image-container"
          >
            <img src={valueImage} alt="Value Section" />
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="flexColStart v-right">
          <span className="orangeText">Our Value</span>
          <motion.span
            initial="hidden"
            animate={controls}
            variants={fadeIn}
            className="primaryText"
          >
            Value We Give to You
          </motion.span>
          <motion.span
            initial="hidden"
            animate={controls}
            variants={fadeIn}
            className="secondaryText"
          >
            We provide top-notch services ensuring your dream home is a reality.
          </motion.span>

          <Accordion allowZeroExpanded className="accordion">
            {[
              {
                icon: <HiShieldCheck />,
                heading: "Best interest rates on the market",
                detail:
                  "Get the best rates for your dream home with us.",
              },
              {
                icon: <MdCancel />,
                heading: "Prevent unstable prices",
                detail:
                  "We ensure stability and transparency in all deals.",
              },
              {
                icon: <MdAnalytics />,
                heading: "Best price on the market",
                detail:
                  "Unlock exclusive property deals and unmatched prices.",
              },
            ].map((item, i) => (
              <AccordionItem key={i} uuid={i} className="accordionItem">
                <AccordionItemHeading>
                  <AccordionItemButton className="accordionButton">
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
        </div>
      </motion.div>
    </section>
  );
};

export default Value;
