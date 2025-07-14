import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2>
            <span className="logo-long">
              <span className="python-variable">nathan_reyes</span>
              <span className="python-operator"> = </span>
              <span className="python-bracket">{"{"}</span>
              <span className="python-string">"role"</span>
              <span className="python-operator">: </span>
              <span className="python-string">"ai_engineer"</span>
              <span className="python-operator">, </span>
              <span className="python-string">"portfolio"</span>
              <span className="python-operator">: </span>
              <span className="python-keyword">True</span>
              <span className="python-bracket">{"}"}</span>
            </span>
            <span className="logo-short">
              <span className="python-variable">nathan_reyes</span>
              <span className="python-operator"> = </span>
              <span className="python-bracket">{"{"}</span>
              <span className="python-string">"role"</span>
              <span className="python-operator">: </span>
              <span className="python-string">"ai_engineer"</span>
              <span className="python-bracket">{"}"}</span>
            </span>
          </h2>
        </motion.div>

        <div className={`nav-menu ${isOpen ? 'nav-menu-active' : ''}`}>
          {menuItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.href);
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <motion.div 
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
