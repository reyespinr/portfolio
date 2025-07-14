import React from 'react';
import { motion } from 'framer-motion';
import { FaChartBar, FaGraduationCap, FaFlask, FaUsers, FaTerminal, FaFile, FaBook, FaInfoCircle } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const codeLines = [
    { type: 'comment', content: '// Nathan Reyes - AI/ML Engineer Profile' },
    { type: 'variable', content: 'const developer = {' },
    { type: 'property', content: '  name: "Nathan Reyes",' },
    { type: 'property', content: '  role: "AI/ML Engineer & Autonomous Systems Researcher",' },
    { type: 'property', content: '  education: "VCU Computer Engineering",' },
    { type: 'property', content: '  focus: "CUDA-accelerated AI & robotics perception",' },
    { type: 'property', content: '  specialties: ["OpenAI Whisper", "ROS/ROS2", "CUDA", "Sensor Fusion"],' },
    { type: 'variable', content: '};' }
  ];

  const stats = [
    { number: '36+', label: 'Months Research Experience', icon: FaChartBar },
    { number: '2024', label: 'Computer Engineering Graduate', icon: FaGraduationCap },
    { number: '3+', label: 'Years in HIVE Lab', icon: FaFlask },
    { number: '3+', label: 'Years Team Leadership', icon: FaUsers }
  ];

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div 
          className="code-editor"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Editor Header */}
          <div className="editor-header">
            <div className="editor-tabs">
              <div className="tab active">
                <span className="tab-icon">
                  <FaFile />
                </span>
                about-me.js
                <span className="tab-close">×</span>
              </div>
            </div>
          </div>

          {/* Code Content */}
          <div className="code-content">
            <div className="line-numbers">
              {codeLines.map((_, index) => (
                <span key={index} className="line-number">{index + 1}</span>
              ))}
            </div>
            
            <div className="code-lines">
              {codeLines.map((line, index) => (
                <motion.div 
                  key={index}
                  className={`code-line ${line.type}`}
                  variants={itemVariants}
                  custom={index}
                >
                  {line.content}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Terminal Stats */}
          <div className="terminal-section">
            <div className="terminal-header">
              <span className="terminal-title">
                <FaTerminal style={{ marginRight: '8px' }} />
                developer.stats()
              </span>
            </div>
            
            <motion.div className="terminal-content" variants={itemVariants}>
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="terminal-stat"
                  variants={statVariants}
                  custom={index}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="stat-icon">
                    <stat.icon />
                  </span>
                  <span className="stat-key">{stat.label}:</span>
                  <span className="stat-value">{stat.number}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Documentation Section */}
          <div className="docs-section">
            <div className="about-split-view">
              {/* README.md box */}
              <div className="code-editor readme-box">
                <div className="editor-header">
                  <div className="editor-tabs">
                    <div className="tab active">
                      <span className="tab-icon"><FaInfoCircle /></span>
                      README.md
                      <span className="tab-close">×</span>
                    </div>
                  </div>
                </div>
                <div className="docs-content">
                  <h3 className="markdown-heading"># About Me</h3>
                  <p className="markdown-text">
                    I'm a Computer Engineering graduate from Virginia Commonwealth University specializing in AI/ML, robotics perception, and autonomous systems. With extensive research experience at VCU's HIVE Lab, I bridge cutting-edge academic research with practical, production-ready solutions.
                  </p>
                  <p className="markdown-text">
                    My expertise spans autonomous systems development, deep learning model optimization, real-time audio processing with OpenAI Whisper, and CUDA-accelerated computing. I've led multidisciplinary teams in developing complex robotics systems, from nuclear hazard inspection robots to AI-powered voice translation platforms, always focusing on performance, scalability, and real-world deployment.
                  </p>
                </div>
              </div>
              {/* achievements.md box */}
              <div className="code-editor achievements-box">
                <div className="editor-header">
                  <div className="editor-tabs">
                    <div className="tab active">
                      <span className="tab-icon"><FaBook /></span>
                      achievements.md
                      <span className="tab-close">×</span>
                    </div>
                  </div>
                </div>
                <div className="docs-content">
                  <h3 className="markdown-heading"># Achievements</h3>
                  <ul>
                    <li><code>Research Focus</code> – Advanced robotics and AI systems</li>
                    <li><code>CUDA Expertise</code> – GPU-accelerated computing optimization</li>
                    <li><code>Team Leadership</code> – Managing multidisciplinary engineering teams</li>
                    <li><code>Real-time Systems</code> – Audio processing and sensor fusion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
