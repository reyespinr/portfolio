import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaResearchgate, FaUsers } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Experience.css';

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const allExperiences = [
    {
      type: 'education',
      title: 'Bachelor of Science in Computer Engineering',
      organization: 'Virginia Commonwealth University (VCU)',
      duration: 'Graduated May 2024',
      details: [
        'GPA: 3.6/4.0',
        'Minor in Mathematics',
        '36+ months of research experience at HIVE Lab',
        'Focus on AI/ML, robotics, and autonomous systems'
      ],
      icon: FaGraduationCap
    },
    {
      type: 'research',
      title: 'Research Engineer',
      organization: 'HIVE Lab, VCU - CARMA Project (Leidos-funded)',
      duration: 'Aug 2022 - Jul 2023',
      details: [
        'Led data fusion and cooperative perception for autonomous vehicles',
        'Implemented C++ Unscented Kalman Filter with <1% error',
        'Developed multi-sensor track association algorithms',
        'Built real-time state estimation systems using ROS'
      ],
      icon: FaResearchgate
    },
    {
      type: 'leadership',
      title: 'Sensors Team Lead',
      organization: 'HyperLabs at VCU - IGVC Competition',
      duration: 'Aug 2023 - Mar 2024',
      details: [
        'Led sensor integration for autonomous ground vehicle',
        'Designed ROS-based sensor fusion systems',
        'Managed team for Intelligent Ground Vehicle Competition',
        'Implemented 3D LiDAR, camera, and IMU integration'
      ],
      icon: FaUsers
    },
    {
      type: 'project',
      title: 'Lead Developer - AI Voice Translator',
      organization: 'Personal Project',
      duration: 'Jan 2024 - Present',
      details: [
        'Built real-time AI voice translation using OpenAI Whisper',
        'Achieved sub-second inference with CUDA optimization',
        'Developed scalable FastAPI + WebSocket architecture',
        'Implemented dual-tier processing for speed/accuracy balance'
      ],
      icon: FaBriefcase
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
    <section id="experience" className="experience" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          // Experience & Education
        </motion.h2>

        <motion.div
          className="code-editor-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="editor-header">
            <div className="editor-tab">
              <span className="file-icon">📄</span>
              <span>timeline.cpp</span>
              <span className="modified">●</span>
            </div>
          </div>

          <div className="editor-content">
            {allExperiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`timeline-entry ${exp.type}`}
                variants={itemVariants}
                whileHover={{ backgroundColor: '#1c2128' }}
              >
                <div className="timeline-marker">
                  <exp.icon className="timeline-icon" />
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3 className="timeline-title">{exp.title}</h3>
                    <span className="timeline-duration">{exp.duration}</span>
                  </div>
                  <h4 className="timeline-org">{exp.organization}</h4>
                  <ul className="timeline-details">
                    {exp.details.map((detail, i) => (
                      <li key={i}>
                        <span className="bullet">▸</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
