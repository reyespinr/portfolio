import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          &copy; {currentYear} Nathan Reyes. All rights reserved.
        </motion.p>
        
        {/* Gradient removed as requested */}
      </div>
    </footer>
  );
};

export default Footer;
