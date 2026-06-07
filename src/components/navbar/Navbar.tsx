/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext, useContext } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// Material Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ChatIcon from "@mui/icons-material/Chat";
import RecommendIcon from "@mui/icons-material/Recommend";
import QuizIcon from "@mui/icons-material/Quiz";
import LanguageIcon from "@mui/icons-material/Language";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import BuildIcon from "@mui/icons-material/Build";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BugReportIcon from "@mui/icons-material/BugReport";

// ==================== LANGUAGE CONTEXT ====================
type Language = "en" | "rw" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.ai-powered": "AI-Powered",
    "nav.e-learning": "Learner Assistance",
    "nav.kinyarwanda": "In Kinyarwanda",
    "ai.features": "AI Features:",
    "ai.kinyarwanda-tutor": "AI Tutor",
    "ai.generate-quiz": "Generate Quiz",
    "ai.course-recommendations": "Recommendations",
    "ai.skill-test": "Skill Test",
    "ai.bug-finder": "Bug Finder",
    "ai.rwandan-curriculum": "Free Learning Tools",
    "ai.tvet": "Debug Code",
    "ai.explain": "Explain Concepts",
    "language.english": "English",
    "language.kinyarwanda": "Kinyarwanda",
    "language.french": "French",
    "language.switch": "Switch Language",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
  },
  rw: {
    "nav.home": "Ahabanza",
    "nav.about": "Ibyerekeye",
    "nav.services": "Serivisi",
    "nav.ai-powered": "Ikoresha AI",
    "nav.e-learning": "Ubufasha bwo Kwiga",
    "nav.kinyarwanda": "Mu Kinyarwanda",
    "ai.features": "Ibikorwa bya AI:",
    "ai.kinyarwanda-tutor": "Umurezi wa AI",
    "ai.generate-quiz": "Kurema Ibibazo",
    "ai.course-recommendations": "Inama",
    "ai.skill-test": "Kugerageza Ubumenyi",
    "ai.bug-finder": "Gushakisha Amakosa",
    "ai.rwandan-curriculum": "Ibikoresho byo Kwiga ku Buntu",
    "ai.tvet": "Kosora Kode",
    "ai.explain": "Sobanura Ibintu",
    "language.english": "Icyongereza",
    "language.kinyarwanda": "Ikinyarwanda",
    "language.french": "Igifaransa",
    "language.switch": "Hindura Ururimi",
    "footer.privacy": "Amabanga",
    "footer.terms": "Amategeko",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.ai-powered": "Alimenté par IA",
    "nav.e-learning": "Assistance à l'Apprentissage",
    "nav.kinyarwanda": "En Kinyarwanda",
    "ai.features": "Fonctionnalités IA:",
    "ai.kinyarwanda-tutor": "Tuteur IA",
    "ai.generate-quiz": "Générer Quiz",
    "ai.course-recommendations": "Recommandations",
    "ai.skill-test": "Test de Compétences",
    "ai.bug-finder": "Recherche de Bugs",
    "ai.rwandan-curriculum": "Outils d'Apprentissage Gratuits",
    "ai.tvet": "Déboguer le Code",
    "ai.explain": "Expliquer les Concepts",
    "language.english": "Anglais",
    "language.kinyarwanda": "Kinyarwanda",
    "language.french": "Français",
    "language.switch": "Changer de Langue",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions d'Utilisation",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return saved === "en" || saved === "rw" || saved === "fr"
      ? (saved as Language)
      : "rw";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ==================== MAIN NAVBAR COMPONENT ====================
interface NavbarProps {
  darkMode?: boolean;
  onDarkModeToggle?: () => void;
}

const NavbarContent = ({ darkMode = false, onDarkModeToggle }: NavbarProps) => {
  const { t, language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    if (isLanguageMenuOpen) setIsLanguageMenuOpen(false);
  }, [location.pathname]);

  // Function to handle language change with page refresh
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
    // Refresh the entire page
    window.location.reload();
  };

  const navItems = [
    { name: t("nav.home"), path: "/", icon: HomeIcon },
    { name: t("nav.about"), path: "/about", icon: InfoIcon },
    { name: t("nav.services"), path: "/services", icon: BuildIcon },
  ];

  const isNavItemActive = (path: string) =>
    path === "/"
      ? location.pathname === path
      : location.pathname.startsWith(path);

  const mobileMenuVariants: Variants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.5,
      },
    },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3 } },
  };

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.15 } },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? darkMode
              ? "bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800"
              : "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : darkMode
              ? "bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50"
              : "bg-white/80 backdrop-blur-sm border-b border-gray-200/50"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20 max-w-[1920px] mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <MenuIcon className="text-gray-700 dark:text-gray-300" />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="relative">
                    <SchoolIcon className="text-primary-600 dark:text-primary-400 text-2xl sm:text-3xl lg:text-4xl" />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full"
                    />
                  </div>
                  <div className="hidden sm:block">
                    <span
                      className={`text-base sm:text-lg lg:text-xl font-bold whitespace-nowrap ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {t("nav.e-learning")}
                    </span>
                  </div>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:flex"
              >
                <div className="px-2 py-1 text-[10px] lg:text-xs bg-gradient-to-r from-purple-500 to-primary-500 text-white rounded-full flex items-center gap-1 shadow-lg">
                  <AutoAwesomeIcon className="text-[10px] lg:text-xs" />
                  <span className="font-medium">{t("nav.ai-powered")}</span>
                </div>
              </motion.div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 flex-1 px-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isNavItemActive(item.path);
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`relative px-3 xl:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                        : darkMode
                          ? "text-gray-300 hover:text-white hover:bg-gray-800"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="text-base xl:text-lg" />
                      <span>{item.name}</span>
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Language Switcher */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-1 ${darkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
                >
                  <LanguageIcon />
                  <span className="hidden md:inline text-sm font-medium">
                    {language === "en" ? "EN" : language === "fr" ? "FR" : "RW"}
                  </span>
                </motion.button>
                <AnimatePresence>
                  {isLanguageMenuOpen && (
                    <>
                      <motion.div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsLanguageMenuOpen(false)}
                      />
                      <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl overflow-hidden z-50 ${darkMode ? "bg-gray-800" : "bg-white"} border ${darkMode ? "border-gray-700" : "border-gray-100"}`}
                      >
                        <div
                          className={`p-2 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}
                        >
                          <p
                            className={`text-xs font-medium px-3 py-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                          >
                            {t("language.switch")}
                          </p>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => handleLanguageChange("en")}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${language === "en" ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400" : darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">🇬🇧</span>
                              <div>
                                <p className="text-sm font-medium">English</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  English
                                </p>
                              </div>
                            </div>
                            {language === "en" && (
                              <CheckIcon className="text-sm" />
                            )}
                          </button>
                          <button
                            onClick={() => handleLanguageChange("fr")}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors mt-1 ${language === "fr" ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400" : darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">🇫🇷</span>
                              <div>
                                <p className="text-sm font-medium">Français</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  French
                                </p>
                              </div>
                            </div>
                            {language === "fr" && (
                              <CheckIcon className="text-sm" />
                            )}
                          </button>
                          <button
                            onClick={() => handleLanguageChange("rw")}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors mt-1 ${language === "rw" ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400" : darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">🇷🇼</span>
                              <div>
                                <p className="text-sm font-medium">
                                  Kinyarwanda
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Ikinyarwanda
                                </p>
                              </div>
                            </div>
                            {language === "rw" && (
                              <CheckIcon className="text-sm" />
                            )}
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Dark Mode Toggle */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={onDarkModeToggle}
                className={`p-2 rounded-lg transition-all duration-300 ${darkMode ? "hover:bg-gray-800 text-yellow-400" : "hover:bg-gray-100 text-gray-600"}`}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* AI Features Bar - NOW RESPONSIVE - Shows on all screen sizes */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ delay: 0.2 }}
          className="border-t dark:border-gray-800 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-900/30 dark:to-gray-900/20 overflow-x-auto"
        >
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1920px] mx-auto py-2">
              <div className="flex items-center justify-start lg:justify-between gap-4 lg:gap-6 text-xs overflow-x-auto whitespace-nowrap">
                {/* AI Features Label - Hidden on very small screens */}
                <span className="hidden sm:flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-medium flex-shrink-0">
                  <AutoAwesomeIcon className="text-sm" />
                  {t("ai.features")}
                </span>

                {/* Generate Quiz Link */}
                <Link
                  to="/quiz-generator"
                  className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors flex-shrink-0"
                >
                  <QuizIcon className="text-sm" />
                  <span className="hidden xs:inline">
                    {t("ai.generate-quiz")}
                  </span>
                </Link>

                {/* Recommendations Link */}
                <Link
                  to="/recommendations"
                  className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors flex-shrink-0"
                >
                  <RecommendIcon className="text-sm" />
                  <span className="hidden xs:inline">
                    {t("ai.course-recommendations")}
                  </span>
                </Link>

                {/* Skill Test Link */}
                <Link
                  to="/services"
                  className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors flex-shrink-0"
                >
                  <AssessmentIcon className="text-sm" />
                  <span className="hidden xs:inline">{t("ai.skill-test")}</span>
                </Link>

                {/* Bug Finder Link */}
                <Link
                  to="/services"
                  className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors flex-shrink-0"
                >
                  <BugReportIcon className="text-sm" />
                  <span className="hidden xs:inline">{t("ai.bug-finder")}</span>
                </Link>

                {/* Right side badges - Hidden on small screens */}
                <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                  <span className="flex items-center gap-1 text-green-600">
                    <QuizIcon className="text-sm" />✓ {t("ai.generate-quiz")}
                  </span>
                  <span className="flex items-center gap-1 text-blue-600">
                    <RecommendIcon className="text-sm" />✓{" "}
                    {t("ai.course-recommendations")}
                  </span>
                  <span className="flex items-center gap-1 text-orange-600">
                    <ChatIcon className="text-sm" />✓ {t("ai.explain")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-96 bg-white dark:bg-gray-900 z-50 lg:hidden shadow-2xl"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SchoolIcon className="text-primary-600 dark:text-primary-400 text-2xl" />
                    <span className="text-lg font-bold">
                      {t("nav.e-learning")}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <CloseIcon className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto pb-32">
                <div className="p-3">
                  {navItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <NavLink
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-3 py-3 rounded-xl mb-1 transition-all duration-200 ${isNavItemActive(item.path) ? "bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 text-primary-600 dark:text-primary-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="text-xl" />
                            <p className="text-sm font-medium">{item.name}</p>
                          </div>
                        </NavLink>
                      </motion.div>
                    );
                  })}

                  {/* Mobile Menu AI Features Section */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p
                      className={`text-xs font-semibold mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {t("ai.features")}
                    </p>
                    <div className="space-y-2">
                      <Link
                        to="/quiz-generator"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${darkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}
                      >
                        <QuizIcon className="text-primary-500 text-sm" />
                        {t("ai.generate-quiz")}
                      </Link>
                      <Link
                        to="/recommendations"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${darkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}
                      >
                        <RecommendIcon className="text-primary-500 text-sm" />
                        {t("ai.course-recommendations")}
                      </Link>
                      <Link
                        to="/services"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${darkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}
                      >
                        <AssessmentIcon className="text-primary-500 text-sm" />
                        {t("ai.skill-test")}
                      </Link>
                      <Link
                        to="/services"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${darkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}
                      >
                        <BugReportIcon className="text-primary-500 text-sm" />
                        {t("ai.bug-finder")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800/30">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-3 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <AssessmentIcon className="text-green-600 dark:text-green-400" />
                    <span className="text-sm font-semibold text-green-900 dark:text-green-100">
                      {t("ai.rwandan-curriculum")}
                    </span>
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    {language === "en"
                      ? "Generate quizzes • Get recommendations • Test skills • Find bugs • AI Tutor • No registration needed"
                      : language === "fr"
                        ? "Générer des quiz • Obtenir des recommandations • Tester les compétences • Trouver des bugs • Tuteur IA • Aucune inscription requise"
                        : "Kurema ibibazo • Kubona inama • Kugerageza ubumenyi • Gushakisha amakosa • Umurezi wa AI • Nta kwiyandikisha birakenewe"}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

// Main export
export const Navbar = (props: NavbarProps) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <LanguageProvider>
      <NavbarContent
        darkMode={darkMode}
        onDarkModeToggle={toggleDarkMode}
        {...props}
      />
    </LanguageProvider>
  );
};
