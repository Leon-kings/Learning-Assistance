/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import axios from "axios";
import { useDarkMode, useLanguage } from "../../App";
import SchoolIcon from "@mui/icons-material/School";
import QuizIcon from "@mui/icons-material/Quiz";
import PsychologyIcon from "@mui/icons-material/Psychology";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GradeIcon from "@mui/icons-material/Grade";

// Images for carousel
const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
    title: "Interactive Learning",
    subtitle: "Engage with dynamic content",
  },
  {
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
    title: "Expert Instructors",
    subtitle: "Learn from the best",
  },
  {
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop",
    title: "Study Anywhere",
    subtitle: "Access on any device",
  },
  {
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop",
    title: "AI-Powered Tools",
    subtitle: "Smart learning assistance",
  },
  {
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
    title: "Get Certified",
    subtitle: "Earn recognized certificates",
  },
];

// Video Modal Component
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  videoUrl?: string;
}

const VideoModal = ({
  isOpen,
  onClose,
  darkMode,
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
}: VideoModalProps) => {
  const { language } = useLanguage();

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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-4xl"
          >
            <div
              className={`rounded-2xl overflow-hidden shadow-2xl ${darkMode ? "bg-gray-900" : "bg-white"}`}
            >
              <div
                className={`p-4 border-b flex justify-between items-center ${darkMode ? "border-gray-800" : "border-gray-100"}`}
              >
                <h3
                  className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {language === "en"
                    ? "How E-Learning Works"
                    : "Uko E-Learning Ikora"}
                </h3>
                <button
                  onClick={onClose}
                  className={`p-1 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                >
                  <CloseIcon
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  />
                </button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={videoUrl}
                  title="Video"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

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

  const requirements = [
    {
      icon: <SchoolIcon className="text-sm" />,
      text:
        language === "en"
          ? "Basic computer or smartphone"
          : "Mudasobwa cyangwa telefoni",
    },
    {
      icon: <VerifiedIcon className="text-sm" />,
      text: language === "en" ? "Internet connection" : "Internet",
    },
    {
      icon: <GradeIcon className="text-sm" />,
      text: language === "en" ? "Willingness to learn" : "Ubuyobozi bwo kwiga",
    },
    {
      icon: <SupportAgentIcon className="text-sm" />,
      text:
        language === "en"
          ? "No prior experience needed"
          : "Nta bumenyi busabwa",
    },
  ];

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
                        : "Tangira Urugendo Rwawe rwo Kwiga"}
                    </h2>
                    <p className="text-sm text-white/80 mt-1">
                      {language === "en"
                        ? "Join thousands of students learning in Kinyarwanda"
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
  useLanguage();

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

// Contact Modal Component
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const ContactModal = ({ isOpen, onClose, darkMode }: ContactModalProps) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const validateField = (field: string, value: string): boolean => {
    switch (field) {
      case "name":
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            name:
              language === "en"
                ? "Name is required"
                : "Izina ntabwo rishobora kuba ubusa",
          }));
          return false;
        }
        if (value.length < 2) {
          setErrors((prev) => ({
            ...prev,
            name:
              language === "en"
                ? "Name must be at least 2 characters"
                : "Izina rigomba kuba byibuze inyuguti 2",
          }));
          return false;
        }
        setErrors((prev) => ({ ...prev, name: undefined }));
        return true;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            email:
              language === "en"
                ? "Email is required"
                : "Email ntabwo ishobora kuba ubusa",
          }));
          return false;
        }
        if (!emailRegex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            email: language === "en" ? "Invalid email format" : "Email sibyo",
          }));
          return false;
        }
        setErrors((prev) => ({ ...prev, email: undefined }));
        return true;
      case "phone":
        const phoneRegex = /^[0-9]{10}$/;
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            phone:
              language === "en"
                ? "Phone number is required"
                : "Telefone ntabwo ishobora kuba ubusa",
          }));
          return false;
        }
        if (!phoneRegex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            phone:
              language === "en"
                ? "Phone number must be 10 digits"
                : "Telefone igomba kuba inyuguti 10",
          }));
          return false;
        }
        setErrors((prev) => ({ ...prev, phone: undefined }));
        return true;
      case "message":
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            message:
              language === "en"
                ? "Message is required"
                : "Ubutumwa ntabwo bushobora kuba ubusa",
          }));
          return false;
        }
        if (value.length < 10) {
          setErrors((prev) => ({
            ...prev,
            message:
              language === "en"
                ? "Message must be at least 10 characters"
                : "Ubutumwa bugomba kuba byibuze inyuguti 10",
          }));
          return false;
        }
        setErrors((prev) => ({ ...prev, message: undefined }));
        return true;
      default:
        return true;
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field as keyof typeof touched]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = { name: true, email: true, phone: true, message: true };
    setTouched(allTouched);

    const isValid = Object.keys(allTouched).every((field) =>
      validateField(field, formData[field as keyof typeof formData]),
    );

    if (isValid) {
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        const response = await axios.post(
          "https://your-api.com/api/contact",
          formData,
        );

        if (response.status === 200) {
          setSubmitStatus({
            type: "success",
            message:
              language === "en"
                ? "Message sent successfully! We will contact you soon."
                : "Ubutumwa bwawe bwatumwe neza! Tuzaguhuza vuba.",
          });
          setFormData({ name: "", email: "", phone: "", message: "" });
          setTouched({
            name: false,
            email: false,
            phone: false,
            message: false,
          });

          setTimeout(() => {
            onClose();
            setSubmitStatus(null);
          }, 2000);
        }
      } catch (error) {
        setSubmitStatus({
          type: "error",
          message:
            language === "en"
              ? "Failed to send message. Please try again later."
              : "Ubutumwa ntabwo bwatumwe. Ongera ugerageze nyuma.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div
              className={`rounded-2xl shadow-2xl overflow-hidden ${darkMode ? "bg-gray-900" : "bg-white"}`}
            >
              <div
                className={`p-6 border-b ${darkMode ? "border-gray-800" : "border-gray-100"} bg-gradient-to-r from-primary-600 to-purple-600`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {language === "en" ? "Contact Us" : "Twandikire"}
                    </h2>
                    <p className="text-sm text-white/80 mt-1">
                      {language === "en"
                        ? "We'd love to hear from you!"
                        : "Twishimiye kumva ubutumwa bwawe!"}
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

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {language === "en" ? "Full Name" : "Izina ryuzuye"} *
                  </label>
                  <div className="relative">
                    <PersonIcon
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm ${
                        touched.name && errors.name
                          ? "text-red-500"
                          : touched.name && !errors.name && formData.name
                            ? "text-green-500"
                            : darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                      }`}
                    />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
                        touched.name && !errors.name && formData.name
                          ? "border-green-500 focus:ring-green-500/20 bg-green-50/50 dark:bg-green-900/10"
                          : touched.name && errors.name
                            ? "border-red-500 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/10"
                            : darkMode
                              ? "border-gray-700 bg-gray-800 text-white focus:ring-primary-500/20 focus:border-primary-500"
                              : "border-gray-300 bg-white text-gray-900 focus:ring-primary-500/20 focus:border-primary-500"
                      }`}
                      placeholder={
                        language === "en"
                          ? "Jean Paul Mukasanga"
                          : "Mukasanga Jean Paul"
                      }
                    />
                    {touched.name && formData.name && !errors.name && (
                      <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-sm" />
                    )}
                    {touched.name && errors.name && (
                      <ErrorIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-sm" />
                    )}
                  </div>
                  {touched.name && errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Email *
                  </label>
                  <div className="relative">
                    <EmailIcon
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm ${
                        touched.email && errors.email
                          ? "text-red-500"
                          : touched.email && !errors.email && formData.email
                            ? "text-green-500"
                            : darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                      }`}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
                        touched.email && !errors.email && formData.email
                          ? "border-green-500 focus:ring-green-500/20 bg-green-50/50 dark:bg-green-900/10"
                          : touched.email && errors.email
                            ? "border-red-500 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/10"
                            : darkMode
                              ? "border-gray-700 bg-gray-800 text-white focus:ring-primary-500/20 focus:border-primary-500"
                              : "border-gray-300 bg-white text-gray-900 focus:ring-primary-500/20 focus:border-primary-500"
                      }`}
                      placeholder="jean@example.com"
                    />
                    {touched.email && formData.email && !errors.email && (
                      <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-sm" />
                    )}
                    {touched.email && errors.email && (
                      <ErrorIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-sm" />
                    )}
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {language === "en" ? "Phone Number" : "Telefone"} *
                  </label>
                  <div className="relative">
                    <PhoneIcon
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm ${
                        touched.phone && errors.phone
                          ? "text-red-500"
                          : touched.phone && !errors.phone && formData.phone
                            ? "text-green-500"
                            : darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                      }`}
                    />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
                        touched.phone && !errors.phone && formData.phone
                          ? "border-green-500 focus:ring-green-500/20 bg-green-50/50 dark:bg-green-900/10"
                          : touched.phone && errors.phone
                            ? "border-red-500 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/10"
                            : darkMode
                              ? "border-gray-700 bg-gray-800 text-white focus:ring-primary-500/20 focus:border-primary-500"
                              : "border-gray-300 bg-white text-gray-900 focus:ring-primary-500/20 focus:border-primary-500"
                      }`}
                      placeholder="0788123456"
                    />
                    {touched.phone && formData.phone && !errors.phone && (
                      <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-sm" />
                    )}
                    {touched.phone && errors.phone && (
                      <ErrorIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-sm" />
                    )}
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {language === "en" ? "Message" : "Ubutumwa"} *
                  </label>
                  <div className="relative">
                    <MessageIcon
                      className={`absolute left-3 top-3 text-sm ${
                        touched.message && errors.message
                          ? "text-red-500"
                          : touched.message &&
                              !errors.message &&
                              formData.message
                            ? "text-green-500"
                            : darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                      }`}
                    />
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      rows={4}
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-200 outline-none focus:ring-2 resize-none ${
                        touched.message && !errors.message && formData.message
                          ? "border-green-500 focus:ring-green-500/20 bg-green-50/50 dark:bg-green-900/10"
                          : touched.message && errors.message
                            ? "border-red-500 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/10"
                            : darkMode
                              ? "border-gray-700 bg-gray-800 text-white focus:ring-primary-500/20 focus:border-primary-500"
                              : "border-gray-300 bg-white text-gray-900 focus:ring-primary-500/20 focus:border-primary-500"
                      }`}
                      placeholder={
                        language === "en"
                          ? "Tell us how we can help you..."
                          : "Tubwire uko twagufasha..."
                      }
                    />
                    {touched.message && formData.message && !errors.message && (
                      <CheckCircleIcon className="absolute right-3 top-3 text-green-500 text-sm" />
                    )}
                    {touched.message && errors.message && (
                      <ErrorIcon className="absolute right-3 top-3 text-red-500 text-sm" />
                    )}
                  </div>
                  {touched.message && errors.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-xl ${
                      submitStatus.type === "success"
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-medium hover:from-primary-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <SendIcon className="text-sm" />
                      {language === "en" ? "Send Message" : "Tuma Ubutumwa"}
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Main Hero Component - ONLY ADDED INFORMATION TEXT, NO FUNCTIONAL CHANGES
export const Hero = () => {
  const { darkMode } = useDarkMode();
  const { language } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
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
      title:
        language === "en" ? "AI-Powered Quizzes" : "Ibibazo bikoresheje AI",
      description:
        language === "en"
          ? "Generate quizzes from any document with automatic grading"
          : "Kurema ibibazo uko wifuza hamwe n'amanota akora automatic",
    },
    {
      icon: PsychologyIcon,
      title: language === "en" ? "AI Tutor Assistant" : "Umurezi wa AI",
      description:
        language === "en"
          ? "24/7 AI tutor that explains concepts in simple Kinyarwanda"
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
                    : "Gerageza Ubumenyi Bwawe & Shakisha Amakosa!"}
                </h3>
                <p
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  {language === "en"
                    ? "This platform helps you test your skills by generating custom tests and quizzes. You can also find and debug issues in your learning system to improve your results."
                    : "Uru rubuga rubafasha kugerageza ubumenyi bwawe mukora ibizamini n'ibibazo. Ushobora kandi gushakisha amakosa muri sisitemu yawe yo kwiga kugirango ugire ibyiza binini."}
                </p>
                <div className="flex gap-3 mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-blue-800/50 text-blue-300" : "bg-blue-100 text-blue-700"}`}
                  >
                    📝 Generate Tests
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-blue-800/50 text-blue-300" : "bg-blue-100 text-blue-700"}`}
                  >
                    🐛 Find Bugs
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-blue-800/50 text-blue-300" : "bg-blue-100 text-blue-700"}`}
                  >
                    📊 Track Results
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
                    : "Tangira Kwiga Ubuntu"}
                  <ArrowForwardIcon className="text-sm" />
                </motion.button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}
                >
                  🎓 Graduated
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}
                >
                  Any Curriculum
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}
                >
                  🤖 AI Tutor Included
                </span>
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
                      {language === "en" ? "AI Tutor Online" : "Umurezi wa AI"}
                    </p>
                    <p className="text-xs text-green-600">
                      {language === "en" ? "24/7 Available" : "Buri gihe"}
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
                        : "Ibyemezo Biragutegereje"}
                    </p>
                    <p className="text-xs text-green-600">
                      {language === "en"
                        ? "Upon Completion"
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
                  : "Kuki Wahitamo E-Learning?"}
              </h2>
              <p
                className={`text-base lg:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {language === "en"
                  ? "We provide quality education tailored for students"
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

      {/* Modals */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        darkMode={darkMode}
      />

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
