"use client";
import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon, ArrowLeft, ArrowRight } from "lucide-react";

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
      subtitle: "Richard Gore",
      cover:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=450&fit=crop",
      genre: "Philosophy",
    },
    {
      title: "Roots",
      subtitle: "Richard Gore",
      cover:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
      genre: "Novel",
    },
    {
      title: "The Food of Love",
      subtitle: "Richard Gore",
      cover:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
      genre: "Short Story",
    },
  ];

  // Responsive detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sections = ["header", "biography", "books", "press", "contact"];
  const isLastSection = currentSection === sections.length - 1;

  // Swipe support for mobile
  useEffect(() => {
    if (!isMobile || isLastSection) return;
    const container = containerRef.current;
    if (!container) return;
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) handlePrev();
      else if (startX - endX > 50) handleNext();
    };
    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchend", onTouchEnd);
    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line
  }, [currentSection, isMobile, isLastSection]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1)
      setCurrentSection(currentSection + 1);
  };
  const handlePrev = () => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
  };

  // Section JSX
  const HeaderSection = (
    <div className="flex flex-col lg:flex-row items-start justify-between mb-20">
      {/* Profile Image */}
      <div className="w-full lg:w-2/5 mb-12 lg:mb-0">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face"
            alt="Richard Gore"
            className="w-full max-w-md mx-auto lg:mx-0 rounded-lg shadow-2xl"
          />
        </div>
      </div>
      {/* Header Text */}
      <div className="w-full lg:w-3/5 lg:pl-16">
        <div className="mb-8">
          <h1 className="text-6xl lg:text-8xl font-light mb-2">Richard</h1>
          <h1 className="text-6xl lg:text-8xl font-bold">Gore</h1>
          <p
            className={`text-sm uppercase tracking-widest mt-4 ${themeClasses.accent}`}
          >
            Website of the Writer
          </p>
        </div>
      </div>
    </div>
  );

  const BiographySection = (
    <div className="mb-20">
      <div className="flex flex-col lg:flex-row items-start">
        <div className="w-full lg:w-1/3 mb-12 lg:mb-0">
          <div className="text-9xl font-bold opacity-20 leading-none">01</div>
          <div className="mt-4">
            <h2 className="text-2xl font-light uppercase tracking-widest mb-6">
              My Biography
            </h2>
            <div
              className={`w-12 h-0.5 ${
                isDarkMode ? "bg-teal-400" : "bg-teal-600"
              } mb-8`}
            ></div>
            <div
              className={`space-y-4 text-sm ${themeClasses.textSecondary} leading-relaxed`}
            >
              <p>About Me</p>
              <p>Reviews</p>
              <p>The Next Book</p>
              <p>My Events</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 lg:pl-16">
          <div
            className={`${themeClasses.textSecondary} leading-relaxed space-y-6`}
          >
            <p>
              Gravida rutrum id quam blanditiis blandit. Cursus id purus
              blandit, bibendum sed accumsan nunc. Quis elit lorem blandit
              blandit elit ut blandit vitae et ligula blandit, vulputate
              pulvinar quis. Vestibulum hendrerit dignissim magna lorem lorem.
            </p>
            <p>
              Lorem ipsum dolor amet consectetur adipiscing elit. Sed blandit
              lorem mauris, vitae ornare elit risus ac. Consectetur Lorem ipsum
              lorem lorem mauris lorem ipsum consectetur mauris lorem.
              Consectetur mauris lorem ipsum consectetur mauris lorem mauris
              lorem mauris vestibulum elementum dui rutrum rutrum mauris.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const BooksSection = (
    <div className="mb-20">
      <div className="flex flex-col lg:flex-row items-start">
        <div className="w-full lg:w-1/3 mb-12 lg:mb-0">
          <div className="text-9xl font-bold opacity-20 leading-none">02</div>
          <div className="mt-4">
            <h2 className="text-2xl font-light uppercase tracking-widest">
              My Bestsellers
            </h2>
            <div
              className={`w-12 h-0.5 ${
                isDarkMode ? "bg-teal-400" : "bg-teal-600"
              } mt-6`}
            ></div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 lg:pl-16">
          <div className="grid md:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4 shadow-lg">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isDarkMode
                        ? "from-black/60 to-transparent"
                        : "from-white/60 to-transparent"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                </div>
                <p
                  className={`text-xs uppercase tracking-wide mb-2 ${themeClasses.accent}`}
                >
                  {book.genre}
                </p>
                <h3 className="text-lg font-bold uppercase tracking-wide">
                  {book.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const PressSection = (
    <div className="mb-20">
      <div className="flex flex-col lg:flex-row items-start">
        <div className="w-full lg:w-1/3 mb-12 lg:mb-0">
          <div className="text-9xl font-bold opacity-20 leading-none">03</div>
          <div className="mt-4">
            <h2 className="text-2xl font-light uppercase tracking-widest">
              The Press
            </h2>
            <div
              className={`w-12 h-0.5 ${
                isDarkMode ? "bg-teal-400" : "bg-teal-600"
              } mt-6`}
            ></div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 lg:pl-16">
          <div className={`${themeClasses.textSecondary} leading-relaxed mb-8`}>
            <p>
              "Gravida ut purus blanditiis rutrum elit rut scelerisque orci.
              Quis est rutrum rutrum rutrum blanditiis. Lorem id rutrum rutrum
              ipsum elit. ut elit blanditiis blanditiis rutrum rutrum lorem
              ipsum dolor lorem. Consectetur mauris lorem ipsum consectetur
              mauris lorem rutrum maec mauris mauris mauris lorem mauris lorem
              rutrum rutrum mauris lorem mauris rutrum mauris."
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Reviewer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-sm">John Charlton</p>
              <p className={`text-xs ${themeClasses.textSecondary}`}>
                Book Reviewer
              </p>
            </div>
            <div className="flex space-x-2 ml-auto">
              <ArrowLeft className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
              <ArrowRight className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactSection = (
    <div>
      <div className="flex flex-col lg:flex-row items-start">
        <div className="w-full lg:w-1/3 mb-12 lg:mb-0">
          <div className="text-9xl font-bold opacity-20 leading-none">04</div>
          <div className="mt-4">
            <h2 className="text-2xl font-light uppercase tracking-widest">
              Contact
            </h2>
            <div
              className={`w-12 h-0.5 ${
                isDarkMode ? "bg-teal-400" : "bg-teal-600"
              } mt-6`}
            ></div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 lg:pl-16">
          <div
            className={`${themeClasses.textSecondary} leading-relaxed space-y-6`}
          >
            <div>
              <p className="font-semibold mb-2">Email</p>
              <p>richard.gore@writer.com</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Phone</p>
              <p>+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Address</p>
              <p>
                123 Literary Lane
                <br />
                New York, NY 10001
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Social Media</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className={`${themeClasses.accent} hover:opacity-70 transition-opacity`}
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className={`${themeClasses.accent} hover:opacity-70 transition-opacity`}
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className={`${themeClasses.accent} hover:opacity-70 transition-opacity`}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Section array for mobile
  const sectionComponents = [
    HeaderSection,
    BiographySection,
    BooksSection,
    PressSection,
    ContactSection,
  ];

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-500 ${themeClasses.bg} ${themeClasses.text}`}
    >
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full ${themeClasses.cardBg} ${themeClasses.border} border shadow-lg transition-all duration-300 hover:scale-110`}
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-indigo-600" />
        )}
      </button>

      {/* Navigation (mobile horizontal) */}
      {isMobile && !isLastSection && (
        <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center items-center space-x-8">
          <button
            onClick={handlePrev}
            disabled={currentSection === 0}
            className="p-2 rounded-full bg-teal-500 text-white disabled:opacity-30"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-lg font-bold">
            {currentSection + 1}/{sections.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentSection === sections.length - 1}
            className="p-2 rounded-full bg-teal-500 text-white disabled:opacity-30"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Navigation (desktop) */}
      {!isMobile && (
        <div className="fixed top-6 left-6 z-40 flex items-center space-x-4">
          <ArrowLeft className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
          <div className="w-8 h-8 cursor-pointer">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        ref={containerRef}
        className={`container mx-auto px-2 py-16 flex-1 ${
          isMobile && !isLastSection
            ? "flex items-center justify-center overflow-hidden"
            : ""
        }`}
        style={isMobile && !isLastSection ? { minHeight: "100vh" } : undefined}
      >
        {isMobile && !isLastSection ? (
          <div className="w-full max-w-md mx-auto transition-all duration-500">
            {sectionComponents[currentSection]}
          </div>
        ) : (
          <div>
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
        className={`w-full py-4 text-center text-xs ${themeClasses.cardBg} ${themeClasses.textSecondary} border-t ${themeClasses.border}`}
      >
        &copy; {new Date().getFullYear()} Richard Gore. All rights reserved.
      </footer>
    </div>
  );
};
export default Portfolio;
