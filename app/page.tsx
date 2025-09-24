"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Sun,
  Moon,
  ArrowLeft,
  ArrowRight,
  Github,
  Linkedin,
  Menu,
  X,
  Code,
  Database,
  Smartphone,
  Globe,
  Zap,
  Cpu,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Loader = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-[9999]">
    <div className="w-1/3 h-1 overflow-hidden relative">
      <div
        className="h-full animate-loaderBar glow moving-gradient"
        style={{
          background: isDarkMode
            ? "linear-gradient(270deg, #14b8a6, #2dd4bf, #64748b)"
            : "linear-gradient(270deg, #0d9488, #2dd4bf, #64748b)",
          backgroundSize: "200% 200%",
        }}
      ></div>
      <div
        className="h-full animate-loaderBar glow moving-gradient animation-delay"
        style={{
          background: isDarkMode
            ? "linear-gradient(270deg, #14b8a6, #2dd4bf, #64748b)"
            : "linear-gradient(270deg, #0d9488, #2dd4bf, #64748b)",
          backgroundSize: "200% 200%",
        }}
      ></div>
    </div>

    <style>{`
      @keyframes loaderBar {
        0%   { transform: translateX(-100%); width: 30%; opacity: 0; }
        15%  { opacity: 1; }
        50%  { transform: translateX(50%); width: 60%; opacity: 1; }
        85%  { opacity: 1; }
        100% { transform: translateX(100%); width: 30%; opacity: 0; }
      }

      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .animate-loaderBar {
        animation: loaderBar 3s cubic-bezier(.4,0,.2,1) infinite;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 9999px;
      }

      .moving-gradient {
        animation: loaderBar 3s cubic-bezier(.4,0,.2,1) infinite,
                   gradientShift 4s ease-in-out infinite;
      }

      .animation-delay {
        animation-delay: 1.5s, 1.5s;
      }

      .glow {
        box-shadow: 0 0 15px rgba(45, 212, 191, 0.7), 
                    0 0 25px rgba(100, 116, 139, 0.5);
      }
    `}</style>
  </div>
);

type TypewriterTextProps = {
  text: string; // texte simple
  delay?: number; // délai entre chaque lettre
  soundSrc?: string; // fichier audio pour chaque lettre
};

const TypewriterText = ({
  text,
  delay = 100,
  soundSrc = "/typewriter.mp3",
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (charIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[charIndex]);
        setCharIndex((prev) => prev + 1);

        // Lecture du son
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {
            // ignore erreur si autoplay bloqué
          });
        }
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [charIndex, text, delay]);

  return (
    <span className="relative whitespace-pre-line">
      <audio ref={audioRef} src={soundSrc} preload="auto" />
      {displayText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Component pour l'effet de mouse spotlight
const MouseSpotlight = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-10 opacity-20"
      style={{
        left: mousePos.x - 200,
        top: mousePos.y - 200,
        width: 400,
        height: 400,
        background: isDarkMode
          ? "radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        transition: "all 0.1s ease-out",
      }}
    />
  );
};

const SkillCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  isDarkMode,
  progress,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
  isDarkMode: boolean;
  progress: number;
}) => {
  // const [ref, isInView] = useInView();

  return (
    <div
      // ref={ref}
      className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-105 cursor-pointer ${
        isDarkMode ? "bg-gray-800/50" : "bg-white/50"
      } backdrop-blur-sm border ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      } hover:border-teal-400/50`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-blue-600 opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center mb-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-teal-400 to-blue-600 text-white group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-5 h-5" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="font-semibold text-sm group-hover:text-teal-400 transition-colors duration-300">
              {title}
            </h3>
          </div>
        </div>
        <p
          className={`text-xs leading-relaxed ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          } ${
            isDarkMode
              ? "group-hover:text-gray-300"
              : "group-hover:text-gray-900"
          } transition-colors duration-300`}
        >
          {description}
        </p>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-400 to-blue-600 rounded-full transform origin-left scale-x-0 group-hover:scale-x-88 transition-transform duration-1000 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Loader simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowTypewriter(true), 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const themeClasses = {
    bg: isDarkMode ? "bg-gray-900" : "bg-gray-100",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
    accent: isDarkMode ? "text-teal-400" : "text-teal-600",
    cardBg: isDarkMode ? "bg-gray-800" : "bg-white",
    border: isDarkMode ? "border-gray-700" : "border-gray-300",
  };

  const skills = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, Tailwind CSS",
      progress: 1,
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Node.js, Express, MongoDB, PostgreSQL",
      progress: 1.1,
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "React Native, Expo",
      progress: 1,
    },
    {
      icon: Globe,
      title: "Full Stack",
      description: "MERN Stack, JAMstack, Serverless",
      progress: 1,
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimisation, PWA, SEO",
      progress: 1,
    },
    {
      icon: Cpu,
      title: "DevOps & Cloud",
      description: "AWS, Docker, CI/CD, Vercel",
      progress: 0.9,
    },
  ];

  const books = [
    {
      title: "The Immortalist",
      subtitle: "John Asikire",
      cover:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=450&fit=crop",
      genre: "Philosophy",
    },
    {
      title: "Digital Roots",
      subtitle: "John Asikire",
      cover:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
      genre: "Technology",
    },
    {
      title: "Code & Coffee",
      subtitle: "John Asikire",
      cover:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
      genre: "Programming",
    },
  ];

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };
    checkMobile();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkMobile);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkMobile);
      }
    };
  }, []);

  const sections = ["header", "biography", "books", "press", "contact"];
  const isLastCard = currentSection === sections.length - 1;
  const isScrollMode = isMobile && currentSection > sections.length - 1;

  const handleNext = useCallback(() => {
    if (currentSection < sections.length - 1)
      setCurrentSection(currentSection + 1);
    else if (currentSection === sections.length - 1)
      setCurrentSection(currentSection + 1);
  }, [currentSection, sections.length]);

  const handlePrev = useCallback(() => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
  }, [currentSection]);

  useEffect(() => {
    if (!isMobile || isScrollMode) return;
    const container = containerRef.current;
    if (!container) return;
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) handlePrev();
      else if (startX - endX > 50) {
        if (isLastCard) {
          setCurrentSection(currentSection + 1);
        } else {
          handleNext();
        }
      }
    };
    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchend", onTouchEnd);
    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [
    currentSection,
    isMobile,
    isLastCard,
    isScrollMode,
    handleNext,
    handlePrev,
  ]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Section JSX avec animations
  const HeaderSection = (
    <div
      id="home"
      className="flex flex-col lg:flex-row items-start justify-between mb-20 relative overflow-hidden"
    >
      {/* Effet de parallax background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-600 transform scale-110"
          style={{
            transform: `translateY(${-scrollY * 0.5}px) scale(1.1)`,
          }}
        />
      </div>

      {/* Profile Image */}
      {/* <SlideInLeft> */}
      <div className="w-full lg:w-2/5 mb-12 lg:mb-0 relative z-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <Image
            src="/johnasikire.jpg"
            alt="John Asikire"
            width={400}
            height={400}
            className="relative w-full max-w-md mx-auto lg:mx-0 rounded-full shadow-2xl transform transition-all duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      {/* </SlideInLeft> */}

      {/* Header Text */}
      {/* <SlideInRight delay={200}> */}
      <div id="header" className="w-full lg:w-3/5 lg:pl-16 relative z-10">
        <div className="mb-8">
          <h1 className="text-6xl lg:text-8xl font-light mb-2 transform transition-all duration-700 hover:scale-105">
            {showTypewriter ? <TypewriterText text="John" /> : "John"}
          </h1>
          <h1 className="text-6xl lg:text-8xl font-bold transform transition-all duration-700 hover:scale-105">
            {showTypewriter ? <TypewriterText text="Asikire" /> : "Asikire"}
          </h1>
          {/* <FadeInSection delay={1000}> */}
          <p
            className={`text-sm uppercase tracking-widest mt-4 ${themeClasses.accent} animate-pulse`}
          >
            <TypewriterText text="Software Developer and Entrepreneur" />
          </p>
          <p>
            <TypewriterText text="I help people and businesses turn ideas into websites, web apps, and mobile apps without endless delays" />
          </p>
          <div>
            <div className="flex justify-center space-x-6">
              <a
                href="https://linkedin.com"
                className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gradient-to-r from-teal-400 to-blue-600 transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </a>
              <a
                href="https://twitter.com"
                className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gradient-to-r from-teal-400 to-blue-600 transition-colors group"
              >
                <Mail className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </a>
            </div>
          </div>
          {/* </FadeInSection> */}
        </div>
      </div>
      {/* // </SlideInRight> */}
    </div>
  );

  const BiographySection = (
    <div id="aboutme" className="mb-20 relative">
      <div className="flex flex-col lg:flex-row items-start">
        {/* <SlideInLeft> */}
        <div className="w-full lg:w-1/3 mb-12 lg:mb-0">
          <div className="text-9xl font-bold opacity-20 leading-none hover:opacity-30 transition-opacity duration-500">
            01
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-light uppercase tracking-widest mb-6 group">
              <span className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-teal-400 transition-all duration-500">
                About Me
              </span>
            </h2>
            <div
              className={`w-12 h-0.5 ${
                isDarkMode ? "bg-teal-400" : "bg-teal-600"
              } mb-8 transform origin-left scale-x-0 animate-scale-x`}
            ></div>
          </div>
        </div>
        {/* </SlideInLeft> */}

        {/* <SlideInRight delay={300}> */}
        <div className="w-full lg:w-2/3 lg:pl-16">
          <div
            className={`${themeClasses.textSecondary} leading-relaxed space-y-6`}
          >
            <p className="transform transition-all duration-500 hover:text-white">
              {" "}
              Hello, I&apos;m a John Asikire Passionate software developer with
              expertise in modern web technologies and entrepreneurial spirit. I
              specialize in creating elegant solutions that bridge the gap
              between innovative ideas and practical implementation.
            </p>
            <p className="transform transition-all duration-500 hover:text-white">
              With a focus on user experience and clean code architecture, I
              help businesses transform their digital presence through
              cutting-edge applications and strategic technology consulting.
            </p>
          </div>
          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 lg:mt-12">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.title}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                delay={index * 100}
                isDarkMode={isDarkMode}
                progress={skill.progress}
              />
            ))}
          </div>
        </div>
        {/* </SlideInRight> */}
      </div>
    </div>
  );
  // Skills Card Component

  const BooksSection = (
    // <FadeInSection>
    <div id="myprojects" className="mb-20">
      <div className="flex flex-col lg:flex-row items-start">
        {/* <SlideInLeft> */}
        <div className="w-full mb-12 lg:mb-0 lg:w-1/3 ">
          <div className="text-9xl font-bold opacity-20 leading-none hover:opacity-30 transition-opacity duration-500">
            02
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-light uppercase tracking-widest group">
              <span className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-teal-400 transition-all duration-500">
                My Projects
              </span>
            </h2>
            <div
              className={`w-12 h-0.5 ${
                isDarkMode ? "bg-teal-400" : "bg-teal-600"
              } mt-6 transform origin-left scale-x-0 animate-scale-x`}
            ></div>
          </div>
        </div>
        {/* </SlideInLeft> */}

        <div className="w-full lg:w-2/3 lg:pl-16">
          <div className="grid md:grid-cols-3 gap-8">
            {books.map((book, index) => (
              // <SlideInRight  delay={index * 150}>
              <div
                key={index}
                className="text-center group cursor-pointer relative"
              >
                {/* Glow effect background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-400/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                <div className="relative overflow-hidden rounded-lg mb-4 shadow-lg transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isDarkMode
                        ? "from-black/80 via-transparent to-teal-400/20"
                        : "from-white/80 via-transparent to-teal-400/20"
                    } opacity-0 group-hover:opacity-100 transition-all duration-500`}
                  >
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex space-x-3">
                        <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer">
                          <Github className="w-4 h-4 text-white" />
                        </div>
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  className={`text-xs uppercase tracking-wide mb-2 ${themeClasses.accent} group-hover:animate-pulse`}
                >
                  {book.genre}
                </p>
                <h3 className="text-lg font-bold uppercase tracking-wide transform transition-all duration-300 group-hover:text-teal-400">
                  {book.title}
                </h3>
              </div>
              // </SlideInRight>
            ))}
          </div>
        </div>
      </div>
    </div>
    // </FadeInSection>
  );

  const PressSection = (
    // <FadeInSection>
    <div id="testimonials" className="mb-20">
      <div className="flex flex-col lg:flex-row items-start">
        {/* <SlideInLeft> */}
        <div className="w-full mb-12 lg:w-1/3 lg:mb-0">
          <div className="text-9xl font-bold opacity-20 leading-none hover:opacity-30 transition-opacity duration-500">
            03
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-light uppercase tracking-widest group">
              <span className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-teal-400 transition-all duration-500">
                Testimonials
              </span>
            </h2>
            <div
              className={`w-12 h-0.5 ${
                isDarkMode ? "bg-teal-400" : "bg-teal-600"
              } mt-6 transform origin-left scale-x-0 animate-scale-x`}
            ></div>
          </div>
        </div>
        {/* </SlideInLeft> */}

        {/* <SlideInRight delay={300}> */}
        <div className="w-full lg:w-2/3 lg:pl-16">
          <div
            className={`${themeClasses.textSecondary} leading-relaxed mb-8 relative`}
          >
            <div className="absolute -left-4 -top-2 text-6xl text-teal-400/20 font-serif">
              &quot;
            </div>
            <p className="italic transform transition-all duration-500 hover:text-white pl-8">
              &quot;John&apos;s expertise in modern web development and his
              entrepreneurial mindset make him an invaluable asset. His ability
              to deliver innovative solutions while maintaining exceptional code
              quality is truly remarkable looking he has done with my e-commerce
              shirtime.&quot;
            </p>
            <div className="absolute -right-4 -bottom-2 text-6xl text-teal-400/20 font-serif">
              &quot;
            </div>
          </div>
          <div className="flex items-center space-x-4 group">
            <div className="w-12 h-12 rounded-full overflow-hidden transform transition-all duration-300 group-hover:scale-110">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Reviewer"
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-sm group-hover:text-teal-400 transition-colors duration-300">
                John Charlton
              </p>
              <p className={`text-xs ${themeClasses.textSecondary}`}>
                Tech Lead
              </p>
            </div>
            <div className="flex space-x-2 ml-auto">
              <ArrowLeft className="w-5 h-5 cursor-pointer hover:scale-125 hover:text-teal-400 transition-all duration-300 hover:animate-bounce" />
              <ArrowRight className="w-5 h-5 cursor-pointer hover:scale-125 hover:text-teal-400 transition-all duration-300 hover:animate-bounce" />
            </div>
          </div>
        </div>
        {/* </SlideInRight> */}
      </div>
    </div>
    // </FadeInSection>
  );

  const ContactSection = (
    // <FadeInSection>
    <div id="contact">
      <div className="flex flex-col lg:flex-row items-start">
        {/* <SlideInLeft> */}
        <div className="w-full lg:w-1/3 mb-12 lg:mb-0">
          <div className="text-9xl font-bold opacity-20 leading-none hover:opacity-30 transition-opacity duration-500">
            04
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-light uppercase tracking-widest group">
              <span className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-teal-400 transition-all duration-500">
                Contact
              </span>
            </h2>
            <div
              className={`w-12 h-0.5 ${
                isDarkMode ? "bg-teal-400" : "bg-teal-600"
              } mt-6 transform origin-left scale-x-0 animate-scale-x`}
            ></div>
          </div>
        </div>
        {/* </SlideInLeft> */}

        {/* <SlideInRight delay={300}> */}
        <div className="w-full lg:w-2/3 lg:pl-16">
          <div
            className={`${themeClasses.textSecondary} leading-relaxed  grid md:grid-cols-2 gap-8 mb-12`}
          >
            {[
              {
                label: "Email",
                value: "john.asikire@developer.com",
                icon: Mail,
              },
              { label: "Phone", value: "+256 (700) 123-456", icon: Phone },
              { label: "Location", value: "Kampala, Uganda", icon: MapPin },
            ].map(({ label, value, icon: Icon }) => (
              // <FadeInSection  delay={index * 100}>
              <div
                key={label}
                className={`group hover:transform hover:translate-x-2 transition-all duration-300 p-6 rounded-xl border ${
                  isDarkMode ? "border-gray-300" : "border-gray-600"
                }  ${
                  isDarkMode
                    ? "hover:border-teal-400/50"
                    : "hover:border-teal-600"
                }  transition-colors`}
              >
                <Icon
                  className={`w-8 h-8 ${
                    isDarkMode ? "text-teal-400" : "text-teal-600"
                  }  hover:scale-100 transition-transform duration-300  mx-auto mb-4`}
                />
                <h3
                  className={`font-semibold mb-2 ${
                    isDarkMode
                      ? "group-hover:text-teal-400"
                      : "group-hover:text-teal-600"
                  }`}
                >
                  {label}
                </h3>
                <a
                  href={value}
                  className={`${
                    isDarkMode
                      ? "group-hover:text-gray-400"
                      : "group-hover:text-gray-600"
                  }`}
                >
                  {value}
                </a>
              </div>
              // </FadeInSection>
            ))}

            {/* <FadeInSection delay={400}> */}
          </div>
          <div className="group">
            <div className="flex justify-center space-x-4">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Github, label: "GitHub", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`${
                    themeClasses.accent
                  }  transition-all duration-300 flex ${
                    isDarkMode ? "hover:text-gray-300" : "hover:text-gray-900"
                  } items-center space-x-2 group/link`}
                >
                  <Icon className="w-4 h-4 group-hover/link:animate-bounce" />
                  <span
                    className={`group-hover/link:translate-x-1  transition-transform duration-300`}
                  >
                    {label}
                  </span>
                </a>
              ))}
            </div>
            {/* </FadeInSection> */}
          </div>
        </div>
        {/* </SlideInRight> */}
      </div>
    </div>
    // </FadeInSection>
  );

  const FancyNavButton = () => {
    const [open, setOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    // Détecter le scroll pour afficher le message
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY < 100) {
          setShowMessage(true);
        } else {
          setShowMessage(true);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {};
    }, []);

    return (
      <div className="w-full">
        {/* Bouton flottant */}

        <button
          onClick={() => setOpen(!open)}
          className="fixed top-3 right-20 z-50 p-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white shadow-lg transition-all duration-500 hover:scale-125 hover:rotate-180 group-hover:opacity-75"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navbar animée desktop */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: "65vw",
                opacity: 1,
                transition: { type: "spring", stiffness: 120 },
              }}
              exit={{
                width: 0,
                opacity: 0,
                transition: { duration: 0.4 },
              }}
              className="hidden md:flex fixed top-3 right-32 h-12 shadow-lg rounded-xl items-center px-6 space-x-6 z-40 md:justify-center"
            >
              <a
                href="#home"
                className="text-sm font-semibold hover:text-indigo-600"
              >
                Home
              </a>
              <a
                href="#aboutme"
                className="text-sm font-semibold hover:text-indigo-600"
              >
                About Me
              </a>
              <a
                href="#myprojects"
                className="text-sm font-semibold hover:text-indigo-600"
              >
                My Projects
              </a>
              <a
                href="#testimonials"
                className="text-sm font-semibold hover:text-indigo-600"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-sm font-semibold hover:text-indigo-600"
              >
                Contact
              </a>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Navbar mobile : pile de boutons */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: { type: "spring", stiffness: 150, damping: 20 },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.3 },
              }}
              className="md:hidden fixed top-20 right-6 flex flex-col w-40 space-y-1 shadow-lg rounded-xl overflow-hidden z-40"
            >
              <a
                href="#home"
                className="w-full py-3 text-center font-semibold text-gray-800 hover:bg-indigo-100 hover:text-indigo-600 transition"
              >
                Home
              </a>
              <a
                href="#aboutme"
                className="w-full py-3 text-center font-semibold text-gray-800 hover:bg-indigo-100 hover:text-indigo-600 transition"
              >
                About Me
              </a>
              <a
                href="#myprojects"
                className="w-full py-3 text-center font-semibold text-gray-800 hover:bg-indigo-100 hover:text-indigo-600 transition"
              >
                My Projects
              </a>
              <a
                href="#testimonials"
                className="w-full py-3 text-center font-semibold text-gray-800 hover:bg-indigo-100 hover:text-indigo-600 transition"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="w-full py-3 text-center font-semibold text-gray-800 hover:bg-indigo-100 hover:text-indigo-600 transition"
              >
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message affiché au scroll sur desktop */}
        {showMessage && (
          <div className="hidden md:block fixed top-20 right-20 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg">
            🌟 Explorez le menu !
          </div>
        )}
      </div>
    );
  };

  // Section array for mobile
  const sectionComponents = [
    HeaderSection,
    BiographySection,
    BooksSection,
    PressSection,
    ContactSection,
  ];

  if (loading) {
    return <Loader isDarkMode={isDarkMode} />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-700 ${themeClasses.bg} ${themeClasses.text} relative overflow-hidden`}
    >
      {/* Mouse spotlight effect */}
      <MouseSpotlight isDarkMode={isDarkMode} />
      <FancyNavButton />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-3 right-6 z-50 p-3 rounded-full ${themeClasses.cardBg} ${themeClasses.border} border shadow-lg transition-all duration-500 hover:scale-125 hover:rotate-180 group`}
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6 text-yellow-500 group-hover:animate-pulse" />
        ) : (
          <Moon className="w-6 h-6 text-indigo-600 group-hover:animate-pulse" />
        )}
      </button>

      {/* Navigation (mobile horizontal) */}
      {isMobile && !isScrollMode && (
        <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center items-center space-x-8">
          <button
            onClick={handlePrev}
            disabled={currentSection === 0}
            className="p-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white disabled:opacity-30 transform transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-lg font-bold bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent">
            {Math.min(currentSection + 1, sections.length)}/{sections.length}
          </span>
          <button
            onClick={handleNext}
            disabled={isScrollMode}
            className="p-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white disabled:opacity-30 transform transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div
        ref={containerRef}
        className={`container mx-auto px-6 py-16 flex-1 relative z-20 ${
          isMobile && !isScrollMode
            ? "flex items-center justify-center overflow-hidden"
            : ""
        }`}
        style={isMobile && !isScrollMode ? { minHeight: "100vh" } : undefined}
      >
        {isMobile && !isScrollMode ? (
          <div className="w-full max-w-md mx-auto transition-all duration-500 transform">
            {sectionComponents[currentSection]}
          </div>
        ) : (
          <div className="space-y-0">
            {HeaderSection}
            {BiographySection}
            {BooksSection}
            {PressSection}
            {ContactSection}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        className={`w-full py-4 text-center text-xs ${themeClasses.cardBg} ${themeClasses.textSecondary} border-t ${themeClasses.border} relative z-20`}
      >
        <div className="transform hover:scale-105 transition-transform duration-300">
          &copy; {new Date().getFullYear()} John Asikire. All rights reserved.
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes scale-x {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .animate-scale-x {
          animation: scale-x 0.8s ease-out 0.5s both;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(45, 212, 191, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(45, 212, 191, 0.8);
          }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
// In React, useCallback is a built-in hook. You should import it from 'react' instead of defining it yourself.
// Remove this function and add the following import at the top of your file if not already present:
// import React, { useCallback } from "react";
