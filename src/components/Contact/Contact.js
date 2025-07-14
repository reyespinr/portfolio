import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaFilePdf, FaTerminal } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [terminalHistory] = useState([
    '$ whoami',
    'nathan-reyes',
    '$ cat about.txt',
    "I'm seeking full-time opportunities in AI/ML, robotics, and autonomous systems.",
    "With 36+ months of research experience at VCU's HIVE Lab and hands-on expertise in CUDA optimization, real-time AI systems, and sensor fusion, I'm excited to contribute to innovative projects that push the boundaries of technology.",
    '$ echo "Let\'s work together!"',
    "Let's work together!",
    '$ send_message --help'
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          // Get In Touch
        </motion.h2>

        <div className="contact-layout">
          <motion.div 
            className="terminal-section"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="terminal-header">
              <div className="terminal-title">
                <FaTerminal className="terminal-icon" />
                <span>nathan@portfolio:~/contact$</span>
              </div>
            </div>

            <div className="terminal-content">
              <motion.div className="terminal-history" variants={itemVariants}>
                {terminalHistory.map((line, index) => (
                  <motion.div
                    key={index}
                    className={`terminal-line ${line.startsWith('$') ? 'command' : 'output'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {line.startsWith('$') ? (
                      <span className="prompt">
                        <span className="user">nathan@portfolio</span>
                        <span className="separator">:</span>
                        <span className="path">~</span>
                        <span className="dollar">$</span>
                        <span className="command-text">{line.slice(1)}</span>
                      </span>
                    ) : (
                      <span className="output-text">{line}</span>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              <div className="contact-commands">
                <div className="command-section">
                  <div className="section-title">
                    <span className="comment">// Available contact methods:</span>
                  </div>
                  
                  <motion.div className="contact-method" variants={itemVariants}>
                    <span className="method-command">connect --email</span>
                    <span className="method-arrow">=&gt;</span>
                    <span className="method-value">reyespinr@vcu.edu</span>
                  </motion.div>

                  <motion.div className="contact-method" variants={itemVariants}>
                    <span className="method-command">call --phone</span>
                    <span className="method-arrow">=&gt;</span>
                    <span className="method-value">+1 (434) 326-8503</span>
                  </motion.div>

                  <motion.div className="contact-method" variants={itemVariants}>
                    <span className="method-command">locate --address</span>
                    <span className="method-arrow">=&gt;</span>
                    <span className="method-value">Richmond, VA Area</span>
                  </motion.div>
                </div>

                <div className="command-section">
                  <div className="section-title">
                    <span className="comment">// Social connections:</span>
                  </div>
                  
                  <motion.div className="social-commands" variants={itemVariants}>
                    <a href="https://linkedin.com/in/r-nathan-reyes/" className="social-link" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="social-icon" />
                      <span>open --linkedin</span>
                    </a>
                    <a href="https://github.com/reyespinr" className="social-link" target="_blank" rel="noopener noreferrer">
                      <FaGithub className="social-icon" />
                      <span>clone --github</span>
                    </a>
                    <a href="/Nathan_Reyes_Resume.pdf" className="social-link" target="_blank" rel="noopener noreferrer">
                      <FaFilePdf className="social-icon" />
                      <span>download --resume</span>
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="form-section"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="form-header">
              <h3>Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <motion.div className="input-group" variants={itemVariants}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </motion.div>

              <motion.div className="input-group" variants={itemVariants}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </motion.div>

              <motion.div className="input-group" variants={itemVariants}>
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  required
                />
              </motion.div>

              <motion.div className="input-group" variants={itemVariants}>
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message..."
                  rows="5"
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                className="submit-button"
                variants={itemVariants}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Message sent successfully!
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
