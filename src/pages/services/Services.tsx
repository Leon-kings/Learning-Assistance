// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-case-declarations */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useRef, useEffect } from "react";
// import {
//   motion,
//   useAnimation,
//   useInView,
//   AnimatePresence,
// } from "framer-motion";
// import axios from "axios";
// import { useDarkMode, useLanguage } from "../../App";
// import SchoolIcon from "@mui/icons-material/School";
// import PsychologyIcon from "@mui/icons-material/Psychology";
// import QuizIcon from "@mui/icons-material/Quiz";
// import AnalyticsIcon from "@mui/icons-material/Analytics";
// import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CloseIcon from "@mui/icons-material/Close";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import MessageIcon from "@mui/icons-material/Message";
// import SendIcon from "@mui/icons-material/Send";
// import ErrorIcon from "@mui/icons-material/Error";
// import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
// import LightbulbIcon from "@mui/icons-material/Lightbulb";
// import BugReportIcon from "@mui/icons-material/BugReport";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import ChatIcon from "@mui/icons-material/Chat";

// // Contact Modal Component
// interface ContactModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   darkMode: boolean;
// }

// const ContactModal = ({ isOpen, onClose, darkMode }: ContactModalProps) => {
//   const { language } = useLanguage();

//   const t = (key: string): string => {
//     const translations: Record<string, Record<string, string>> = {
//       title: {
//         en: "Contact Support",
//         rw: "Twandikire ku Bufasha",
//         fr: "Contacter le Support",
//       },
//       subtitle: {
//         en: "We're here to help you learn and solve problems!",
//         rw: "Duhari kugira ngo tugufashe kwiga no gukemura ibibazo!",
//         fr: "Nous sommes là pour vous aider à apprendre et résoudre des problèmes!",
//       },
//       name: { en: "Full Name", rw: "Izina ryuzuye", fr: "Nom Complet" },
//       email: { en: "Email", rw: "Email", fr: "Email" },
//       phone: { en: "Phone Number", rw: "Telefone", fr: "Numéro de Téléphone" },
//       message: { en: "Message", rw: "Ubutumwa", fr: "Message" },
//       messagePlaceholder: {
//         en: "Describe your problem or question...",
//         rw: "Sobanura ikibazo cyangwa ikibazo cyawe...",
//         fr: "Décrivez votre problème ou question...",
//       },
//       send: {
//         en: "Send Message",
//         rw: "Tuma Ubutumwa",
//         fr: "Envoyer le Message",
//       },
//       success: {
//         en: "Message sent! We'll help you soon.",
//         rw: "Ubutumwa bwatumwe! Tuzagufasha vuba.",
//         fr: "Message envoyé! Nous vous aiderons bientôt.",
//       },
//       error: {
//         en: "Failed to send. Please try again.",
//         rw: "Ntabwo bwatumwe. Ongera ugerageze.",
//         fr: "Échec de l'envoi. Veuillez réessayer.",
//       },
//     };
//     return translations[key]?.[language] || translations[key]?.["en"] || key;
//   };

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState<Record<string, string | undefined>>({});
//   const [touched, setTouched] = useState({
//     name: false,
//     email: false,
//     phone: false,
//     message: false,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   const validateField = (field: string, value: string): boolean => {
//     switch (field) {
//       case "name":
//         if (!value || value.length < 2) {
//           setErrors((prev) => ({ ...prev, name: t("name") + " required" }));
//           return false;
//         }
//         setErrors((prev) => ({ ...prev, name: undefined }));
//         return true;
//       case "email":
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!value || !emailRegex.test(value)) {
//           setErrors((prev) => ({ ...prev, email: "Valid email required" }));
//           return false;
//         }
//         setErrors((prev) => ({ ...prev, email: undefined }));
//         return true;
//       case "phone":
//         const phoneRegex = /^[0-9]{10}$/;
//         if (!value || !phoneRegex.test(value)) {
//           setErrors((prev) => ({ ...prev, phone: "10 digits required" }));
//           return false;
//         }
//         setErrors((prev) => ({ ...prev, phone: undefined }));
//         return true;
//       case "message":
//         if (!value || value.length < 10) {
//           setErrors((prev) => ({ ...prev, message: "Message too short" }));
//           return false;
//         }
//         setErrors((prev) => ({ ...prev, message: undefined }));
//         return true;
//       default:
//         return true;
//     }
//   };

//   const handleChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (touched[field as keyof typeof touched]) validateField(field, value);
//   };

//   const handleBlur = (field: string) => {
//     setTouched((prev) => ({ ...prev, [field]: true }));
//     validateField(field, formData[field as keyof typeof formData]);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const allTouched = { name: true, email: true, phone: true, message: true };
//     setTouched(allTouched);
//     const isValid = Object.keys(allTouched).every((field) =>
//       validateField(field, formData[field as keyof typeof formData]),
//     );
//     if (isValid) {
//       setIsSubmitting(true);
//       setSubmitStatus(null);
//       try {
//         await axios.post("https://your-api.com/api/contact", formData);
//         setSubmitStatus({ type: "success", message: t("success") });
//         setFormData({ name: "", email: "", phone: "", message: "" });
//         setTimeout(() => {
//           onClose();
//           setSubmitStatus(null);
//         }, 2000);
//       } catch (error) {
//         setSubmitStatus({ type: "error", message: t("error") });
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-lg max-h-[90vh] overflow-y-auto"
//           >
//             <div
//               className={`rounded-2xl shadow-2xl overflow-hidden ${darkMode ? "bg-gray-900" : "bg-white"}`}
//             >
//               <div
//                 className={`p-6 border-b ${darkMode ? "border-gray-800" : "border-gray-100"} bg-gradient-to-r from-primary-600 to-purple-600`}
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="text-2xl font-bold text-white">
//                       {t("title")}
//                     </h2>
//                     <p className="text-sm text-white/80 mt-1">
//                       {t("subtitle")}
//                     </p>
//                   </div>
//                   <button
//                     onClick={onClose}
//                     className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
//                   >
//                     <CloseIcon className="text-white" />
//                   </button>
//                 </div>
//               </div>
//               <form onSubmit={handleSubmit} className="p-6 space-y-5">
//                 <div>
//                   <label
//                     className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
//                   >
//                     {t("name")} *
//                   </label>
//                   <div className="relative">
//                     <PersonIcon
//                       className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm ${touched.name && errors.name ? "text-red-500" : darkMode ? "text-gray-500" : "text-gray-400"}`}
//                     />
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) => handleChange("name", e.target.value)}
//                       onBlur={() => handleBlur("name")}
//                       className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${darkMode ? "border-gray-700 bg-gray-800 text-white focus:ring-primary-500/20" : "border-gray-300 bg-white text-gray-900 focus:ring-primary-500/20"}`}
//                       placeholder="Jean Paul Mukasanga"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label
//                     className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
//                   >
//                     {t("email")} *
//                   </label>
//                   <div className="relative">
//                     <EmailIcon
//                       className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm ${touched.email && errors.email ? "text-red-500" : darkMode ? "text-gray-500" : "text-gray-400"}`}
//                     />
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => handleChange("email", e.target.value)}
//                       onBlur={() => handleBlur("email")}
//                       className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${darkMode ? "border-gray-700 bg-gray-800 text-white focus:ring-primary-500/20" : "border-gray-300 bg-white text-gray-900 focus:ring-primary-500/20"}`}
//                       placeholder="jean@example.com"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label
//                     className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
//                   >
//                     {t("phone")} *
//                   </label>
//                   <div className="relative">
//                     <PhoneIcon
//                       className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm ${touched.phone && errors.phone ? "text-red-500" : darkMode ? "text-gray-500" : "text-gray-400"}`}
//                     />
//                     <input
//                       type="tel"
//                       value={formData.phone}
//                       onChange={(e) => handleChange("phone", e.target.value)}
//                       onBlur={() => handleBlur("phone")}
//                       className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${darkMode ? "border-gray-700 bg-gray-800 text-white focus:ring-primary-500/20" : "border-gray-300 bg-white text-gray-900 focus:ring-primary-500/20"}`}
//                       placeholder="0788123456"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label
//                     className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
//                   >
//                     {t("message")} *
//                   </label>
//                   <div className="relative">
//                     <MessageIcon
//                       className={`absolute left-3 top-3 text-sm ${touched.message && errors.message ? "text-red-500" : darkMode ? "text-gray-500" : "text-gray-400"}`}
//                     />
//                     <textarea
//                       value={formData.message}
//                       onChange={(e) => handleChange("message", e.target.value)}
//                       onBlur={() => handleBlur("message")}
//                       rows={4}
//                       className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-all duration-200 outline-none focus:ring-2 resize-none ${darkMode ? "border-gray-700 bg-gray-800 text-white focus:ring-primary-500/20" : "border-gray-300 bg-white text-gray-900 focus:ring-primary-500/20"}`}
//                       placeholder={t("messagePlaceholder")}
//                     />
//                   </div>
//                 </div>
//                 {submitStatus && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className={`p-3 rounded-xl ${submitStatus.type === "success" ? "bg-green-50 dark:bg-green-900/20 text-green-700" : "bg-red-50 dark:bg-red-900/20 text-red-700"}`}
//                   >
//                     {submitStatus.message}
//                   </motion.div>
//                 )}
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   ) : (
//                     <>
//                       <SendIcon className="text-sm" />
//                       {t("send")}
//                     </>
//                   )}
//                 </motion.button>
//               </form>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Service Card Component
// const ServiceCard = ({
//   service,
//   index,
//   darkMode,
//   onLearnMore,
// }: {
//   service: any;
//   index: number;
//   darkMode: boolean;
//   onLearnMore: () => void;
// }) => {
//   const { language } = useLanguage();
//   const getFreeText = () => {
//     if (language === "en") return "FREE";
//     if (language === "fr") return "GRATUIT";
//     return "UBUNTU";
//   };
//   const getAccessText = () => {
//     if (language === "en") return "Access";
//     if (language === "fr") return "Accès";
//     return "Uko Uboneka";
//   };
//   const getLearnMoreText = () => {
//     if (language === "en") return "Learn More";
//     if (language === "fr") return "En Savoir Plus";
//     return "Soma Birenze";
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1, duration: 0.5 }}
//       whileHover={{ y: -8 }}
//       className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${service.popular ? `ring-2 ring-primary-500 shadow-2xl ${darkMode ? "bg-gray-800" : "bg-white"}` : `${darkMode ? "bg-gray-800/50" : "bg-white"} shadow-lg`}`}
//     >
//       {service.popular && (
//         <div className="absolute top-0 right-0">
//           <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
//             {getFreeText()}
//           </div>
//         </div>
//       )}
//       <div className="p-6">
//         <div
//           className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${darkMode ? "bg-primary-900/30" : "bg-primary-50"}`}
//         >
//           <div
//             className={`text-3xl ${darkMode ? "text-primary-400" : "text-primary-600"}`}
//           >
//             {service.icon}
//           </div>
//         </div>
//         <h3
//           className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
//         >
//           {service.title}
//         </h3>
//         <p
//           className={`text-sm mb-4 line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
//         >
//           {service.description}
//         </p>
//         <div
//           className={`flex items-center justify-between mt-4 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}
//         >
//           <div>
//             <p
//               className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}
//             >
//               {getAccessText()}
//             </p>
//             <p
//               className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
//             >
//               {service.price}
//             </p>
//           </div>
//           <button
//             onClick={onLearnMore}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
//           >
//             {getLearnMoreText()}
//             <ArrowForwardIcon className="text-sm" />
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Category Filter Component
// const CategoryFilter = ({
//   activeCategory,
//   onCategoryChange,
//   darkMode,
// }: {
//   activeCategory: string;
//   onCategoryChange: (category: string) => void;
//   darkMode: boolean;
// }) => {
//   const { language } = useLanguage();
//   const categories = [
//     {
//       id: "all",
//       labelEn: "All Tools",
//       labelRw: "Ibikoresho Byose",
//       labelFr: "Tous les Outils",
//     },
//     {
//       id: "testing",
//       labelEn: "Skill Tests",
//       labelRw: "Kugerageza Ubumenyi",
//       labelFr: "Tests de Compétences",
//     },
//     {
//       id: "tutor",
//       labelEn: "AI Tutor",
//       labelRw: "Umurezi wa AI",
//       labelFr: "Tuteur IA",
//     },
//   ];
//   const getLabel = (cat: (typeof categories)[0]) => {
//     if (language === "en") return cat.labelEn;
//     if (language === "fr") return cat.labelFr;
//     return cat.labelRw;
//   };

//   return (
//     <div className="flex flex-wrap justify-center gap-3 mb-12">
//       {categories.map((category) => (
//         <button
//           key={category.id}
//           onClick={() => onCategoryChange(category.id)}
//           className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id ? "bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg shadow-primary-500/25" : darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
//         >
//           {getLabel(category)}
//         </button>
//       ))}
//     </div>
//   );
// };

// // Services Data - Focused on Self Skill Testing & AI Tutor
// const getServices = (language: string): any[] => [
//   {
//     id: 1,
//     icon: <AssessmentIcon />,
//     title:
//       language === "en"
//         ? "Generate Tests & Quizzes"
//         : language === "fr"
//           ? "Générer des Tests & Quiz"
//           : "Kora Ibizamini n'Ibibazo",
//     description:
//       language === "en"
//         ? "Test your knowledge by generating personalized tests and quizzes on any topic. Get instant results and feedback to identify areas for improvement."
//         : language === "fr"
//           ? "Testez vos connaissances en générant des tests et quiz personnalisés sur n'importe quel sujet. Obtenez des résultats et commentaires instantanés."
//           : "Gerageza ubumenyi bwawe ukoresheje ibizamini n'ibibazo byihariye kuri buri mutwe. Habona ibisubizo ako kanya kugira ngo umenye ibyo ukwiye gukora.",
//     features: [
//       language === "en"
//         ? "📝 Generate custom tests on any topic"
//         : language === "fr"
//           ? "📝 Générer des tests personnalisés sur n'importe quel sujet"
//           : "📝 Kora ibizamini byihariye kuri buri mutwe",
//       language === "en"
//         ? "🎯 Multiple difficulty levels"
//         : language === "fr"
//           ? "🎯 Plusieurs niveaux de difficulté"
//           : "🎯 Urwego rutandukanye rw'ubugoye",
//       language === "en"
//         ? "⚡ Instant scoring and feedback"
//         : language === "fr"
//           ? "⚡ Notation et commentaires instantanés"
//           : "⚡ Amanota n'ibisubizo ako kanya",
//       language === "en"
//         ? "📊 Track your progress over time"
//         : language === "fr"
//           ? "📊 Suivez vos progrès dans le temps"
//           : "📊 Kurikirana ibyagezweho mugihe",
//       language === "en"
//         ? "🔄 Retake tests to improve scores"
//         : language === "fr"
//           ? "🔄 Repasser les tests pour améliorer les scores"
//           : "🔄 Ongera ukore ibizamini kugira ngo uteze imbere",
//     ],
//     price:
//       language === "en" ? "Free" : language === "fr" ? "Gratuit" : "Ubuntu",
//     category: "testing",
//     popular: true,
//   },
//   {
//     id: 2,
//     icon: <ChatIcon />,
//     title:
//       language === "en"
//         ? "AI Tutor Assistant"
//         : language === "fr"
//           ? "Assistant Tuteur IA"
//           : "Umurezi wa AI",
//     description:
//       language === "en"
//         ? "Get help understanding difficult concepts. Ask questions in Kinyarwanda, English, or French and get instant explanations."
//         : language === "fr"
//           ? "Obtenez de l'aide pour comprendre les concepts difficiles. Posez des questions en Kinyarwanda, anglais ou français et obtenez des explications instantanées."
//           : "Habona ubufasha bwo gusobanukirwa ibintu bigoye. Baza ibibazo mu Kinyarwanda, Icyongereza, cyangwa Igifaransa ukabona ibisobanuro ako kanya.",
//     features: [
//       language === "en"
//         ? "💬 24/7 AI tutor available"
//         : language === "fr"
//           ? "💬 Tuteur IA disponible 24/7"
//           : "💬 Umurezi wa AI uboneka buri gihe",
//       language === "en"
//         ? "🌍 Supports Kinyarwanda, English & French"
//         : language === "fr"
//           ? "🌍 Supporte Kinyarwanda, Anglais & Français"
//           : "🌙 Ukoresha Kinyarwanda, Icyongereza n'Igifaransa",
//       language === "en"
//         ? "📖 Explain complex concepts simply"
//         : language === "fr"
//           ? "📖 Explique les concepts complexes simplement"
//           : "📖 Gusobanura ibintu bigoye mu buryo bworoshye",
//       language === "en"
//         ? "🔍 Help find solutions to problems"
//         : language === "fr"
//           ? "🔍 Aide à trouver des solutions aux problèmes"
//           : "🔍 Gufasha gushakira ibisubizo ibibazo",
//       language === "en"
//         ? "🎓 Personalized learning guidance"
//         : language === "fr"
//           ? "🎓 Orientation d'apprentissage personnalisée"
//           : "🎓 Inama zo kwiga zihuje n'ubushobozi",
//     ],
//     price:
//       language === "en" ? "Free" : language === "fr" ? "Gratuit" : "Ubuntu",
//     category: "tutor",
//     popular: true,
//   },
//   {
//     id: 3,
//     icon: <QuizIcon />,
//     title:
//       language === "en"
//         ? "Quick Quiz Generator"
//         : language === "fr"
//           ? "Générateur de Quiz Rapide"
//           : "Kurema Ibibazo Vuba",
//     description:
//       language === "en"
//         ? "Generate quizzes on any topic in seconds. Perfect for self-assessment and exam preparation."
//         : language === "fr"
//           ? "Générez des quiz sur n'importe quel sujet en quelques secondes. Parfait pour l'auto-évaluation et la préparation aux examens."
//           : "Kora ibibazo kuri buri mutwe mu masegonda make. Byiza mu kwipimisha no kwitegura ibizamini.",
//     features: [
//       language === "en"
//         ? "⚡ Generate quizzes in seconds"
//         : language === "fr"
//           ? "⚡ Générer des quiz en quelques secondes"
//           : "⚡ Kora ibibazo mu masegonda make",
//       language === "en"
//         ? "📚 Any topic supported"
//         : language === "fr"
//           ? "📚 N'importe quel sujet supporté"
//           : "📚 Umtwe wose urashoboka",
//       language === "en"
//         ? "🎯 Multiple question types"
//         : language === "fr"
//           ? "🎯 Types de questions multiples"
//           : "🎯 Ubwoko butandukanye bw'ibibazo",
//       language === "en"
//         ? "📝 Automatic grading"
//         : language === "fr"
//           ? "📝 Notation automatique"
//           : "📝 Amanota akora automatic",
//       language === "en"
//         ? "💡 Detailed explanations"
//         : language === "fr"
//           ? "💡 Explications détaillées"
//           : "💡 Ibisobanuro birambuye",
//     ],
//     price:
//       language === "en" ? "Free" : language === "fr" ? "Gratuit" : "Ubuntu",
//     category: "testing",
//   },
//   {
//     id: 4,
//     icon: <PsychologyIcon />,
//     title:
//       language === "en"
//         ? "Concept Explainer"
//         : language === "fr"
//           ? "Explicateur de Concepts"
//           : "Gusobanura Ibintu",
//     description:
//       language === "en"
//         ? "Stuck on a concept? Get simple, clear explanations in your preferred language."
//         : language === "fr"
//           ? "Bloqué sur un concept? Obtenez des explications simples et claires dans votre langue préférée."
//           : "Uratewe n'ikintu? Habona ibisobanuro byoroshye, bisobanutse mu rurimi ukunda.",
//     features: [
//       language === "en"
//         ? "🔍 Break down complex topics"
//         : language === "fr"
//           ? "🔍 Décomposer les sujets complexes"
//           : "🔍 Gusobanura ibintu bigoye",
//       language === "en"
//         ? "📖 Simple, clear explanations"
//         : language === "fr"
//           ? "📖 Explications simples et claires"
//           : "📖 Ibisobanuro byoroshye kandi bisobanutse",
//       language === "en"
//         ? "🌍 Multi-language support"
//         : language === "fr"
//           ? "🌍 Support multilingue"
//           : "🌍 Ubusobanuro mu ndimi nyinshi",
//       language === "en"
//         ? "💡 Examples and use cases"
//         : language === "fr"
//           ? "💡 Exemples et cas d'utilisation"
//           : "💡 Ingero n'ibikorwa",
//       language === "en"
//         ? "🎯 Learn at your own pace"
//         : language === "fr"
//           ? "🎯 Apprenez à votre rythme"
//           : "🎯 Wiga uko ubishaka",
//     ],
//     price:
//       language === "en" ? "Free" : language === "fr" ? "Gratuit" : "Ubuntu",
//     category: "tutor",
//   },
//   {
//     id: 5,
//     icon: <AnalyticsIcon />,
//     title:
//       language === "en"
//         ? "Progress Tracking"
//         : language === "fr"
//           ? "Suivi des Progrès"
//           : "Kurikirana Ibyagezweho",
//     description:
//       language === "en"
//         ? "Track your test scores, identify strengths and weaknesses, and see your improvement over time."
//         : language === "fr"
//           ? "Suivez vos résultats aux tests, identifiez vos forces et faiblesses, et voyez vos progrès dans le temps."
//           : "Kurikirana amanota yawe mu bizamini, menya ibyo wishoboye n'ibyo udakizi, kandi ube ubona iterambere ryawe mugihe.",
//     features: [
//       language === "en"
//         ? "📊 Track all your test scores"
//         : language === "fr"
//           ? "📊 Suivre tous vos résultats de tests"
//           : "📊 Kurikirana amanota yawe yose",
//       language === "en"
//         ? "📈 See improvement over time"
//         : language === "fr"
//           ? "📈 Voir les progrès dans le temps"
//           : "📈 Kureba iterambere mugihe",
//       language === "en"
//         ? "🎯 Identify weak areas"
//         : language === "fr"
//           ? "🎯 Identifier les points faibles"
//           : "🎯 Kumenya ibyo udakizi",
//       language === "en"
//         ? "💪 Track your strengths"
//         : language === "fr"
//           ? "💪 Suivre vos forces"
//           : "💪 Kumenya ibyo wishoboye",
//       language === "en"
//         ? "📅 Daily/weekly performance"
//         : language === "fr"
//           ? "📅 Performance quotidienne/hebdomadaire"
//           : "📅 Ibyo wakoze buri munsi/icyumweru",
//     ],
//     price:
//       language === "en" ? "Free" : language === "fr" ? "Gratuit" : "Ubuntu",
//     category: "testing",
//   },
//   {
//     id: 6,
//     icon: <SupportAgentIcon />,
//     title:
//       language === "en"
//         ? "Help & Support"
//         : language === "fr"
//           ? "Aide & Support"
//           : "Ubufasha",
//     description:
//       language === "en"
//         ? "Stuck with a problem? Contact our support team for help finding solutions."
//         : language === "fr"
//           ? "Bloqué avec un problème? Contactez notre équipe de support pour obtenir de l'aide."
//           : "Ufite ikibazo? Wandikire itego ryacu ubufasha kugira ngo ugire igisubizo.",
//     features: [
//       language === "en"
//         ? "💬 Get help with problems"
//         : language === "fr"
//           ? "💬 Obtenir de l'aide avec les problèmes"
//           : "💬 Kubona ubufasha kubibazo",
//       language === "en"
//         ? "📧 Email support"
//         : language === "fr"
//           ? "📧 Support par email"
//           : "📧 Ubufasha bwo kuri email",
//       language === "en"
//         ? "📞 Phone support"
//         : language === "fr"
//           ? "📞 Support téléphonique"
//           : "📞 Ubufasha bwo kuri telefone",
//       language === "en"
//         ? "🌍 Multi-language support"
//         : language === "fr"
//           ? "🌍 Support multilingue"
//           : "🌍 Ubufasha mu ndimi nyinshi",
//       language === "en"
//         ? "⏱️ Quick response time"
//         : language === "fr"
//           ? "⏱️ Temps de réponse rapide"
//           : "⏱️ Gusubiza vuba",
//     ],
//     price:
//       language === "en" ? "Free" : language === "fr" ? "Gratuit" : "Ubuntu",
//     category: "all",
//   },
// ];

// // Main Services Component
// export const Services = () => {
//   const { darkMode } = useDarkMode();
//   const { language } = useLanguage();
//   const [selectedService, setSelectedService] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//   const [activeCategory, setActiveCategory] = useState("all");

//   const t = (key: string): string => {
//     const translations: Record<string, Record<string, string>> = {
//       freeServices: {
//         en: "Free Learning Tools",
//         rw: "Ibikoresho byo Kwiga ku Buntu",
//         fr: "Outils d'Apprentissage Gratuits",
//       },
//       title: {
//         en: "Test Your Skills & Get Help",
//         rw: "Gerageza Ubumenyi Bwawe & Shakisha Ubufasha",
//         fr: "Testez Vos Compétences & Obtenez de l'Aide",
//       },
//       subtitle: {
//         en: "Generate tests and quizzes to assess yourself. Use the AI tutor to understand concepts and find solutions to your problems. All free, no registration needed!",
//         rw: "Kora ibizamini n'ibibazo kugira ngo wipime. Koresha umurezi wa AI kugira ngo usobanukirwe ibintu n'ibisubizo by'ibibazo byawe. Byose ku buntu, nta kwiyandikisha!",
//         fr: "Générez des tests et quiz pour vous évaluer. Utilisez le tuteur IA pour comprendre les concepts et trouver des solutions à vos problèmes. Tout gratuit, aucune inscription requise!",
//       },
//       freeBanner: {
//         en: "✅ Self skill testing • AI Tutor • No registration • 100% Free",
//         rw: "✅ Kwipima ubumenyi • Umurezi wa AI • Nta kwiyandikisha • 100% Ubuntu",
//         fr: "✅ Auto-évaluation • Tuteur IA • Aucune inscription • 100% Gratuit",
//       },
//       readyTitle: {
//         en: "Ready to Test Your Skills?",
//         rw: "Uriteguye Kugerageza Ubumenyi Bwawe?",
//         fr: "Prêt à Tester Vos Compétences?",
//       },
//       readyText: {
//         en: "Generate a test, talk to the AI tutor, or ask for help. Start learning now!",
//         rw: "Kora ikizamini, vagisha umurezi wa AI, cyangwa usabe ubufasha. Tangira kwiga ubu!",
//         fr: "Générez un test, parlez au tuteur IA, ou demandez de l'aide. Commencez à apprendre maintenant!",
//       },
//       takeTest: {
//         en: "Take a Test",
//         rw: "Kora Ikizamini",
//         fr: "Faire un Test",
//       },
//       talkToTutor: {
//         en: "Talk to AI Tutor",
//         rw: "Vagisha Umurezi wa AI",
//         fr: "Parler au Tuteur IA",
//       },
//       needHelp: {
//         en: "Need Help?",
//         rw: "Ukeneye Ubufasha?",
//         fr: "Besoin d'Aide?",
//       },
//       noServices: {
//         en: "No tools found.",
//         rw: "Nta bikoresho byanditse.",
//         fr: "Aucun outil trouvé.",
//       },
//     };
//     return translations[key]?.[language] || translations[key]?.["en"] || key;
//   };

//   const services = getServices(language);
//   const filteredServices =
//     activeCategory === "all"
//       ? services
//       : services.filter((service) => service.category === activeCategory);
//   const handleLearnMore = (service: any) => {
//     setSelectedService(service);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen overflow-hidden">
//       <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24">
//         <div className="absolute inset-0 z-0">
//           <div
//             className={`absolute inset-0 transition-all duration-500 ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-900 to-primary-900/20" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}
//           />
//           <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
//           <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
//         </div>
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-primary-500/10 border border-purple-500/20 mb-6"
//             >
//               <AutoAwesomeIcon className="text-purple-500 text-sm" />
//               <span
//                 className={`text-xs font-medium ${darkMode ? "text-purple-400" : "text-purple-600"}`}
//               >
//                 {t("freeServices")}
//               </span>
//             </motion.div>
//             <motion.h1
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
//             >
//               {t("title")}
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className={`text-lg lg:text-xl max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//             >
//               {t("subtitle")}
//             </motion.p>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30"
//             >
//               <CheckCircleIcon className="text-green-500 text-sm" />
//               <span
//                 className={`text-sm font-medium ${darkMode ? "text-green-400" : "text-green-600"}`}
//               >
//                 {t("freeBanner")}
//               </span>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <CategoryFilter
//             activeCategory={activeCategory}
//             onCategoryChange={setActiveCategory}
//             darkMode={darkMode}
//           />
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredServices.map((service, index) => (
//               <ServiceCard
//                 key={service.id}
//                 service={service}
//                 index={index}
//                 darkMode={darkMode}
//                 onLearnMore={() => handleLearnMore(service)}
//               />
//             ))}
//           </div>
//           {filteredServices.length === 0 && (
//             <div
//               className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//             >
//               {t("noServices")}
//             </div>
//           )}
//         </div>
//       </section>

//       <section className="py-16">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`p-8 rounded-2xl text-center ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-primary-50 to-purple-50"}`}
//           >
//             <h2
//               className={`text-2xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
//             >
//               {t("readyTitle")}
//             </h2>
//             <p
//               className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
//             >
//               {t("readyText")}
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setActiveCategory("testing")}
//                 className="px-6 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-medium"
//               >
//                 {t("takeTest")}
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setActiveCategory("tutor")}
//                 className={`px-6 py-2 rounded-lg font-medium ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`}
//               >
//                 {t("talkToTutor")}
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsContactModalOpen(true)}
//                 className={`px-6 py-2 rounded-lg font-medium ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`}
//               >
//                 {t("needHelp")}
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <ServiceDetailModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         service={selectedService}
//         darkMode={darkMode}
//       />
//     </div>
//   );
// };

// // Service Detail Modal Component
// const ServiceDetailModal = ({ isOpen, onClose, service, darkMode }: any) => {
//   const { language } = useLanguage();
//   const t = (key: string): string => {
//     const translations: Record<string, Record<string, string>> = {
//       features: { en: "Features", rw: "Ibiranga", fr: "Fonctionnalités" },
//       access: { en: "Access", rw: "Uko Uboneka", fr: "Accès" },
//       noRegistration: {
//         en: "No registration required",
//         rw: "Nta kwiyandikisha birakenewe",
//         fr: "Aucune inscription requise",
//       },
//       close: { en: "Close", rw: "Funga", fr: "Fermer" },
//     };
//     return translations[key]?.[language] || translations[key]?.["en"] || key;
//   };
//   if (!isOpen || !service) return null;
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto"
//           >
//             <div
//               className={`rounded-2xl shadow-2xl overflow-hidden ${darkMode ? "bg-gray-900" : "bg-white"}`}
//             >
//               <div
//                 className={`p-6 border-b ${darkMode ? "border-gray-800" : "border-gray-100"} bg-gradient-to-r from-primary-600 to-purple-600`}
//               >
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-white/20 rounded-xl text-white">
//                       {service.icon}
//                     </div>
//                     <h2 className="text-2xl font-bold text-white">
//                       {service.title}
//                     </h2>
//                   </div>
//                   <button
//                     onClick={onClose}
//                     className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
//                   >
//                     <CloseIcon className="text-white" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <p
//                   className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//                 >
//                   {service.description}
//                 </p>
//                 <h3
//                   className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
//                 >
//                   {t("features")}
//                 </h3>
//                 <div className="space-y-3 mb-6">
//                   {service.features.map((feature: string, idx: number) => (
//                     <div key={idx} className="flex items-start gap-3">
//                       <CheckCircleIcon className="text-green-500 text-sm mt-0.5 flex-shrink-0" />
//                       <span
//                         className={darkMode ? "text-gray-300" : "text-gray-700"}
//                       >
//                         {feature}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <div
//                   className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p
//                         className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                       >
//                         {t("access")}
//                       </p>
//                       <p
//                         className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
//                       >
//                         {service.price}
//                       </p>
//                       <p
//                         className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} mt-1`}
//                       >
//                         {t("noRegistration")}
//                       </p>
//                     </div>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={onClose}
//                       className="px-6 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-medium"
//                     >
//                       {t("close")}
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode, useLanguage } from "../../App";
import PsychologyIcon from "@mui/icons-material/Psychology";
import QuizIcon from "@mui/icons-material/Quiz";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ChatIcon from "@mui/icons-material/Chat";

// Service Card Component
const ServiceCard = ({
  service,
  index,
  darkMode,
  onLearnMore,
}: {
  service: any;
  index: number;
  darkMode: boolean;
  onLearnMore: () => void;
}) => {
  const { language } = useLanguage();
  const getFreeText = () => {
    if (language === "en") return "FREE";
    if (language === "fr") return "GRATUIT";
    return "UBUNTU";
  };
  const getAccessText = () => {
    if (language === "en") return "Access";
    if (language === "fr") return "Accès";
    return "Uko Uboneka";
  };
  const getLearnMoreText = () => {
    if (language === "en") return "Learn More";
    if (language === "fr") return "En Savoir Plus";
    return "Soma Birenze";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${service.popular ? `ring-2 ring-primary-500 shadow-2xl ${darkMode ? "bg-gray-800" : "bg-white"}` : `${darkMode ? "bg-gray-800/50" : "bg-white"} shadow-lg`}`}
    >
      {service.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            {getFreeText()}
          </div>
        </div>
      )}
      <div className="p-6">
        <div
          className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${darkMode ? "bg-primary-900/30" : "bg-primary-50"}`}
        >
          <div
            className={`text-3xl ${darkMode ? "text-primary-400" : "text-primary-600"}`}
          >
            {service.icon}
          </div>
        </div>
        <h3
          className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          {service.title}
        </h3>
        <p
          className={`text-sm mb-4 line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {service.description}
        </p>
        <div
          className={`flex items-center justify-between mt-4 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}
        >
          <div>
            <p
              className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}
            >
              {getAccessText()}
            </p>
            <p
              className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {service.price}
            </p>
          </div>
          <button
            onClick={onLearnMore}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {getLearnMoreText()}
            <ArrowForwardIcon className="text-sm" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Category Filter Component
const CategoryFilter = ({
  activeCategory,
  onCategoryChange,
  darkMode,
}: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  darkMode: boolean;
}) => {
  const { language } = useLanguage();
  const categories = [
    {
      id: "all",
      labelEn: "All Tools",
      labelRw: "Ibikoresho Byose",
      labelFr: "Tous les Outils",
    },
    {
      id: "testing",
      labelEn: "Skill Tests",
      labelRw: "Kugerageza Ubumenyi",
      labelFr: "Tests de Compétences",
    },
    {
      id: "tutor",
      labelEn: "AI Tutor",
      labelRw: "Umurezi wa AI",
      labelFr: "Tuteur IA",
    },
  ];
  const getLabel = (cat: (typeof categories)[0]) => {
    if (language === "en") return cat.labelEn;
    if (language === "fr") return cat.labelFr;
    return cat.labelRw;
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id ? "bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg shadow-primary-500/25" : darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          {getLabel(category)}
        </button>
      ))}
    </div>
  );
};

// Services Data - Focused on Self Skill Testing & AI Tutor
const getServices = (language: string): any[] => [
  {
    id: 1,
    icon: <AssessmentIcon />,
    title:
      language === "en"
        ? "Generate Tests & Quizzes"
        : language === "fr"
          ? "Générer des Tests & Quiz"
          : "Kora Ibizamini n'Ibibazo",
    description:
      language === "en"
        ? "Test your knowledge by generating personalized tests and quizzes on any topic. Get instant results and feedback to identify areas for improvement."
        : language === "fr"
          ? "Testez vos connaissances en générant des tests et quiz personnalisés sur n'importe quel sujet. Obtenez des résultats et commentaires instantanés."
          : "Gerageza ubumenyi bwawe ukoresheje ibizamini n'ibibazo byihariye kuri buri mutwe. Habona ibisubizo ako kanya kugira ngo umenye ibyo ukwiye gukora.",
    features: [
      language === "en"
        ? "📝 Generate custom tests on any topic"
        : language === "fr"
          ? "📝 Générer des tests personnalisés sur n'importe quel sujet"
          : "📝 Kora ibizamini byihariye kuri buri mutwe",
      language === "en"
        ? "🎯 Multiple difficulty levels"
        : language === "fr"
          ? "🎯 Plusieurs niveaux de difficulté"
          : "🎯 Urwego rutandukanye rw'ubugoye",
      language === "en"
        ? "⚡ Instant scoring and feedback"
        : language === "fr"
          ? "⚡ Notation et commentaires instantanés"
          : "⚡ Amanota n'ibisubizo ako kanya",
      language === "en"
        ? "📊 Track your progress over time"
        : language === "fr"
          ? "📊 Suivez vos progrès dans le temps"
          : "📊 Kurikirana ibyagezweho mugihe",
      language === "en"
        ? "🔄 Retake tests to improve scores"
        : language === "fr"
          ? "🔄 Repasser les tests pour améliorer les scores"
          : "🔄 Ongera ukore ibizamini kugira ngo uteze imbere",
    ],
    price:
      language === "en" ? "Free" : language === "fr" ? "Gratuit" : "Ubuntu",
    category: "testing",
    popular: true,
  },
  {
    id: 2,
    icon: <ChatIcon />,
    title:
      language === "en"
        ? "AI Tutor Assistant"
        : language === "fr"
          ? "Assistant Tuteur IA"
          : "Umurezi wa AI",
    description:
      language === "en"
        ? "Get help understanding difficult concepts. Ask questions in Kinyarwanda, English, or French and get instant explanations."
        : language === "fr"
          ? "Obtenez de l'aide pour comprendre les concepts difficiles. Posez des questions en Kinyarwanda, anglais ou français et obtenez des explications instantanées."
          : "Habona ubufasha bwo gusobanukirwa ibintu bigoye. Baza ibibazo mu Kinyarwanda, Icyongereza, cyangwa Igifaransa ukabona ibisobanuro ako kanya.",
    features: [
      language === "en"
        ? "💬 24/7 AI tutor available"
        : language === "fr"
          ? "💬 Tuteur IA disponible 24/7"
          : "💬 Umurezi wa AI uboneka buri gihe",
      language === "en"
        ? "🌍 Supports Kinyarwanda, English & French"
        : language === "fr"
          ? "🌍 Supporte Kinyarwanda, Anglais & Français"
          : "🌙 Ukoresha Kinyarwanda, Icyongereza n'Igifaransa",
      language === "en"
        ? "📖 Explain complex concepts simply"
        : language === "fr"
          ? "📖 Explique les concepts complexes simplement"
          : "📖 Gusobanura ibintu bigoye mu buryo bworoshye",
      language === "en"
        ? "🔍 Help find solutions to problems"
        : language === "fr"
          ? "🔍 Aide à trouver des solutions aux problèmes"
          : "🔍 Gufasha gushakira ibisubizo ibibazo",
      language === "en"
        ? "🎓 Personalized learning guidance"
        : language === "fr"
          ? "🎓 Orientation d'apprentissage personnalisée"
          : "🎓 Inama zo kwiga zihuje n'ubushobozi",
    ],
    price:
      language === "en" ? "Free" : language === "fr" ? "Gratuit" : "Ubuntu",
    category: "tutor",
    popular: true,
  },
  {
    id: 3,
    icon: <QuizIcon />,
    title:
      language === "en"
        ? "Quick Quiz Generator"
        : language === "fr"
          ? "Générateur de Quiz Rapide"
          : "Kurema Ibibazo Vuba",
    description:
      language === "en"
        ? "Generate quizzes on any topic in seconds. Perfect for self-assessment and exam preparation."
        : language === "fr"
          ? "Générez des quiz sur n'importe quel sujet en quelques secondes. Parfait pour l'auto-évaluation et la préparation aux examens."
          : "Kora ibibazo kuri buri mutwe mu masegonda make. Byiza mu kwipimisha no kwitegura ibizamini.",
    features: [
      language === "en"
        ? "⚡ Generate quizzes in seconds"
        : language === "fr"
          ? "⚡ Générer des quiz en quelques secondes"
          : "⚡ Kora ibibazo mu masegonda make",
      language === "en"
        ? "📚 Any topic supported"
        : language === "fr"
          ? "📚 N'importe quel sujet supporté"
          : "📚 Umtwe wose urashoboka",
      language === "en"
        ? "🎯 Multiple question types"
        : language === "fr"
          ? "🎯 Types de questions multiples"
          : "🎯 Ubwoko butandukanye bw'ibibazo",
      language === "en"
        ? "📝 Automatic grading"
        : language === "fr"
          ? "📝 Notation automatique"
          : "📝 Amanota akora automatic",
      language === "en"
        ? "💡 Detailed explanations"
        : language === "fr"
          ? "💡 Explications détaillées"
          : "💡 Ibisobanuro birambuye",
    ],
    price:
      language === "en" ? "Free" : language === "fr" ? "Gratuit" : "Ubuntu",
    category: "testing",
  },
  {
    id: 4,
    icon: <PsychologyIcon />,
    title:
      language === "en"
        ? "Concept Explainer"
        : language === "fr"
          ? "Explicateur de Concepts"
          : "Gusobanura Ibintu",
    description:
      language === "en"
        ? "Stuck on a concept? Get simple, clear explanations in your preferred language."
        : language === "fr"
          ? "Bloqué sur un concept? Obtenez des explications simples et claires dans votre langue préférée."
          : "Uratewe n'ikintu? Habona ibisobanuro byoroshye, bisobanutse mu rurimi ukunda.",
    features: [
      language === "en"
        ? "🔍 Break down complex topics"
        : language === "fr"
          ? "🔍 Décomposer les sujets complexes"
          : "🔍 Gusobanura ibintu bigoye",
      language === "en"
        ? "📖 Simple, clear explanations"
        : language === "fr"
          ? "📖 Explications simples et claires"
          : "📖 Ibisobanuro byoroshye kandi bisobanutse",
      language === "en"
        ? "🌍 Multi-language support"
        : language === "fr"
          ? "🌍 Support multilingue"
          : "🌍 Ubusobanuro mu ndimi nyinshi",
      language === "en"
        ? "💡 Examples and use cases"
        : language === "fr"
          ? "💡 Exemples et cas d'utilisation"
          : "💡 Ingero n'ibikorwa",
      language === "en"
        ? "🎯 Learn at your own pace"
        : language === "fr"
          ? "🎯 Apprenez à votre rythme"
          : "🎯 Wiga uko ubishaka",
    ],
    price:
      language === "en" ? "Free" : language === "fr" ? "Gratuit" : "Ubuntu",
    category: "tutor",
  },
  {
    id: 5,
    icon: <AnalyticsIcon />,
    title:
      language === "en"
        ? "Progress Tracking"
        : language === "fr"
          ? "Suivi des Progrès"
          : "Kurikirana Ibyagezweho",
    description:
      language === "en"
        ? "Track your test scores, identify strengths and weaknesses, and see your improvement over time."
        : language === "fr"
          ? "Suivez vos résultats aux tests, identifiez vos forces et faiblesses, et voyez vos progrès dans le temps."
          : "Kurikirana amanota yawe mu bizamini, menya ibyo wishoboye n'ibyo udakizi, kandi ube ubona iterambere ryawe mugihe.",
    features: [
      language === "en"
        ? "📊 Track all your test scores"
        : language === "fr"
          ? "📊 Suivre tous vos résultats de tests"
          : "📊 Kurikirana amanota yawe yose",
      language === "en"
        ? "📈 See improvement over time"
        : language === "fr"
          ? "📈 Voir les progrès dans le temps"
          : "📈 Kureba iterambere mugihe",
      language === "en"
        ? "🎯 Identify weak areas"
        : language === "fr"
          ? "🎯 Identifier les points faibles"
          : "🎯 Kumenya ibyo udakizi",
      language === "en"
        ? "💪 Track your strengths"
        : language === "fr"
          ? "💪 Suivre vos forces"
          : "💪 Kumenya ibyo wishoboye",
      language === "en"
        ? "📅 Daily/weekly performance"
        : language === "fr"
          ? "📅 Performance quotidienne/hebdomadaire"
          : "📅 Ibyo wakoze buri munsi/icyumweru",
    ],
    price:
      language === "en" ? "Free" : language === "fr" ? "Gratuit" : "Ubuntu",
    category: "testing",
  },
  {
    id: 6,
    icon: <SupportAgentIcon />,
    title:
      language === "en"
        ? "Help & Support"
        : language === "fr"
          ? "Aide & Support"
          : "Ubufasha",
    description:
      language === "en"
        ? "Stuck with a problem? Contact our support team for help finding solutions."
        : language === "fr"
          ? "Bloqué avec un problème? Contactez notre équipe de support pour obtenir de l'aide."
          : "Ufite ikibazo? Wandikire itego ryacu ubufasha kugira ngo ugire igisubizo.",
    features: [
      language === "en"
        ? "💬 Get help with problems"
        : language === "fr"
          ? "💬 Obtenir de l'aide avec les problèmes"
          : "💬 Kubona ubufasha kubibazo",
      language === "en"
        ? "📧 Email support"
        : language === "fr"
          ? "📧 Support par email"
          : "📧 Ubufasha bwo kuri email",
      language === "en"
        ? "📞 Phone support"
        : language === "fr"
          ? "📞 Support téléphonique"
          : "📞 Ubufasha bwo kuri telefone",
      language === "en"
        ? "🌍 Multi-language support"
        : language === "fr"
          ? "🌍 Support multilingue"
          : "🌍 Ubufasha mu ndimi nyinshi",
      language === "en"
        ? "⏱️ Quick response time"
        : language === "fr"
          ? "⏱️ Temps de réponse rapide"
          : "⏱️ Gusubiza vuba",
    ],
    price:
      language === "en" ? "Free" : language === "fr" ? "Gratuit" : "Ubuntu",
    category: "all",
  },
];

// Service Detail Modal Component
const ServiceDetailModal = ({ isOpen, onClose, service, darkMode }: any) => {
  const { language } = useLanguage();
  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      features: { en: "Features", rw: "Ibiranga", fr: "Fonctionnalités" },
      access: { en: "Access", rw: "Uko Uboneka", fr: "Accès" },
      noRegistration: {
        en: "No registration required",
        rw: "Nta kwiyandikisha birakenewe",
        fr: "Aucune inscription requise",
      },
      close: { en: "Close", rw: "Funga", fr: "Fermer" },
    };
    return translations[key]?.[language] || translations[key]?.["en"] || key;
  };
  if (!isOpen || !service) return null;
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
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div
              className={`rounded-2xl shadow-2xl overflow-hidden ${darkMode ? "bg-gray-900" : "bg-white"}`}
            >
              <div
                className={`p-6 border-b ${darkMode ? "border-gray-800" : "border-gray-100"} bg-gradient-to-r from-primary-600 to-purple-600`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl text-white">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {service.title}
                    </h2>
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
                <p
                  className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {service.description}
                </p>
                <h3
                  className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {t("features")}
                </h3>
                <div className="space-y-3 mb-6">
                  {service.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircleIcon className="text-green-500 text-sm mt-0.5 flex-shrink-0" />
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {t("access")}
                      </p>
                      <p
                        className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {service.price}
                      </p>
                      <p
                        className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} mt-1`}
                      >
                        {t("noRegistration")}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="px-6 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-medium"
                    >
                      {t("close")}
                    </motion.button>
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

// Main Services Component
export const Services = () => {
  const { darkMode } = useDarkMode();
  const { language } = useLanguage();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      freeServices: {
        en: "Free Learning Tools",
        rw: "Ibikoresho byo Kwiga ku Buntu",
        fr: "Outils d'Apprentissage Gratuits",
      },
      title: {
        en: "Test Your Skills & Get Help",
        rw: "Gerageza Ubumenyi Bwawe & Shakisha Ubufasha",
        fr: "Testez Vos Compétences & Obtenez de l'Aide",
      },
      subtitle: {
        en: "Generate tests and quizzes to assess yourself. Use the AI tutor to understand concepts and find solutions to your problems. All free, no registration needed!",
        rw: "Kora ibizamini n'ibibazo kugira ngo wipime. Koresha umurezi wa AI kugira ngo usobanukirwe ibintu n'ibisubizo by'ibibazo byawe. Byose ku buntu, nta kwiyandikisha!",
        fr: "Générez des tests et quiz pour vous évaluer. Utilisez le tuteur IA pour comprendre les concepts et trouver des solutions à vos problèmes. Tout gratuit, aucune inscription requise!",
      },
      freeBanner: {
        en: "✅ Self skill testing • AI Tutor • No registration • 100% Free",
        rw: "✅ Kwipima ubumenyi • Umurezi wa AI • Nta kwiyandikisha • 100% Ubuntu",
        fr: "✅ Auto-évaluation • Tuteur IA • Aucune inscription • 100% Gratuit",
      },
      readyTitle: {
        en: "Ready to Test Your Skills?",
        rw: "Uriteguye Kugerageza Ubumenyi Bwawe?",
        fr: "Prêt à Tester Vos Compétences?",
      },
      readyText: {
        en: "Generate a test, talk to the AI tutor, or ask for help. Start learning now!",
        rw: "Kora ikizamini, vagisha umurezi wa AI, cyangwa usabe ubufasha. Tangira kwiga ubu!",
        fr: "Générez un test, parlez au tuteur IA, ou demandez de l'aide. Commencez à apprendre maintenant!",
      },
      takeTest: {
        en: "Take a Test",
        rw: "Kora Ikizamini",
        fr: "Faire un Test",
      },
      talkToTutor: {
        en: "Talk to AI Tutor",
        rw: "Vagisha Umurezi wa AI",
        fr: "Parler au Tuteur IA",
      },
      needHelp: {
        en: "Need Help?",
        rw: "Ukeneye Ubufasha?",
        fr: "Besoin d'Aide?",
      },
      noServices: {
        en: "No tools found.",
        rw: "Nta bikoresho byanditse.",
        fr: "Aucun outil trouvé.",
      },
    };
    return translations[key]?.[language] || translations[key]?.["en"] || key;
  };

  const services = getServices(language);
  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.category === activeCategory);
  const handleLearnMore = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="absolute inset-0 z-0">
          <div
            className={`absolute inset-0 transition-all duration-500 ${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-900 to-primary-900/20" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}
          />
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-primary-500/10 border border-purple-500/20 mb-6"
            >
              <AutoAwesomeIcon className="text-purple-500 text-sm" />
              <span
                className={`text-xs font-medium ${darkMode ? "text-purple-400" : "text-purple-600"}`}
              >
                {t("freeServices")}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {t("title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-lg lg:text-xl max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {t("subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30"
            >
              <CheckCircleIcon className="text-green-500 text-sm" />
              <span
                className={`text-sm font-medium ${darkMode ? "text-green-400" : "text-green-600"}`}
              >
                {t("freeBanner")}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            darkMode={darkMode}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                darkMode={darkMode}
                onLearnMore={() => handleLearnMore(service)}
              />
            ))}
          </div>
          {filteredServices.length === 0 && (
            <div
              className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              {t("noServices")}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`p-8 rounded-2xl text-center ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-primary-50 to-purple-50"}`}
          >
            <h2
              className={`text-2xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {t("readyTitle")}
            </h2>
            <p
              className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              {t("readyText")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory("testing")}
                className="px-6 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-lg font-medium"
              >
                {t("takeTest")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory("tutor")}
                className={`px-6 py-2 rounded-lg font-medium ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}`}
              >
                {t("talkToTutor")}
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <ServiceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
        darkMode={darkMode}
      />
    </div>
  );
};
