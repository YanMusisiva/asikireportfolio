"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sun,
  Moon,
  ArrowLeft,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
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

// Hook pour l'intersection observer
const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView] as const;
};

// Typewriter avec son de machine à écrire

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

const SectionWrapper = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => (
  <div
    className={`
      group relative
      rounded-2xl
      bg-gray-900
      shadow-xl
      transition-all
      duration-500
      border border-gray-800
      overflow-hidden
      z-[${10 - index}]
      lg:w-4/5
      mx-auto
      ${index % 2 === 0 ? "lg:translate-x-8" : "lg:-translate-x-8"}
      ${index > 0 ? "lg:-mt-32" : ""}
      hover:lg:-translate-y-4
      hover:lg:scale-105
      hover:lg:shadow-2xl
      hover:lg:border-teal-400
    `}
    style={{
      boxShadow:
        "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 1.5px 6px 0 rgba(20,184,166,0.15)",
    }}
  >
    {children}
  </div>
);

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

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
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

  const themeClasses = {
    bg: isDarkMode ? "bg-gray-900" : "bg-gray-100",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
    accent: isDarkMode ? "text-teal-400" : "text-teal-600",
    cardBg: isDarkMode ? "bg-gray-800" : "bg-white",
    border: isDarkMode ? "border-gray-700" : "border-gray-300",
  };

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

  // Swipe support for mobile
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
  }, [currentSection, isMobile, isLastCard, isScrollMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1)
      setCurrentSection(currentSection + 1);
    else if (currentSection === sections.length - 1)
      setCurrentSection(currentSection + 1);
  };

  const handlePrev = () => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
  };

  // Animation Components
  const FadeInSection = ({
    children,
    delay = 0,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) => {
    const [ref, isInView] = useInView();
    return (
      <div
        ref={ref}
        className={`transform transition-all duration-1000 ease-out ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  };

  const SlideInLeft = ({
    children,
    delay = 0,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) => {
    const [ref, isInView] = useInView();
    return (
      <div
        ref={ref}
        className={`transform transition-all duration-800 ease-out ${
          isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  };

  const SlideInRight = ({
    children,
    delay = 0,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) => {
    const [ref, isInView] = useInView();
    return (
      <div
        ref={ref}
        className={`transform transition-all duration-800 ease-out ${
          isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  };

  // Section JSX avec animations
  const HeaderSection = (
    <div className="flex flex-col lg:flex-row items-start justify-between mb-20 relative overflow-hidden">
      {/* Effet de parallax background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-600 transform scale-110"
          style={{
            transform: `translateY(${-window.scrollY * 0.5}px) scale(1.1)`,
          }}
        />
      </div>

      {/* Profile Image */}
      <SlideInLeft>
        <div className="w-full lg:w-2/5 mb-12 lg:mb-0 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <img
              src="johnasikire.jpg"
              alt="John Asikire"
              className="relative w-full max-w-md mx-auto lg:mx-0 rounded-full shadow-2xl transform transition-all duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </SlideInLeft>

      {/* Header Text */}
      <SlideInRight delay={200}>
        <div className="w-full lg:w-3/5 lg:pl-16 relative z-10">
          <div className="mb-8">
            <h1 className="text-6xl lg:text-8xl font-light mb-2 transform transition-all duration-700 hover:scale-105">
              {showTypewriter ? <TypewriterText text="John" /> : "John"}
            </h1>
            <h1 className="text-6xl lg:text-8xl font-bold transform transition-all duration-700 hover:scale-105">
              {showTypewriter ? <TypewriterText text="Asikire" /> : "Asikire"}
            </h1>
            <FadeInSection delay={1000}>
              <p
                className={`text-sm uppercase tracking-widest mt-4 ${themeClasses.accent} animate-pulse`}
              >
                <TypewriterText text="Software Developer and Entrepreneur" />
              </p>
            </FadeInSection>
          </div>
        </div>
      </SlideInRight>
    </div>
  );

  const BiographySection = (
    <FadeInSection>
      <div className="mb-20 relative">
        <div className="flex flex-col lg:flex-row items-start">
          <SlideInLeft>
            <div className="w-full lg:w-1/3 mb-12 lg:mb-0">
              <div className="text-9xl font-bold opacity-20 leading-none hover:opacity-30 transition-opacity duration-500">
                01
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-light uppercase tracking-widest mb-6 group">
                  <span className="bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-teal-400 transition-all duration-500">
                    My Biography
                  </span>
                </h2>
                <div
                  className={`w-12 h-0.5 ${
                    isDarkMode ? "bg-teal-400" : "bg-teal-600"
                  } mb-8 transform origin-left scale-x-0 animate-scale-x`}
                ></div>
                <div
                  className={`space-y-4 text-sm ${themeClasses.textSecondary} leading-relaxed`}
                >
                  {["About Me", "Reviews", "The Next Project", "My Events"].map(
                    (item, index) => (
                      <FadeInSection key={item} delay={index * 100}>
                        <p className="hover:text-teal-400 transition-colors duration-300 cursor-pointer transform hover:translate-x-2">
                          {item}
                        </p>
                      </FadeInSection>
                    )
                  )}
                </div>
              </div>
            </div>
          </SlideInLeft>

          <SlideInRight delay={300}>
            <div className="w-full lg:w-2/3 lg:pl-16">
              <div
                className={`${themeClasses.textSecondary} leading-relaxed space-y-6`}
              >
                <p className="transform transition-all duration-500 hover:text-white">
                  Passionate software developer with expertise in modern web
                  technologies and entrepreneurial spirit. I specialize in
                  creating elegant solutions that bridge the gap between
                  innovative ideas and practical implementation.
                </p>
                <p className="transform transition-all duration-500 hover:text-white">
                  With a focus on user experience and clean code architecture, I
                  help businesses transform their digital presence through
                  cutting-edge applications and strategic technology consulting.
                </p>
              </div>
            </div>
          </SlideInRight>
        </div>
      </div>
    </FadeInSection>
  );

  const BooksSection = (
    <FadeInSection>
      <div className="mb-20">
        <div className="flex flex-col lg:flex-row items-start">
          <SlideInLeft>
            <div className="w-full lg:w-1/3 mb-12 lg:mb-0">
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
          </SlideInLeft>

          <div className="w-full lg:w-2/3 lg:pl-16">
            <div className="grid md:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <SlideInRight key={index} delay={index * 150}>
                  <div className="text-center group cursor-pointer relative">
                    {/* Glow effect background */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-teal-400/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                    <div className="relative overflow-hidden rounded-lg mb-4 shadow-lg transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1">
                      <img
                        src={book.cover}
                        alt={book.title}
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
                </SlideInRight>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );

  const PressSection = (
    <FadeInSection>
      <div className="mb-20">
        <div className="flex flex-col lg:flex-row items-start">
          <SlideInLeft>
            <div className="w-full lg:w-1/3 mb-12 lg:mb-0">
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
          </SlideInLeft>

          <SlideInRight delay={300}>
            <div className="w-full lg:w-2/3 lg:pl-16">
              <div
                className={`${themeClasses.textSecondary} leading-relaxed mb-8 relative`}
              >
                <div className="absolute -left-4 -top-2 text-6xl text-teal-400/20 font-serif">
                  "
                </div>
                <p className="italic transform transition-all duration-500 hover:text-white pl-8">
                  "John's expertise in modern web development and his
                  entrepreneurial mindset make him an invaluable asset. His
                  ability to deliver innovative solutions while maintaining
                  exceptional code quality is truly remarkable."
                </p>
                <div className="absolute -right-4 -bottom-2 text-6xl text-teal-400/20 font-serif">
                  "
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full overflow-hidden transform transition-all duration-300 group-hover:scale-110">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="Reviewer"
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
          </SlideInRight>
        </div>
      </div>
    </FadeInSection>
  );

  const ContactSection = (
    <FadeInSection>
      <div>
        <div className="flex flex-col lg:flex-row items-start">
          <SlideInLeft>
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
          </SlideInLeft>

          <SlideInRight delay={300}>
            <div className="w-full lg:w-2/3 lg:pl-16">
              <div
                className={`${themeClasses.textSecondary} leading-relaxed space-y-6`}
              >
                {[
                  { label: "Email", value: "john.asikire@developer.com" },
                  { label: "Phone", value: "+256 (700) 123-456" },
                  { label: "Location", value: "Kampala, Uganda" },
                ].map((item, index) => (
                  <FadeInSection key={item.label} delay={index * 100}>
                    <div className="group hover:transform hover:translate-x-2 transition-all duration-300">
                      <p className="font-semibold mb-2 group-hover:text-teal-400">
                        {item.label}
                      </p>
                      <p className="group-hover:text-white">{item.value}</p>
                    </div>
                  </FadeInSection>
                ))}

                <FadeInSection delay={400}>
                  <div className="group">
                    <p className="font-semibold mb-2 group-hover:text-teal-400 transition-colors duration-300">
                      Social Media
                    </p>
                    <div className="flex space-x-4">
                      {[
                        { icon: Twitter, label: "Twitter" },
                        { icon: Linkedin, label: "LinkedIn" },
                        { icon: Github, label: "GitHub" },
                      ].map(({ icon: Icon, label }) => (
                        <a
                          key={label}
                          href="#"
                          className={`${themeClasses.accent} hover:text-white transition-all duration-300 flex items-center space-x-2 group/link`}
                        >
                          <Icon className="w-4 h-4 group-hover/link:animate-bounce" />
                          <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                            {label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </SlideInRight>
        </div>
      </div>
    </FadeInSection>
  );

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

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full ${themeClasses.cardBg} ${themeClasses.border} border shadow-lg transition-all duration-500 hover:scale-125 hover:rotate-180 group`}
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
          <div className="relative pt-32 pb-32 space-y-0">
            {[
              HeaderSection,
              BiographySection,
              BooksSection,
              PressSection,
              ContactSection,
            ].map((section, idx) => (
              <SectionWrapper key={idx} index={idx}>
                {section}
              </SectionWrapper>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        className={`w-full py-4 text-center text-xs ${themeClasses.cardBg} ${themeClasses.textSecondary} border-t ${themeClasses.border} relative z-20`}
      >
        <FadeInSection>
          <div className="transform hover:scale-105 transition-transform duration-300">
            &copy; {new Date().getFullYear()} John Asikire. All rights reserved.
          </div>
        </FadeInSection>
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
