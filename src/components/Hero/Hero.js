import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Hero.css';

// Animated VS Code-style code editor window
const codeSnippets = [
  {
    title: 'main.py',
    lines: [
      [ { type: 'comment', content: '# AI/ML Engineer Portfolio' } ],
      [
        { type: 'keyword', content: 'def' },
        { type: 'function', content: ' build_vision_system' },
        { type: 'paren', content: '(' },
        { type: 'param', content: 'sensors' },
        { type: 'paren', content: ')' },
        { type: 'operator', content: ':' }
      ],
      [
        { type: 'indent', content: '    ' },
        { type: 'control', content: 'return' },
        { type: 'string', content: ' "Perception Ready!"' }
      ]
    ]
  },
  {
    title: 'robot.cpp',
    lines: [
      [ { type: 'comment', content: '// Autonomous Robotics Control' } ],
      [
        { type: 'keyword', content: 'void' },
        { type: 'function', content: ' startRobot' },
        { type: 'paren', content: '()' },
        { type: 'paren', content: ' {' }
      ],
      [
        { type: 'indent', content: '    ' },
        { type: 'function', content: 'init' },
        { type: 'control', content: '()' },
        { type: 'operator', content: ';' }
      ],
      [
        { type: 'indent', content: '    ' },
        { type: 'function', content: 'run' },
        { type: 'control', content: '()' },
        { type: 'operator', content: ';' }
      ],
      [ { type: 'paren', content: '}' } ]
    ]
  },
  {
    title: 'train.py',
    lines: [
      [ { type: 'comment', content: '# Train ML Model' } ],
      [
        { type: 'control', content: 'for' },
        { type: 'variable', content: ' epoch' },
        { type: 'control', content: ' in' },
        { type: 'type', content: ' range' },
        { type: 'paren', content: '(' },
        { type: 'number', content: '10' },
        { type: 'paren', content: ')' },
        { type: 'operator', content: ':' }
      ],
      [
        { type: 'indent', content: '    ' },
        { type: 'variable', content: 'model' },
        { type: 'operator', content: '.' },
        { type: 'function', content: 'train' },
        { type: 'paren', content: '()' }
      ]
    ]
  },
  {
    title: 'cuda_infer.py',
    lines: [
      [ { type: 'comment', content: '# Select device' } ],
      [
        { type: 'control', content: 'if ' },
        { type: 'type', content: 'torch' },
        { type: 'operator', content: '.' },
        { type: 'type', content: 'cuda' },
        { type: 'paren', content: '()' },
        { type: 'operator', content: '.' },
        { type: 'function', content: 'is_available' },
        { type: 'paren', content: '()' },
        { type: 'operator', content: ':' }
      ],
      [
        { type: 'indent', content: '    ' },
        { type: 'variable', content: 'device' },
        { type: 'operator', content: ' = ' },
        { type: 'string', content: '"cuda"' }
      ],
      [
        { type: 'control', content: 'else' },
        { type: 'operator', content: ':' }

      ],
      [
        { type: 'indent', content: '    ' },
        { type: 'variable', content: 'device' },
        { type: 'operator', content: ' = ' },
        { type: 'string', content: '"cpu"' }
      ]
    ]
  },
  {
    title: 'ros_sensor.cpp',
    lines: [
      [ { type: 'comment', content: '// Print min range' } ],
      [
        { type: 'keyword', content: 'float' },
        { type: 'variable', content: ' min' },
        { type: 'operator', content: ' = ' },
        { type: 'variable', content: 'msg' },
        { type: 'operator', content: '.' },
        { type: 'variable', content: 'range_min' },
        { type: 'operator', content: ';' }
      ],
      [
        { type: 'function', content: 'ROS_INFO' },
        { type: 'control', content: '(' },
        { type: 'string', content: '"Min: ' },
        { type: 'variable', content: '%f' },
        { type: 'string', content: '"' },
        { type: 'operator', content: ',' },
        { type: 'variable', content: ' min' },
        { type: 'control', content: ')' },
        { type: 'operator', content: ';' }
      ]
    ]
  },
  {
    title: 'discord_bot.py',
    lines: [
      [ { type: 'comment', content: '# Transcribe audio' } ],
      [
        { type: 'variable', content: 'audio' },
        { type: 'operator', content: ' = ' },
        { type: 'control', content: 'await ' },
        { type: 'variable', content: 'attachment' },
        { type: 'operator', content: '.' },
        { type: 'function', content: 'read' },
        { type: 'paren', content: '()' }
      ],
      [
        { type: 'variable', content: 'text' },
        { type: 'operator', content: ' = ' },
        { type: 'variable', content: 'whisper' },
        { type: 'operator', content: '.' },
        { type: 'function', content: 'transcribe' },
        { type: 'paren', content: '(' },
        { type: 'variable', content: 'audio' },
        { type: 'paren', content: ')' }
      ]
    ]
  },
  {
    title: 'path_planner.cpp',
    lines: [
      [ { type: 'comment', content: '// Drive to each point' } ],
      [
        { type: 'control', content: 'for' },
        { type: 'control', content: ' (' },
        { type: 'keyword', content: 'auto' },
        { type: 'variable', content: ' pt' },
        { type: 'operator', content: ' : ' },
        { type: 'variable', content: 'path' },
        { type: 'control', content: ')' },
        { type: 'control', content: ' {' }
      ],
      [
        { type: 'indent', content: '    ' },
        { type: 'variable', content: 'car' },
        { type: 'operator', content: '.' },
        { type: 'function', content: 'driveTo' },
        { type: 'keyword', content: '(' },
        { type: 'variable', content: 'pt' },
        { type: 'keyword', content: ')' },
        { type: 'operator', content: ';' }
      ],
      [ { type: 'control', content: '}' } ]
    ]
  }
];

const AnimatedCodeEditor = () => {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [typedLines, setTypedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutsRef = useRef([]);

  const codeLines = codeSnippets[snippetIdx].lines;
  const editorTitle = codeSnippets[snippetIdx].title;

  // Helper to flatten tokens to string for typing
  const getLineString = (tokens) => tokens.map(t => t.content).join('');
  const getLineTokensUpTo = (tokens, charCount) => {
    let count = 0;
    let result = [];
    for (let token of tokens) {
      if (count >= charCount) break;
      const remaining = charCount - count;
      if (token.content.length <= remaining) {
        result.push(token);
        count += token.content.length;
      } else {
        result.push({ ...token, content: token.content.slice(0, remaining) });
        count += remaining;
      }
    }
    return result;
  };
  // Helper: tokenize a substring using the original line's tokens
  const tokenizeSubstring = (tokens, substring) => {
    let count = 0;
    let result = [];
    for (let token of tokens) {
      if (count >= substring.length) break;
      const remaining = substring.length - count;
      if (token.content.length <= remaining) {
        result.push(token);
        count += token.content.length;
      } else {
        result.push({ ...token, content: token.content.slice(0, remaining) });
        count += remaining;
      }
    }
    return result;
  };

  // Reset state on snippet change
  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setTypedLines([]);
    setCurrentLine(0);
    setCurrentChar(0);
    setIsComplete(false); // Always reset to false
    setShowCheck(false);
    setBounce(false);
    setIsTyping(false); // Hide code area until animation starts
    let delay = 300;
    // Add a longer delay for the very first animation only
    if (!hasAnimatedOnce && snippetIdx === 0) {
      delay = 4000; // 1.2s for initial load
    }
    // Start typing after a short delay
    const t = setTimeout(() => {
      setCurrentLine(0);
      setCurrentChar(0);
      setTypedLines([]);
      setHasAnimatedOnce(true);
      setIsTyping(true); // Start animation
      setIsComplete(false); // Ensure animation is not marked complete
    }, delay);
    timeoutsRef.current.push(t);
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [snippetIdx, codeLines]);

  // Character-by-character typing effect
  useEffect(() => {
    if (isComplete) return;
    if (currentLine < codeLines.length) {
      const lineTokens = codeLines[currentLine];
      const lineStr = getLineString(lineTokens);
      if (currentChar < lineStr.length) {
        const t = setTimeout(() => {
          setTypedLines((prev) => {
            const newLines = [...prev];
            const tokens = getLineTokensUpTo(lineTokens, currentChar + 1);
            if (newLines.length === currentLine) {
              newLines.push(tokens);
            } else {
              newLines[currentLine] = tokens;
            }
            return newLines;
          });
          setCurrentChar((c) => c + 1);
        }, 24);
        timeoutsRef.current.push(t);
      } else {
        // When done typing the line, push the full line
        const t = setTimeout(() => {
          setTypedLines((prev) => {
            const newLines = [...prev];
            if (newLines.length === currentLine) {
              newLines.push(lineTokens);
            } else {
              newLines[currentLine] = lineTokens;
            }
            return newLines;
          });
          setCurrentLine((l) => l + 1);
          setCurrentChar(0);
        }, 180);
        timeoutsRef.current.push(t);
      }
    } else if (currentLine === codeLines.length) {
      const t = setTimeout(() => {
        setIsComplete(true);
      }, 400);
      timeoutsRef.current.push(t);
    }
  }, [currentLine, currentChar, codeLines, isComplete]);

  
  // Auto-run after 5s if user doesn't press Run
  useEffect(() => {
    if (isComplete && !showCheck) {
      const autoRunTimeout = setTimeout(() => {
        if (isComplete && !showCheck) {
          handleRun();
        }
      }, 7000); // 7 seconds
      return () => clearTimeout(autoRunTimeout);
    }
  }, [isComplete, showCheck]);

  const handleRun = () => {
    setBounce(true);
    setTimeout(() => setShowCheck(true), 400);
    setTimeout(() => setBounce(false), 800);
    setTimeout(() => {
      setSnippetIdx((prev) => (prev + 1) % codeSnippets.length);
    }, 1800); // Wait for checkmark, then next snippet
  };

  // Only render defined lines
  return (
    <motion.div 
      className={`animated-code-editor${bounce ? ' bounce' : ''}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      <div className="editor-header-vsc">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>
        <span className="editor-title">{editorTitle}</span>
      </div>
      <div className="editor-body-vsc">
        <pre className="code-area">
          {isTyping && codeLines.map((lineTokens, idx) => {
            const lineStr = getLineString(lineTokens);
            // For lines before the current line, render fully tokenized
            if (idx < currentLine) {
              return (
                <div key={idx} style={{ display: 'block' }}>
                  {lineTokens.map((token, tIdx) => (
                    <span key={tIdx} className={`code-${token.type}`}>{token.content}</span>
                  ))}
                </div>
              );
            }
            // For the line currently being typed, render as plain text + cursor
            if (idx === currentLine && !isComplete) {
              const visibleStr = lineStr.slice(0, currentChar);
              return (
                <div key={idx} style={{ display: 'block' }}>
                  <span className="code-plain">{visibleStr}</span>
                  <span className="code-cursor">|</span>
                </div>
              );
            }
            // For lines after the current line, render nothing
            return null;
          })}
        </pre>
      </div>
      <div className="editor-footer-vsc">
        {isTyping && isComplete && !showCheck && (
          <button className="run-btn" onClick={handleRun}>Run</button>
        )}
        {showCheck && (
          <motion.span 
            className="run-success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            ✓ Success
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [text, setText] = useState('');
  const fullText = "AI/ML Engineer & Autonomous Systems Researcher";
  
  useEffect(() => {
    if (inView) {
      let index = 0;
      const timer = setInterval(() => {
        setText(fullText.slice(0, index));
        index++;
        if (index > fullText.length) {
          clearInterval(timer);
        }
      }, 80);
      return () => clearInterval(timer);
    }
  }, [inView]);

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

  const handleScrollToPortfolio = () => {
    const element = document.querySelector('#portfolio');
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

  const handleScrollToContact = () => {
    const element = document.querySelector('#contact');
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
    <section id="home" className="hero" ref={ref}>
      <div className="particles-bg"></div>
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="hero-text">
          <motion.div variants={itemVariants} className="python-syntax">
            <span className="variable">DEVELOPER</span> <span className="operator">=</span> <span className="bracket">{"{"}</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"name"</span><span className="operator">:</span> <span className="string">"</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants}>
            <span className="highlight">Nathan Reyes</span>
          </motion.h1>
          
          <motion.div variants={itemVariants} className="python-syntax">
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"</span><span className="operator">,</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"skills"</span><span className="operator">:</span> <span className="bracket">[</span><span className="string">"AI/ML"</span><span className="operator">,</span> <span className="string">"Robotics"</span><span className="operator">,</span> <span className="string">"Systems"</span><span className="bracket">]</span><br/>
            <span className="bracket">{"}"}</span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="typing-text">
            {text}<span className="cursor">|</span>
          </motion.h2>
          
          <motion.p variants={itemVariants}>
            Computer Engineering graduate from VCU with 36+ months of research experience in AI/ML, robotics perception, and autonomous systems. I specialize in CUDA-accelerated AI applications, real-time audio processing, and developing production-ready intelligent systems for complex real-world challenges.
          </motion.p>
          
          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.button 
              className="btn btn-primary"
              onClick={handleScrollToPortfolio}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              onClick={handleScrollToContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-image"
          variants={itemVariants}
        >
          <AnimatedCodeEditor />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaChevronDown />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
