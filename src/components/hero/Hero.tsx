/* eslint-disable react-hooks/exhaustive-deps */


/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useDarkMode, useLanguage } from "../../App";
import SchoolIcon from "@mui/icons-material/School";
import QuizIcon from "@mui/icons-material/Quiz";
import PsychologyIcon from "@mui/icons-material/Psychology";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VerifiedIcon from "@mui/icons-material/Verified";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GradeIcon from "@mui/icons-material/Grade";

// Images for carousel with multilingual titles
const getSlideImages = (language: string) => [
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
    title: language === "en" ? "Interactive Learning" : language === "fr" ? "Apprentissage Interactif" : "Kwiga Mu Buryo Bwimbitse",
    subtitle: language === "en" ? "Engage with dynamic content" : language === "fr" ? "Interagissez avec du contenu dynamique" : "Koresha ibikoresho bihuje n'igihe",
  },
  {
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
    title: language === "en" ? "Expert Instructors" : language === "fr" ? "Instructeurs Experts" : "Abarezi B'inzobere",
    subtitle: language === "en" ? "Learn from the best" : language === "fr" ? "Apprenez des meilleurs" : "Wiga ku bahanga",
  },
  {
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop",
    title: language === "en" ? "Study Anywhere" : language === "fr" ? "Étudiez N'importe Où" : "Wiga Aho Uhari Hose",
    subtitle: language === "en" ? "Access on any device" : language === "fr" ? "Accédez sur n'importe quel appareil" : "Koresha kuri buri kiganiro",
  },
  {
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop",
    title: language === "en" ? "AI-Powered Tools" : language === "fr" ? "Outils Alimentés par l'IA" : "Ibikoresho Bikoresheje AI",
    subtitle: language === "en" ? "Smart learning assistance" : language === "fr" ? "Assistance d'apprentissage intelligente" : "Ubufasha bwo kwiga bwihariye",
  },
  {
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
    title: language === "en" ? "Get Certified" : language === "fr" ? "Obtenez une Certification" : "Habona Ibyemezo",
    subtitle: language === "en" ? "Earn recognized certificates" : language === "fr" ? "Obtenez des certificats reconnus" : "Habona ibyemezo byemewe",
  },
];

// Start Learning Modal Component
interface StartLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onRegister?: () => void;
}

const StartLearningModal = ({
  isOpen,
  onClose,
  darkMode,
}: StartLearningModalProps) => {
  const { language } = useLanguage();

  const getRequirements = () => [
    {
      icon: <SchoolIcon className="text-sm" />,
      text: language === "en" ? "Basic computer or smartphone" : language === "fr" ? "Ordinateur ou smartphone de base" : "Mudasobwa cyangwa telefoni",
    },
    {
      icon: <VerifiedIcon className="text-sm" />,
      text: language === "en" ? "Internet connection" : language === "fr" ? "Connexion Internet" : "Internet",
    },
    {
      icon: <GradeIcon className="text-sm" />,
      text: language === "en" ? "Willingness to learn" : language === "fr" ? "Volonté d'apprendre" : "Ubuyobozi bwo kwiga",
    },
    {
      icon: <SupportAgentIcon className="text-sm" />,
      text: language === "en" ? "No prior experience needed" : language === "fr" ? "Aucune expérience préalable requise" : "Nta bumenyi busabwa",
    },
  ];

  const requirements = getRequirements();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div
              className={`rounded-2xl shadow-2xl overflow-hidden ${darkMode ? "bg-gray-900" : "bg-white"}`}
            >
              {/* Header */}
              <div
                className={`p-6 border-b ${darkMode ? "border-gray-800" : "border-gray-100"} bg-gradient-to-r from-primary-600 to-purple-600`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {language === "en"
                        ? "Start Your Learning Journey"
                        : language === "fr"
                        ? "Commencez Votre Parcours d'Apprentissage"
                        : "Tangira Urugendo Rwawe rwo Kwiga"}
                    </h2>
                    <p className="text-sm text-white/80 mt-1">
                      {language === "en"
                        ? "Join thousands of students learning in Kinyarwanda"
                        : language === "fr"
                        ? "Rejoignez des milliers d'étudiants apprenant en Kinyarwanda"
                        : "Injira mu itsinda ry'abanyeshuri 10,000+ biga mu Kinyarwanda"}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <CloseIcon className="text-white" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Requirements Section */}
                <div className="mb-8">
                  <h3
                    className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    <VerifiedIcon className="text-primary-500" />
                    {language === "en"
                      ? "What You Need"
                      : language === "fr"
                      ? "Ce Dont Vous Avez Besoin"
                      : "Ibikurikira Birakenewe"}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {requirements.map((req, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`flex items-center gap-2 p-3 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
                      >
                        <div
                          className={`p-1 rounded-full ${darkMode ? "bg-primary-900/30" : "bg-primary-50"}`}
                        >
                          {req.icon}
                        </div>
                        <span
                          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          {req.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Image Carousel Component
const ImageCarousel = ({ darkMode }: { darkMode: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();
  const slideImages = getSlideImages(language);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + slideImages.length) % slideImages.length,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          key={currentIndex}
          src={slideImages[currentIndex].url}
          alt={slideImages[currentIndex].title}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Slide Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-1">
            {slideImages[currentIndex].title}
          </h3>
          <p className="text-sm text-white/80">
            {slideImages[currentIndex].subtitle}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
          darkMode
            ? "bg-gray-800/80 hover:bg-gray-700"
            : "bg-white/80 hover:bg-white"
        } shadow-lg`}
      >
        <ChevronLeftIcon
          className={darkMode ? "text-white" : "text-gray-800"}
        />
      </button>
      <button
        onClick={nextSlide}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
          darkMode
            ? "bg-gray-800/80 hover:bg-gray-700"
            : "bg-white/80 hover:bg-white"
        } shadow-lg`}
      >
        <ChevronRightIcon
          className={darkMode ? "text-white" : "text-gray-800"}
        />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slideImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 ${
              idx === currentIndex
                ? "w-8 h-2 bg-primary-500 rounded-full"
                : `w-2 h-2 rounded-full ${darkMode ? "bg-gray-500" : "bg-gray-400"}`
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  index,
  darkMode,
}: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`p-6 rounded-2xl transition-all duration-300 ${
        darkMode
          ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-primary-500/50"
          : "bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-primary-500/30 shadow-lg"
      }`}
    >
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
          darkMode ? "bg-primary-900/30" : "bg-primary-50"
        }`}
      >
        <Icon
          className={`text-2xl ${darkMode ? "text-primary-400" : "text-primary-600"}`}
        />
      </div>
      <h3
        className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        {description}
      </p>
    </motion.div>
  );
};


// Main Hero Component - ONLY ADDED INFORMATION TEXT, NO FUNCTIONAL CHANGES
export const Hero = () => {
  const { darkMode } = useDarkMode();
  const { language } = useLanguage();
  const [isStartLearningModalOpen, setIsStartLearningModalOpen] =
    useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const features = [
    {
      icon: QuizIcon,
      title: language === "en" ? "AI-Powered Quizzes" : language === "fr" ? "Quiz Alimentés par l'IA" : "Ibibazo bikoresheje AI",
      description: language === "en"
          ? "Generate quizzes from any document with automatic grading"
          : language === "fr"
          ? "Générez des quiz à partir de n'importe quel document avec notation automatique"
          : "Kurema ibibazo uko wifuza hamwe n'amanota akora automatic",
    },
    {
      icon: PsychologyIcon,
      title: language === "en" ? "AI Tutor Assistant" : language === "fr" ? "Assistant Tuteur IA" : "Umurezi wa AI",
      description: language === "en"
          ? "24/7 AI tutor that explains concepts in simple Kinyarwanda"
          : language === "fr"
          ? "Tuteur IA 24/7 qui explique les concepts dans un Kinyarwanda simple"
          : "Umurezi wa AI uboneka buri gihe usobanura mu Kinyarwanda",
    },
  ];

  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0 z-0">
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              darkMode
                ? "bg-gradient-to-br from-gray-900 via-gray-900 to-primary-900/20"
                : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
            }`}
          />
          {/* Animated blobs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              {/* AI Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-primary-500/10 border border-purple-500/20 mb-6"
              >
                <AutoAwesomeIcon className="text-purple-500 text-sm" />
                <span
                  className={`text-xs font-medium ${darkMode ? "text-purple-400" : "text-purple-600"}`}
                >
                  {language === "en"
                    ? "AI-Powered Learning Platform"
                    : language === "fr"
                    ? "Plateforme d'Apprentissage Alimentée par l'IA"
                    : "Ihuriro ryo kwiga rikoresheje AI"}
                </span>
              </motion.div>

              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {language === "en" ? (
                  <>
                    Learn Anytime,
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                      {" "}
                      Anywhere
                    </span>
                  </>
                ) : language === "fr" ? (
                  <>
                    Apprenez à Tout Moment,
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                      {" "}
                      N'Importe Où
                    </span>
                  </>
                ) : (
                  <>
                    Wiga Igihe Cyose,
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                      {" "}
                      Aho Uhari
                    </span>
                  </>
                )}
              </h1>

              <p
                className={`text-base sm:text-lg lg:text-xl mb-8 leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {language === "en"
                  ? "Access quality education in Kinyarwanda with AI-powered learning, personalized tutoring, and verified certificates."
                  : language === "fr"
                  ? "Accédez à une éducation de qualité en Kinyarwanda avec l'apprentissage alimenté par l'IA, un tutorat personnalisé et des certificats vérifiés."
                  : "Ibigo byiza mu Kinyarwanda hamwe na AI, umurezi wawe bwite, n'ibyemezo byemewe."}
              </p>

              {/* ADDED INFORMATION SECTION - Skill Testing & Bug Finding */}
              <div
                className={`mb-8 p-4 rounded-xl border ${
                  darkMode
                    ? "bg-blue-900/20 border-blue-700"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <h3
                  className={`font-semibold mb-2 flex items-center gap-2 ${
                    darkMode ? "text-blue-300" : "text-blue-800"
                  }`}
                >
                  <span className="text-lg">📋</span>
                  {language === "en"
                    ? "Test Your Skills & Find Bugs!"
                    : language === "fr"
                    ? "Testez Vos Compétences & Trouvez des Bugs!"
                    : "Gerageza Ubumenyi Bwawe & Shakisha Amakosa!"}
                </h3>
                <p
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  {language === "en"
                    ? "This platform helps you test your skills by generating custom tests and quizzes. You can also find and debug issues in your learning system to improve your results."
                    : language === "fr"
                    ? "Cette plateforme vous aide à tester vos compétences en générant des tests et des quiz personnalisés. Vous pouvez également trouver et déboguer des problèmes dans votre système d'apprentissage pour améliorer vos résultats."
                    : "Uru rubuga rubafasha kugerageza ubumenyi bwawe mukora ibizamini n'ibibazo. Ushobora kandi gushakisha amakosa muri sisitemu yawe yo kwiga kugirango ugire ibyiza binini."}
                </p>
                <div className="flex gap-3 mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-blue-800/50 text-blue-300" : "bg-blue-100 text-blue-700"}`}
                  >
                    {language === "en" ? "📝 Generate Tests" : language === "fr" ? "📝 Générer des Tests" : "📝 Generate Tests"}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-blue-800/50 text-blue-300" : "bg-blue-100 text-blue-700"}`}
                  >
                    {language === "en" ? "🐛 Find Bugs" : language === "fr" ? "🐛 Trouver des Bugs" : "🐛 Find Bugs"}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-blue-800/50 text-blue-300" : "bg-blue-100 text-blue-700"}`}
                  >
                    {language === "en" ? "📊 Track Results" : language === "fr" ? "📊 Suivre les Résultats" : "📊 Track Results"}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsStartLearningModalOpen(true)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
                >
                  {language === "en"
                    ? "Start Learning Free"
                    : language === "fr"
                    ? "Commencez à Apprendre Gratuitement"
                    : "Tangira Kwiga Ubuntu"}
                  <ArrowForwardIcon className="text-sm" />
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column - Image Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <ImageCarousel darkMode={darkMode} />

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <PsychologyIcon className="text-purple-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      {language === "en" ? "AI Tutor Online" : language === "fr" ? "Tuteur IA en Ligne" : "Umurezi wa AI"}
                    </p>
                    <p className="text-xs text-green-600">
                      {language === "en" ? "24/7 Available" : language === "fr" ? "Disponible 24/7" : "Buri gihe"}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <EmojiEventsIcon className="text-yellow-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      {language === "en"
                        ? "Certificate Ready"
                        : language === "fr"
                        ? "Certificat Prêt"
                        : "Ibyemezo Biragutegereje"}
                    </p>
                    <p className="text-xs text-green-600">
                      {language === "en"
                        ? "Upon Completion"
                        : language === "fr"
                        ? "À la Fin"
                        : "Uzarangiza ushobora kubona"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {language === "en"
                  ? "Why Choose E-Learning?"
                  : language === "fr"
                  ? "Pourquoi Choisir E-Learning?"
                  : "Kuki Wahitamo E-Learning?"}
              </h2>
              <p
                className={`text-base lg:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {language === "en"
                  ? "We provide quality education tailored for students"
                  : language === "fr"
                  ? "Nous fournissons une éducation de qualité adaptée aux étudiants"
                  : "Duha amasomo meza yujuje ibikenewe n'abanyeshuri"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  index={index}
                  {...feature}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      <StartLearningModal
        isOpen={isStartLearningModalOpen}
        onClose={() => setIsStartLearningModalOpen(false)}
        darkMode={darkMode}
        onRegister={() => {
          setIsStartLearningModalOpen(false);
          // Trigger register modal from navbar
          const registerButton = document.querySelector(
            'button[aria-label="Register"]',
          );
          if (registerButton) {
            (registerButton as HTMLButtonElement).click();
          }
        }}
      />
    </>
  );
};