import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Box, Avatar, Text } from "@chakra-ui/react";
import { HiShieldCheck } from "react-icons/hi";
import { MdCancel, MdAnalytics, MdOutlineArrowDropDown } from "react-icons/md";
import valueImage from "../../../../assets/value.png";
import "./Value.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const testimonials = [
  {
    text: "Amazing service, very professional!",
    name: "Emily Johnson",
    role: "Luxury Consultant",
    avatar: "https://i.pravatar.cc/300?img=1",
  },
  {
    text: "Found the perfect property easily!",
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
  };

  return (
    <section id="value" className="v-wrapper" ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="v-container"
      >
        <div className="v-left">
          <motion.div
            initial="hidden"
            animate={controls}
            className="image-container"
          >
            <img src={valueImage} alt="Value Section" />
          </motion.div>
        </div>

        <div className="v-right">
          <span className="orangeText">Our Value</span>
          <motion.span className="primaryText">Value We Give to You</motion.span>
          <motion.span className="secondaryText">
            We provide top-notch services ensuring your dream home is a reality.
          </motion.span>
          <Accordion allowZeroExpanded className="accordion">
            {[
              {
                icon: <HiShieldCheck />,
                heading: "Best interest rates on the market",
                detail: "Get the best rates for your dream home with us.",
              },
              {
                icon: <MdCancel />,
                heading: "Prevent unstable prices",
                detail: "We ensure stability and transparency in all deals.",
              },
              {
                icon: <MdAnalytics />,
                heading: "Best price on the market",
                detail: "Unlock exclusive property deals and unmatched prices.",
              },
            ].map((item, i) => (
              <AccordionItem key={i} className="accordionItem">
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

      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2500 }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        className="testimonials-carousel"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Box className="testimonial-card" mx="auto">
              <Avatar src={testimonial.avatar} size="xl" mb={4} mx="auto" />
              <Text fontSize="lg" mb={2}>
                "{testimonial.text}"
              </Text>
              <Text fontWeight="bold">{testimonial.name}</Text>
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
