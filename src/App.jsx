import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import image1 from "./img1.jpg";
import image2 from "./img2.jpg";
import image3 from "./img3.jpg";
import image4 from "./img4.jpg";
import image5 from "./image5.jpg";
import image6 from "./image6.jpg";
import carousel1 from "./boot.png";
import carousel2 from "./noormal.png";
import carousel3 from "./boo.png";
import carousel4 from "./cr1.png"
import carousel5 from "./cr2.png"
import carousel6 from "./cr3.png"
import carousel7 from "./cr4.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

const Section = ({ id, title, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight * 0.7) setVisible(true);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [id]);

  return (
    <section className="section" id={id}>
      {visible ? (
        <motion.div
          className="section-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2>{title}</h2>
          <p>{children}</p>
        </motion.div>
      ) : (
        <div style={{ minHeight: "300px" }} />
      )}
    </section>
  );
};

const App = () => {
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [showHeroImages, setShowHeroImages] = useState(false);
  const [activeShoeIndex, setActiveShoeIndex] = useState(null);

  useEffect(() => {
    const timerImages = setTimeout(() => setShowHeroImages(true), 1000);
    const timerContent = setTimeout(() => setShowHeroContent(true), 1500);
    return () => {
      clearTimeout(timerImages);
      clearTimeout(timerContent);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("fullscreen-active", activeShoeIndex !== null);
    return () => document.body.classList.remove("fullscreen-active");
  }, [activeShoeIndex]);

  const shoes = [
    { image: image1, title: "Air Pulse", desc: "Engineered with ultra-light mesh and responsive cushioning, the Air Pulse delivers peak performance while keeping you cool. Designed for everyday athletes and streetwear lovers alike, it’s the perfect fusion of innovation and attitude." },
    { image: image2, title: "Urban Runner", desc: "Built with a durable outsole and reinforced toe guard, the Urban Runner is your go-to for fast-paced urban living. It combines sleek aesthetics with rugged functionality, built for those who chase energy and efficiency in every stride." },
    { image: image3, title: "Street Hawk", desc: "With its aggressive silhouette and turbocharged cushioning, the Street Hawk is made for speed and impact. Its multi-zone grip ensures ultimate control on any surface—perfect for street takeovers and late-night runs." },
    { image: image4, title: "Classic Breeze", desc: "A modern twist on vintage cool. The Classic Breeze features breathable fabric, soft ankle support, and minimalist lines—offering comfort and style that feels as light as air." },
    { image: image5, title: "Night Glider", desc: "Designed for low-light conditions, the Night Glider integrates reflective detailing and glow-in-the-dark accents. Its adaptive sole provides smooth transitions for moonlit jogs or twilight strolls." },
    { image: image6, title: "Eco Step", desc: "Crafted from sustainable materials without sacrificing performance, the Eco Step lets you walk lightly—on your feet and the planet. With a biodegradable midsole and recycled fabric upper, it’s future-forward fashion at its best." },
  ];

  const carouselImages = [carousel1, carousel2, carousel3,carousel4,carousel5,carousel6,carousel7];

  const scrollToShop = () => {
    const el = document.getElementById("shop");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewCollection = (idx) => {
    setActiveShoeIndex(idx);
  };

  const clearView = () => {
    setActiveShoeIndex(null);
  };

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div className={`App ${activeShoeIndex !== null ? "blur-mode" : ""}`}>
      <section className="hero">
        {showHeroImages &&
          shoes.map((shoe, idx) => {
            const positions = [
              "top-left",
              "top-center",
              "top-right",
              "bottom-left",
              "bottom-center",
              "bottom-right",
            ];
            return (
              <motion.img
                key={idx}
                src={shoe.image}
                alt={`shoe-${idx}`}
                className={`shoe-img ${positions[idx]}`}
                initial={{ opacity: 0, x: -10, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.2 * idx, duration: 0.6 }}
                onClick={() => {
                  const targetId = idx === 0 ? "shop" : `shoe-${idx}`;
                  const el = document.getElementById(targetId);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ cursor: "pointer" }}
              />
            );
          })}

        {showHeroContent && (
          <motion.div
            className="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1>🔥 SHOEVERSE</h1>
            <p>Your ultimate sneaker destination</p>
            <button onClick={scrollToShop}>Shop Now</button>
          </motion.div>
        )}
      </section>

      

      {shoes.map(({ image, title, desc }, idx) => (
        <section
          className={`collection-section ${idx % 2 === 1 ? "reverse" : ""} ${
            activeShoeIndex !== null ? "blurred" : ""
          }`}
          key={idx}
          id={idx === 0 ? "shop" : `shoe-${idx}`}
        >
          <div className="collection-image">
            <img src={image} alt={title} />
          </div>
          <div className="collection-details">
            <motion.h2
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              🛍 {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              {desc}
            </motion.p>
            <motion.button
              className="shop-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewCollection(idx)}
            >
              View Full Collection
            </motion.button>
          </div>
        </section>
      ))}

      {activeShoeIndex !== null && (
        <div className="fullscreen-overlay">
          <img src={shoes[activeShoeIndex].image} alt="Full View" />
          <button className="fullscreen-close-btn" onClick={clearView}>
            ✖ Close View
          </button>
        </div>
      )}
      {/* 🚀 Carousel Section */}
      <section className="carousel-section">
        <Slider {...carouselSettings}>
          {carouselImages.map((img, idx) => (
            <div key={idx} className="carousel-slide">
              <img src={img} alt={`carousel-${idx}`} className="carousel-image" />
            </div>
          ))}
        </Slider>
      </section>

      <Section id="about" title=" About Us">
        We’re passionate about style, comfort, and innovation in footwear.
      </Section>
    </div>
  );
};

export default App;

