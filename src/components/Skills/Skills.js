import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Skills.css';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true  // Changed to only animate once for main section
  });

  const skillsData = {
    "Programming Languages": {
      "C/C++": 95,
      "Python": 95, 
      "Java": 85,
      "JavaScript": 80
    },
    "AI/ML & Robotics": {
      "ROS/ROS2": 95,
      "PyTorch/TensorFlow": 90,
      "OpenAI Whisper": 90,
      "CUDA Optimization": 85
    },
    "Tools & Platforms": {
      "Linux": 95,
      "Docker": 85,
      "NVIDIA Jetson": 90,
      "Git": 95
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const ProgressBar = ({ skill, level, delay }) => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [progressRef, progressInView] = useInView({
      threshold: 0.3,
      triggerOnce: false  // Changed from true to false to allow re-triggering
    });

    useEffect(() => {
      if (progressInView) {
        // Reset to 0 first, then animate
        setCurrentLevel(0);
        const timer = setTimeout(() => {
          const interval = setInterval(() => {
            setCurrentLevel(prev => {
              if (prev >= level) {
                clearInterval(interval);
                return level;
              }
              return prev + 4;
            });
          }, 12);
        }, delay);

        return () => clearTimeout(timer);
      } else {
        // Reset when out of view
        setCurrentLevel(0);
      }
    }, [progressInView, level, delay]);

    const totalBlocks = 20;
    const targetBlocks = Math.floor((level / 100) * totalBlocks);

    return (
      <motion.div 
        ref={progressRef}
        className="skill-item"
        variants={itemVariants}
      >
        <div className="skill-header">
          <span className="skill-name">{skill}</span>
          <span className="skill-percentage">{currentLevel}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: progressInView ? `${currentLevel}%` : 0 }}
              transition={{ duration: 0.3, delay: delay / 1000 }}
            />
          </div>
        </div>

        {/* Progress Blocks */}
        <div className="progress-blocks">
          {Array.from({ length: totalBlocks }, (_, index) => (
            <div
              key={index}
              className={`block ${index < targetBlocks ? 'filled' : ''}`}
            />
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          // Skills & Tools
        </motion.h2>
        
        <motion.div 
          className="terminal-skills-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="terminal-header">
            <div className="terminal-title">
              <span className="prompt desktop-only">nathan@portfolio:~/skills$</span>
              <span className="command desktop-only">./install_skills.sh --progress</span>
              <span className="prompt mobile-only">nathan@skills$</span>
              <span className="command mobile-only">./install.sh</span>
            </div>
          </div>

          <div className="skills-content">
            {Object.entries(skillsData).map(([category, skills], categoryIndex) => {
              // Calculate base delay for this category based on all previous skills
              const previousSkillsCount = Object.entries(skillsData)
                .slice(0, categoryIndex)
                .reduce((total, [, prevSkills]) => total + Object.keys(prevSkills).length, 0);
              
              return (
                <motion.div 
                  key={category}
                  className="skill-category"
                  variants={itemVariants}
                >
                  <h3 className="category-title">
                    <span className="category-icon">▼</span>
                    {category}
                  </h3>
                  <div className="category-skills">
                    {Object.entries(skills).map(([skill, level], skillIndex) => {
                      const sequentialIndex = previousSkillsCount + skillIndex;
                      return (
                        <ProgressBar 
                          key={skill}
                          skill={skill}
                          level={level}
                          delay={skillIndex * 50}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}

            <motion.div 
              className="installation-complete"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <div className="complete-message">
                <span className="check-mark">✓</span>
                <span>Installation complete. All skills loaded successfully.</span>
              </div>
              <div className="system-info">
                <span>Total packages: {Object.values(skillsData).reduce((acc, cat) => acc + Object.keys(cat).length, 0)}</span>
                <span>Average proficiency: {Math.round(Object.values(skillsData).flatMap(cat => Object.values(cat)).reduce((a, b) => a + b, 0) / Object.values(skillsData).flatMap(cat => Object.values(cat)).length)}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
