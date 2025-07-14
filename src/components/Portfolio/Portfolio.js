import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaRobot, FaCar, FaFlagCheckered, FaBrain, FaMicrochip } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Portfolio.css';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const projects = [
    {
      id: 1,
      title: 'Discord Bot AI Translator',
      description: 'Real-time AI voice translation system using OpenAI Whisper and DeepL APIs with dual-tier architecture, achieving sub-second inference via CUDA acceleration.',
      icon: FaLaptopCode,
      tags: ['OpenAI Whisper', 'FastAPI', 'CUDA', 'DeepL API'],
      category: 'ai-ml',
      language: 'Python'
    },
    {
      id: 2,
      title: 'Autonomous Nuclear Hazard Robot',
      description: 'Led sensor integration for ROS-based quadruped robot using Jetson Nano for autonomous radiation detection with 3D radiation heatmapping.',
      icon: FaRobot,
      tags: ['ROS', 'Jetson Nano', 'SLAM', 'Radiation Detection'],
      category: 'robotics',
      language: 'C++'
    },
    {
      id: 3,
      title: 'CARMA Autonomous Vehicle Research',
      description: 'Developed autonomous vehicle systems as part of VCU\'s CARMA research initiative, focusing on sensor integration and navigation algorithms.',
      icon: FaCar,
      tags: ['Autonomous Systems', 'C++', 'Computer Vision'],
      category: 'research',
      language: 'C++'
    },
    {
      id: 4,
      title: 'F1Tenth Autonomous Racing',
      description: 'Implemented autonomous racing algorithms for 1/10th scale F1 race cars, featuring real-time path planning and obstacle avoidance.',
      icon: FaFlagCheckered,
      tags: ['ROS', 'Python', 'Path Planning'],
      category: 'robotics',
      language: 'Python'
    },
    {
      id: 5,
      title: 'Computer Vision Research',
      description: 'Conducted research in computer vision and machine learning applications for autonomous systems, utilizing PyTorch and TensorFlow frameworks.',
      icon: FaBrain,
      tags: ['PyTorch', 'Computer Vision', 'Research'],
      category: 'research',
      language: 'Python'
    },
    {
      id: 6,
      title: 'CUDA Performance Optimization',
      description: 'Optimized parallel computing applications using CUDA for GPU acceleration, achieving significant performance improvements in computational tasks.',
      icon: FaMicrochip,
      tags: ['CUDA', 'GPU Computing', 'C++'],
      category: 'ai-ml',
      language: 'C++'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-ml', label: 'AI/ML Systems' },
    { id: 'robotics', label: 'Robotics' },
    { id: 'research', label: 'Research Projects' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

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
    hidden: { y: 50, opacity: 0 },
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
    <section id="portfolio" className="portfolio" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          // My Portfolio
        </motion.h2>

        <motion.div
          className="filter-tabs"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 12px 40px rgba(88, 166, 255, 0.15)"
              }}
              layout
            >
              <div className="project-header">
                <div className="project-icon">
                  <project.icon />
                </div>
                <div className="project-meta">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-language">{project.language}</span>
                </div>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
