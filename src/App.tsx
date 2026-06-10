/* eslint-disable react-refresh/only-export-components */


// /* eslint-disable react-hooks/immutability */
// /* eslint-disable react-hooks/set-state-in-effect */
// // App.tsx - MODIFIED: Removed Quiz, Progress, Certificate, Recommended Courses
// // Added: Chat clearing by time interval or manual delete
// // MODIFIED: Centered large modal + Copy response + Paraphrase with alternatives
// // FULLY RESPONSIVE: Height AND Width adapt to all screen sizes (sm, md, lg, xl, 2xl)
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-refresh/only-export-components */
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useState, useEffect, createContext, useContext, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { Navbar } from "./components/navbar/Navbar";
// import { Footer } from "./components/footer/Footer";
// import { Hero } from "./components/hero/Hero";
// import { About } from "./pages/about/About";
// import { Services } from "./pages/services/Services";
// import { QuizGenerator } from "./pages/quiz/QuizGenerator";
// import { CourseRecommendation } from "./components/recommandation/CourseRecommandation";

// // ==================== DARK MODE CONTEXT ====================
// interface DarkModeContextType {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
// }

// const DarkModeContext = createContext<DarkModeContextType | undefined>(
//   undefined,
// );

// export const useDarkMode = () => {
//   const context = useContext(DarkModeContext);
//   if (!context)
//     throw new Error("useDarkMode must be used within DarkModeProvider");
//   return context;
// };

// const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [darkMode, setDarkMode] = useState(() => {
//     const saved = localStorage.getItem("darkMode");
//     return saved ? JSON.parse(saved) : false;
//   });

//   useEffect(() => {
//     localStorage.setItem("darkMode", JSON.stringify(darkMode));
//     if (darkMode) document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//   }, [darkMode]);

//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   return (
//     <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// // ==================== LANGUAGE CONTEXT ====================
// type Language = "en" | "rw" | "fr";

// interface LanguageContextType {
//   language: Language;
//   setLanguage: (lang: Language) => void;
//   t: (key: string) => string;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(
//   undefined,
// );

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context)
//     throw new Error("useLanguage must be used within LanguageProvider");
//   return context;
// };

// const translations = {
//   en: {
//     "app.welcome": "Welcome to E-Learning",
//     "app.subtitle": "Learn anytime, anywhere",
//     "ai.title": "AI Tutor",
//     "ai.placeholder": "Ask me anything...",
//     "nav.home": "Home",
//     "nav.about": "About",
//     "nav.services": "Services",
//     "chat.clear": "Clear Chat",
//     "chat.clearAll": "Clear All",
//     "chat.clearConfirm": "Chat history cleared!",
//     "chat.autoClear": "Auto-clear in",
//   },
//   rw: {
//     "app.welcome": "Murakaza neza muri E-Learning",
//     "app.subtitle": "Wiga igihe cyose, aho uhari",
//     "ai.title": "Umurezi wa AI",
//     "ai.placeholder": "Mumbaze ikintu icyo aricyo cyose...",
//     "nav.home": "Ahabanza",
//     "nav.about": "Ibyacu",
//     "nav.services": "Serivisi",
//     "chat.clear": "Gukura Ibikubiyemo",
//     "chat.clearAll": "Gukura Byose",
//     "chat.clearConfirm": "Amakuru y'ikibazo yakuweho!",
//     "chat.autoClear": "Gukura bwite nyuma ya",
//   },
//   fr: {
//     "app.welcome": "Bienvenue à E-Learning",
//     "app.subtitle": "Apprenez à tout moment, n'importe où",
//     "ai.title": "Tuteur IA",
//     "ai.placeholder": "Demandez-moi n'importe quoi...",
//     "nav.home": "Accueil",
//     "nav.about": "À propos",
//     "nav.services": "Services",
//     "chat.clear": "Effacer le Chat",
//     "chat.clearAll": "Tout Effacer",
//     "chat.clearConfirm": "Historique du chat effacé!",
//     "chat.autoClear": "Effacement auto dans",
//   },
// };

// const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
//   const [language, setLanguage] = useState<Language>(() => {
//     const saved = localStorage.getItem("language");
//     return saved === "en" || saved === "rw" || saved === "fr"
//       ? (saved as Language)
//       : "rw";
//   });

//   useEffect(() => localStorage.setItem("language", language), [language]);

//   const t = (key: string): string => {
//     return (
//       translations[language][
//         key as keyof (typeof translations)[typeof language]
//       ] || key
//     );
//   };

//   return (
//     <LanguageContext.Provider value={{ language, setLanguage, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// // ==================== API KEYS ====================
// const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";
// const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
// const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || "";

// // ==================== COOKIE STORAGE FOR CHAT ====================
// interface Message {
//   id: string;
//   text: string;
//   isUser: boolean;
//   timestamp: Date;
// }

// // Cookie utilities with expiration
// const saveChatToCookies = (
//   messages: Message[],
//   expirationHours: number = 24,
// ) => {
//   const serialized = JSON.stringify(
//     messages.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() })),
//   );
//   const date = new Date();
//   date.setTime(date.getTime() + expirationHours * 60 * 60 * 1000);
//   document.cookie = `chat_history=${encodeURIComponent(serialized)}; path=/; expires=${date.toUTCString()}; SameSite=Lax`;
// };

// const loadChatFromCookies = (): Message[] => {
//   const match = document.cookie.match(/chat_history=([^;]+)/);
//   if (match) {
//     try {
//       const parsed = JSON.parse(decodeURIComponent(match[1]));
//       return parsed.map((m: any) => ({
//         ...m,
//         timestamp: new Date(m.timestamp),
//       }));
//     } catch (e) {
//       console.error("Failed to load chat cookies", e);
//     }
//   }
//   return [
//     {
//       id: "1",
//       text: "🌟 Hello! I'm your AI Tutor. Ask me anything about science, math, programming, or any subject! I support English, Kinyarwanda, and French.",
//       isUser: false,
//       timestamp: new Date(),
//     },
//   ];
// };

// const clearChatCookies = () => {
//   document.cookie =
//     "chat_history=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
// };

// // ==================== AI RESPONSE (Working with your keys) ====================
// const getAIResponse = async (
//   question: string,
//   language: Language,
// ): Promise<string> => {
//   const langName =
//     language === "en"
//       ? "English"
//       : language === "rw"
//         ? "Kinyarwanda"
//         : "French";
//   const prompt = `Answer in ${langName} language. Be detailed and helpful. Question: ${question}`;

//   if (OPENROUTER_API_KEY && OPENROUTER_API_KEY !== "") {
//     try {
//       console.log("Trying OpenRouter API...");
//       const response = await fetch(
//         "https://openrouter.ai/api/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//             "HTTP-Referer": window.location.origin,
//             "X-Title": "E-Learning Platform",
//           },
//           body: JSON.stringify({
//             model: "openai/gpt-3.5-turbo",
//             messages: [{ role: "user", content: prompt }],
//             max_tokens: 500,
//             temperature: 0.7,
//           }),
//         },
//       );

//       const data = await response.json();
//       console.log("OpenRouter response:", data);

//       const text = data.choices?.[0]?.message?.content;
//       if (text && text.length > 20) {
//         return text;
//       }
//     } catch (error) {
//       console.error("OpenRouter error:", error);
//     }
//   }

//   if (GEMINI_API_KEY && GEMINI_API_KEY.startsWith("AIza")) {
//     try {
//       console.log("Trying Gemini API...");
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: prompt }] }],
//             generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
//           }),
//         },
//       );

//       const data = await response.json();
//       console.log("Gemini response:", data);

//       const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
//       if (text && text.length > 20) {
//         return text;
//       }
//     } catch (error) {
//       console.error("Gemini error:", error);
//     }
//   }

//   if (HUGGINGFACE_API_KEY && HUGGINGFACE_API_KEY !== "") {
//     try {
//       console.log("Trying HuggingFace API...");
//       const response = await fetch(
//         "https://api-inference.huggingface.co/models/google/flan-t5-large",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             inputs: prompt,
//             parameters: { max_length: 500, temperature: 0.7 },
//           }),
//         },
//       );

//       const data = await response.json();
//       console.log("HuggingFace response:", data);

//       const text = data[0]?.generated_text || data.generated_text;
//       if (text && text.length > 20) {
//         return text;
//       }
//     } catch (error) {
//       console.error("HuggingFace error:", error);
//     }
//   }

//   return `💡 I'm having trouble connecting to my AI services. Please check your API keys in the .env file.

// Your question was: "${question}"

// Available keys:
// • OpenRouter: ${OPENROUTER_API_KEY ? "✅" : "❌"}
// • Gemini: ${GEMINI_API_KEY ? "✅" : "❌"}
// • HuggingFace: ${HUGGINGFACE_API_KEY ? "✅" : "❌"}`;
// };

// // ==================== AI TUTOR CHAT (FULLY RESPONSIVE - Height & Width adapt to screen size) ====================
// const AITutorChat = () => {
//   const { darkMode } = useDarkMode();
//   const { language, t } = useLanguage();
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [autoClearTimer, setAutoClearTimer] = useState<number | null>(null);
//   const [timeRemaining, setTimeRemaining] = useState<number>(0);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const timerIntervalRef = useRef<number | null>(null);
  
//   // States for copy and paraphrase
//   const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
//   const [showAlternativesFor, setShowAlternativesFor] = useState<string | null>(null);
//   const [alternativeResponses, setAlternativeResponses] = useState<{ messageId: string; alternatives: string[] } | null>(null);
//   const [isParaphrasing, setIsParaphrasing] = useState<string | null>(null);

//   // Auto-clear settings (in seconds) - set to 300 seconds (5 minutes) as default
//   const AUTO_CLEAR_INTERVAL = 300;

//   // Load from cookies
//   useEffect(() => {
//     const saved = loadChatFromCookies();
//     setMessages(saved);
//     setIsMounted(true);
//   }, []);

//   // Save to cookies (expires in 24 hours)
//   useEffect(() => {
//     if (isMounted && messages.length > 0) {
//       saveChatToCookies(messages, 24);
//     }
//   }, [messages, isMounted]);

//   // Auto-clear timer effect
//   useEffect(() => {
//     if (autoClearTimer) {
//       setTimeRemaining(autoClearTimer);
//       if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

//       timerIntervalRef.current = window.setInterval(() => {
//         setTimeRemaining((prev) => {
//           if (prev <= 1) {
//             clearChat();
//             if (timerIntervalRef.current)
//               clearInterval(timerIntervalRef.current);
//             toast.info(t("chat.clearConfirm"));
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } else {
//       if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//       setTimeRemaining(0);
//     }

//     return () => {
//       if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//     };
//   }, [autoClearTimer]);

//   const clearChat = () => {
//     const welcomeMessage: Message = {
//       id: Date.now().toString(),
//       text: "🌟 Chat cleared! Hello again! I'm your AI Tutor. How can I help you today?",
//       isUser: false,
//       timestamp: new Date(),
//     };
//     setMessages([welcomeMessage]);
//     clearChatCookies();
//     setAutoClearTimer(null);
//     toast.success(t("chat.clearConfirm"));
//   };

//   const startAutoClear = () => {
//     if (autoClearTimer) {
//       setAutoClearTimer(AUTO_CLEAR_INTERVAL);
//     } else {
//       setAutoClearTimer(AUTO_CLEAR_INTERVAL);
//       toast.info(`Chat will auto-clear in ${AUTO_CLEAR_INTERVAL} seconds`);
//     }
//   };

//   const stopAutoClear = () => {
//     setAutoClearTimer(null);
//     toast.info("Auto-clear disabled");
//   };

//   // Copy response to clipboard
//   const copyToClipboard = async (text: string, messageId: string) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setCopiedMessageId(messageId);
//       toast.success("📋 Response copied to clipboard!");
//       setTimeout(() => setCopiedMessageId(null), 2000);
//     } catch (err) {
//       toast.error("Failed to copy");
//     }
//   };

//   // Get previous user message for context
//   const getPreviousUserMessage = (currentIndex: number): string => {
//     for (let i = currentIndex - 1; i >= 0; i--) {
//       if (messages[i].isUser) {
//         return messages[i].text;
//       }
//     }
//     return "";
//   };

//   // Generate alternative paraphrased versions
//   const generateAlternatives = async (messageId: string, originalText: string, originalQuestion: string) => {
//     setIsParaphrasing(messageId);
//     setShowAlternativesFor(messageId);
    
//     const langName = language === "en" ? "English" : language === "rw" ? "Kinyarwanda" : "French";
//     const prompt = `Rewrite the following answer in 3 different ways in ${langName} language. Make each version distinctly different in style:

// Original question: "${originalQuestion}"
// Original answer: "${originalText}"

// Please provide exactly 3 versions:
// VERSION 1 - SIMPLE: Use very simple words, short sentences, easy to understand
// VERSION 2 - DETAILED: More comprehensive, include examples and explanations
// VERSION 3 - CONCISE: Short and direct, only the most important key points

// Format your response exactly like this:
// [SIMPLE]
// (version 1 text here)
// [DETAILED]
// (version 2 text here)
// [CONCISE]
// (version 3 text here)`;

//     try {
//       let alternatives: string[] = [];
      
//       if (OPENROUTER_API_KEY && OPENROUTER_API_KEY !== "") {
//         const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//             "HTTP-Referer": window.location.origin,
//             "X-Title": "E-Learning Platform",
//           },
//           body: JSON.stringify({
//             model: "openai/gpt-3.5-turbo",
//             messages: [{ role: "user", content: prompt }],
//             max_tokens: 800,
//             temperature: 0.8,
//           }),
//         });
//         const data = await response.json();
//         const text = data.choices?.[0]?.message?.content;
//         if (text) {
//           const simpleMatch = text.match(/\[SIMPLE\]([\s\S]*?)\[DETAILED\]/);
//           const detailedMatch = text.match(/\[DETAILED\]([\s\S]*?)\[CONCISE\]/);
//           const conciseMatch = text.match(/\[CONCISE\]([\s\S]*?)$/);
          
//           alternatives = [
//             simpleMatch ? simpleMatch[1].trim() : "📖 " + originalText.substring(0, 200),
//             detailedMatch ? detailedMatch[1].trim() : "🔍 " + originalText,
//             conciseMatch ? conciseMatch[1].trim() : "⚡ " + originalText.split('.')[0] + "."
//           ];
//         }
//       }
      
//       if (alternatives.length === 0 || !alternatives[0]) {
//         const sentences = originalText.split(/[.!?]+/).filter(s => s.trim().length > 10);
//         alternatives = [
//           "📖 **Simple & Easy:**\n" + (sentences[0] || originalText.substring(0, 150)),
//           "🔍 **Detailed & Complete:**\n" + originalText,
//           "⚡ **Short & Concise:**\n" + (sentences[0] || originalText.substring(0, 100)) + "."
//         ];
//       }
      
//       setAlternativeResponses({ messageId, alternatives });
//       toast.info("✨ Alternative versions ready! Click one to replace the response.");
//     } catch (error) {
//       console.error("Paraphrase error:", error);
//       const sentences = originalText.split(/[.!?]+/).filter(s => s.trim().length > 10);
//       setAlternativeResponses({ 
//         messageId, 
//         alternatives: [
//           "📖 **Simple:**\n" + (sentences[0] || originalText.substring(0, 150)),
//           "🔍 **Detailed:**\n" + originalText,
//           "⚡ **Concise:**\n" + (sentences[0] || originalText.split('.')[0])
//         ] 
//       });
//       toast.info("✨ Alternative versions ready!");
//     } finally {
//       setIsParaphrasing(null);
//     }
//   };

//   // Replace the message with selected alternative
//   const replaceWithAlternative = (messageId: string, newText: string, versionLabel: string) => {
//     const newMessages = messages.map(msg => 
//       msg.id === messageId ? { ...msg, text: newText } : msg
//     );
//     setMessages(newMessages);
//     setShowAlternativesFor(null);
//     setAlternativeResponses(null);
//     toast.success(`✅ Response changed to ${versionLabel} version`);
//   };

//   const handleSendMessage = async () => {
//     const trimmed = inputValue.trim();
//     if (!trimmed || trimmed.length < 2) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: trimmed,
//       isUser: true,
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue("");
//     setIsLoading(true);

//     const response = await getAIResponse(trimmed, language);
//     const aiMessage: Message = {
//       id: (Date.now() + 1).toString(),
//       text: response,
//       isUser: false,
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, aiMessage]);
//     setIsLoading(false);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const formatTime = (date: Date) =>
//     date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   const formatTimeRemaining = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   return (
//     <>
//       <motion.button
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         whileHover={{
//           scale: 1.1,
//           boxShadow: "0 0 25px rgba(236, 72, 153, 0.5)",
//         }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 p-3 sm:p-4 rounded-full shadow-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300"
//       >
//         <svg
//           className="w-5 h-5 sm:w-6 sm:h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//           />
//         </svg>
//       </motion.button>

//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop overlay */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsOpen(false)}
//               className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
//             />
            
//             {/* 
//               FULLY RESPONSIVE MODAL
//               Width: Gets smaller as screen gets larger
//               Height: Gets smaller as screen gets larger
//               Mobile: 95% width, 85% height
//               Tablet: 85% width, 80% height
//               Laptop: 75% width, 75% height
//               Desktop: 65% width, 70% height
//               Large Desktop: 55% width, 65% height
//               4K: 45% width, 60% height
//             */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.85, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.85, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 350 }}
//               className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 
//                 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] 2xl:w-[55%]
//                 h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[70vh] xl:h-[65vh] 2xl:h-[60vh]
//                 max-w-[1400px] min-w-[280px] max-h-[900px] min-h-[450px]
//                 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
//             >
//               <div
//                 className={`flex flex-col h-full ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-indigo-50 via-white to-pink-50"}`}
//               >
//                 {/* Header with gradient colors */}
//                 <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                       <h3 className="font-semibold text-base sm:text-lg">
//                         ✨ AI Tutor{" "}
//                         {language === "en"
//                           ? "Assistant"
//                           : language === "rw"
//                             ? "Umufasha"
//                             : "Assistant"}
//                       </h3>
//                     </div>
//                     <button
//                       onClick={() => setIsOpen(false)}
//                       className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
//                     >
//                       <svg
//                         className="w-5 h-5"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                   <p className="text-[11px] text-white/80 mt-1">
//                     🚀 Powered by OpenRouter + Gemini + HuggingFace | 📋 Copy | 🔄 Paraphrase
//                   </p>
//                 </div>

//                 {/* Chat Controls Bar */}
//                 <div
//                   className={`flex items-center justify-between px-4 py-2.5 border-b ${darkMode ? "border-gray-800 bg-gray-800/50" : "border-indigo-100 bg-white/50"}`}
//                 >
//                   <div className="flex gap-2">
//                     <button
//                       onClick={clearChat}
//                       className={`text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${darkMode ? "bg-red-900/50 text-red-300 hover:bg-red-800" : "bg-red-100 text-red-600 hover:bg-red-200"}`}
//                     >
//                       <svg
//                         className="w-3.5 h-3.5"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                         />
//                       </svg>
//                       {t("chat.clearAll")}
//                     </button>
//                     {!autoClearTimer ? (
//                       <button
//                         onClick={startAutoClear}
//                         className={`text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${darkMode ? "bg-green-900/50 text-green-300 hover:bg-green-800" : "bg-green-100 text-green-600 hover:bg-green-200"}`}
//                       >
//                         <svg
//                           className="w-3.5 h-3.5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                         Auto (5m)
//                       </button>
//                     ) : (
//                       <button
//                         onClick={stopAutoClear}
//                         className={`text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${darkMode ? "bg-yellow-900/50 text-yellow-300 hover:bg-yellow-800" : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"}`}
//                       >
//                         <svg
//                           className="w-3.5 h-3.5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M10 9l4 4-4 4"
//                           />
//                         </svg>
//                         Stop
//                       </button>
//                     )}
//                   </div>
//                   {autoClearTimer && timeRemaining > 0 && (
//                     <div
//                       className={`text-xs font-mono ${darkMode ? "text-gray-400" : "text-indigo-500"}`}
//                     >
//                       ⏱️ {formatTimeRemaining(timeRemaining)}
//                     </div>
//                   )}
//                 </div>

//                 {/* Messages Area */}
//                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                   {messages.map((message, idx) => (
//                     <div key={message.id}>
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
//                       >
//                         <div
//                           className={`max-w-[85%] rounded-2xl p-3 shadow-md ${
//                             message.isUser
//                               ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-br-sm"
//                               : darkMode
//                                 ? "bg-gray-800 text-gray-200 rounded-bl-sm border border-gray-700"
//                                 : "bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-800 rounded-bl-sm"
//                           }`}
//                         >
//                           <p className="text-sm whitespace-pre-wrap break-words">
//                             {message.text}
//                           </p>
//                           <div className="flex justify-between items-center mt-2">
//                             <p
//                               className={`text-[10px] ${message.isUser ? "text-white/70" : darkMode ? "text-gray-500" : "text-purple-600/70"}`}
//                             >
//                               {formatTime(message.timestamp)}
//                             </p>
//                             {!message.isUser && (
//                               <div className="flex gap-2">
//                                 {/* Copy Button */}
//                                 <button
//                                   onClick={() => copyToClipboard(message.text, message.id)}
//                                   className={`text-[10px] px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
//                                     darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white/50 hover:bg-white"
//                                   }`}
//                                   title="Copy response"
//                                 >
//                                   {copiedMessageId === message.id ? (
//                                     <span>✅</span>
//                                   ) : (
//                                     <>
//                                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                                       </svg>
//                                       Copy
//                                     </>
//                                   )}
//                                 </button>
//                                 {/* Paraphrase Button */}
//                                 <button
//                                   onClick={() => generateAlternatives(
//                                     message.id, 
//                                     message.text, 
//                                     getPreviousUserMessage(idx)
//                                   )}
//                                   disabled={isParaphrasing === message.id}
//                                   className={`text-[10px] px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
//                                     darkMode ? "bg-purple-900/50 hover:bg-purple-800" : "bg-purple-100 hover:bg-purple-200 text-purple-700"
//                                   }`}
//                                   title="Get alternative versions of this response"
//                                 >
//                                   {isParaphrasing === message.id ? (
//                                     <span>⏳ Loading...</span>
//                                   ) : (
//                                     <>
//                                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//                                       </svg>
//                                       Paraphrase
//                                     </>
//                                   )}
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </motion.div>
                      
//                       {/* Alternatives Panel */}
//                       {showAlternativesFor === message.id && alternativeResponses?.messageId === message.id && (
//                         <motion.div
//                           initial={{ opacity: 0, y: -10, height: 0 }}
//                           animate={{ opacity: 1, y: 0, height: "auto" }}
//                           exit={{ opacity: 0, y: -10, height: 0 }}
//                           className="ml-12 mt-2 mr-8"
//                         >
//                           <div className={`rounded-xl p-3 ${darkMode ? "bg-purple-900/40 border border-purple-600" : "bg-purple-50 border border-purple-200"}`}>
//                             <div className="flex justify-between items-center mb-2">
//                               <p className={`text-xs font-semibold ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
//                                 📝 Choose a version to replace the response:
//                               </p>
//                               <button
//                                 onClick={() => {
//                                   setShowAlternativesFor(null);
//                                   setAlternativeResponses(null);
//                                 }}
//                                 className="text-xs text-gray-500 hover:text-gray-700"
//                               >
//                                 ✕ Cancel
//                               </button>
//                             </div>
//                             <div className="space-y-2">
//                               {alternativeResponses.alternatives.map((alt, altIdx) => {
//                                 const labels = ["📖 Simple & Easy", "🔍 Detailed & Complete", "⚡ Short & Concise"];
//                                 const colors = [
//                                   "border-green-300 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40",
//                                   "border-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40", 
//                                   "border-orange-300 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40"
//                                 ];
//                                 return (
//                                   <button
//                                     key={altIdx}
//                                     onClick={() => replaceWithAlternative(message.id, alt, labels[altIdx])}
//                                     className={`w-full text-left p-3 rounded-lg border text-sm transition-all hover:shadow-md ${colors[altIdx]} ${darkMode ? "text-gray-200" : "text-gray-700"}`}
//                                   >
//                                     <div className="font-semibold mb-1">{labels[altIdx]}</div>
//                                     <div className="text-xs opacity-90 line-clamp-3 whitespace-pre-wrap">
//                                       {alt.length > 200 ? alt.substring(0, 200) + "..." : alt}
//                                     </div>
//                                   </button>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}
//                     </div>
//                   ))}
                  
//                   {isLoading && (
//                     <div className="flex justify-start">
//                       <div
//                         className={`rounded-2xl rounded-bl-sm p-3 shadow-md ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-indigo-100 to-purple-100"}`}
//                       >
//                         <div className="flex gap-1">
//                           <div
//                             className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"
//                             style={{ animationDelay: "0ms" }}
//                           />
//                           <div
//                             className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"
//                             style={{ animationDelay: "150ms" }}
//                           />
//                           <div
//                             className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
//                             style={{ animationDelay: "300ms" }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   <div ref={messagesEndRef} />
//                 </div>

//                 {/* Input Area */}
//                 <div
//                   className={`p-4 border-t ${darkMode ? "border-gray-800" : "border-indigo-100"}`}
//                 >
//                   <div className="flex gap-2">
//                     <textarea
//                       value={inputValue}
//                       onChange={(e) => setInputValue(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       placeholder={t("ai.placeholder")}
//                       rows={2}
//                       className={`flex-1 px-3 py-2 rounded-xl border resize-none text-sm transition-all focus:ring-2 focus:ring-purple-500 ${
//                         darkMode
//                           ? "border-gray-700 bg-gray-800 text-white focus:border-purple-500"
//                           : "border-indigo-200 bg-white text-gray-800 focus:border-purple-500"
//                       }`}
//                     />
//                     <button
//                       onClick={handleSendMessage}
//                       disabled={isLoading || !inputValue.trim()}
//                       className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl disabled:opacity-50 hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-md"
//                     >
//                       {isLoading ? (
//                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       ) : (
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// const ScrollToTop = () => {
//   const { pathname } = useLocation();
//   useEffect(() => window.scrollTo(0, 0), [pathname]);
//   return null;
// };

// // ==================== MAIN APP (Login/Register Removed from Navbar) ====================
// const AppContent = () => {
//   const { darkMode, toggleDarkMode } = useDarkMode();

//   return (
//     <>
//       <ScrollToTop />
//       <div
//         className={`min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-indigo-50 via-white to-pink-50"}`}
//       >
//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           theme={darkMode ? "dark" : "light"}
//         />
//         <Navbar darkMode={darkMode} onDarkModeToggle={toggleDarkMode} />
//         <div className="pt-16 lg:pt-20">
//           <Routes>
//             <Route path="/" element={<Hero />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/quiz-generator" element={<QuizGenerator />} />
//             <Route path="/recommendations" element={<CourseRecommendation />} />
//           </Routes>
//         </div>
//         <Footer />
//         <AITutorChat />
//       </div>
//     </>
//   );
// };

// export const App = () => {
//   return (
//     <DarkModeProvider>
//       <LanguageProvider>
//         <AppContent />
//       </LanguageProvider>
//     </DarkModeProvider>
//   );
// };
// ******************************************************************************************
// /* eslint-disable react-hooks/immutability */
// /* eslint-disable react-hooks/set-state-in-effect */
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useState, useEffect, createContext, useContext, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { Navbar } from "./components/navbar/Navbar";
// import { Footer } from "./components/footer/Footer";
// import { Hero } from "./components/hero/Hero";
// import { About } from "./pages/about/About";
// import { Services } from "./pages/services/Services";
// import { QuizGenerator } from "./pages/quiz/QuizGenerator";
// import { CourseRecommendation } from "./components/recommandation/CourseRecommandation";

// // ==================== DARK MODE CONTEXT ====================
// interface DarkModeContextType {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
// }

// const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

// export const useDarkMode = () => {
//   const context = useContext(DarkModeContext);
//   if (!context) throw new Error("useDarkMode must be used within DarkModeProvider");
//   return context;
// };

// const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [darkMode, setDarkMode] = useState(() => {
//     const saved = localStorage.getItem("darkMode");
//     return saved ? JSON.parse(saved) : false;
//   });

//   useEffect(() => {
//     localStorage.setItem("darkMode", JSON.stringify(darkMode));
//     if (darkMode) document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//   }, [darkMode]);

//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   return (
//     <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// // ==================== LANGUAGE CONTEXT ====================
// type Language = "en" | "rw" | "fr";

// interface LanguageContextType {
//   language: Language;
//   setLanguage: (lang: Language) => void;
//   t: (key: string) => string;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) throw new Error("useLanguage must be used within LanguageProvider");
//   return context;
// };

// const translations = {
//   en: {
//     "app.welcome": "Welcome to E-Learning",
//     "app.subtitle": "Learn anytime, anywhere",
//     "ai.title": "AI Tutor",
//     "ai.placeholder": "Ask me anything or send an image...",
//     "nav.home": "Home",
//     "nav.about": "About",
//     "nav.services": "Services",
//     "chat.clear": "Clear Chat",
//     "chat.clearAll": "Clear All",
//     "chat.clearConfirm": "Chat history cleared!",
//     "chat.autoClear": "Auto-clear in",
//     "image.analyzing": "Analyzing image...",
//     "image.upload": "Upload Image",
//     "reload.response": "Reload Response",
//     "code.copy": "Copy Code",
//     "code.copied": "Copied!",
//     "code.download": "Download",
//     "code.showMore": "Show More",
//     "code.showLess": "Show Less",
//   },
//   rw: {
//     "app.welcome": "Murakaza neza muri E-Learning",
//     "app.subtitle": "Wiga igihe cyose, aho uhari",
//     "ai.title": "Umurezi wa AI",
//     "ai.placeholder": "Mumbaze ikintu icyo aricyo cyose cyangwa wohereze ifoto...",
//     "nav.home": "Ahabanza",
//     "nav.about": "Ibyacu",
//     "nav.services": "Serivisi",
//     "chat.clear": "Gukura Ibikubiyemo",
//     "chat.clearAll": "Gukura Byose",
//     "chat.clearConfirm": "Amakuru y'ikibazo yakuweho!",
//     "chat.autoClear": "Gukura bwite nyuma ya",
//     "image.analyzing": "Isesengura ifoto...",
//     "image.upload": "Ohereza Ifoto",
//     "reload.response": "Ongera Usubireho",
//     "code.copy": "Koporora Kode",
//     "code.copied": "Yakoporowe!",
//     "code.download": "Kurura",
//     "code.showMore": "Reba Byinshi",
//     "code.showLess": "Reba Bike",
//   },
//   fr: {
//     "app.welcome": "Bienvenue à E-Learning",
//     "app.subtitle": "Apprenez à tout moment, n'importe où",
//     "ai.title": "Tuteur IA",
//     "ai.placeholder": "Demandez-moi n'importe quoi ou envoyez une image...",
//     "nav.home": "Accueil",
//     "nav.about": "À propos",
//     "nav.services": "Services",
//     "chat.clear": "Effacer le Chat",
//     "chat.clearAll": "Tout Effacer",
//     "chat.clearConfirm": "Historique du chat effacé!",
//     "chat.autoClear": "Effacement auto dans",
//     "image.analyzing": "Analyse de l'image...",
//     "image.upload": "Télécharger l'image",
//     "reload.response": "Recharger la réponse",
//     "code.copy": "Copier le Code",
//     "code.copied": "Copié!",
//     "code.download": "Télécharger",
//     "code.showMore": "Voir Plus",
//     "code.showLess": "Voir Moins",
//   },
// };

// const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
//   const [language, setLanguage] = useState<Language>(() => {
//     const saved = localStorage.getItem("language");
//     return saved === "en" || saved === "rw" || saved === "fr" ? (saved as Language) : "rw";
//   });

//   useEffect(() => localStorage.setItem("language", language), [language]);

//   const t = (key: string): string => {
//     return translations[language][key as keyof (typeof translations)[typeof language]] || key;
//   };

//   return (
//     <LanguageContext.Provider value={{ language, setLanguage, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// // ==================== API KEYS ====================
// const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || "";
// const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";
// const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
// const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || "";

// const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
// const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
// const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
// const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large";

// // ==================== CODE DISPLAY COMPONENT ====================
// interface CodeDisplayProps {
//   code: string;
//   language?: string;
//   title?: string;
//   showLineNumbers?: boolean;
// }

// const CodeDisplay = ({ code, language = "typescript", title = "Code Example", showLineNumbers = true }: CodeDisplayProps) => {
//   const { darkMode } = useDarkMode();
//   const { t } = useLanguage();
//   const [copied, setCopied] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const removeComments = (codeStr: string): string => {
//     const lines = codeStr.split('\n');
//     let inBlockComment = false;
    
//     const cleanedLines = lines.map(line => {
//       let result = '';
//       let i = 0;
      
//       while (i < line.length) {
//         if (!inBlockComment) {
//           if (line[i] === '/' && line[i+1] === '/') {
//             break;
//           } else if (line[i] === '/' && line[i+1] === '*') {
//             inBlockComment = true;
//             i += 2;
//             continue;
//           }
//           result += line[i];
//           i++;
//         } else {
//           if (line[i] === '*' && line[i+1] === '/') {
//             inBlockComment = false;
//             i += 2;
//             continue;
//           }
//           i++;
//         }
//       }
      
//       return result.trim();
//     });
    
//     return cleanedLines.filter(line => line.length > 0).join('\n');
//   };

//   const cleanCode = removeComments(code);
//   const displayCode = expanded ? cleanCode : cleanCode.split('\n').slice(0, 30).join('\n');
//   const hasMoreLines = cleanCode.split('\n').length > 30;

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(cleanCode);
//       setCopied(true);
//       toast.success("✅ " + t("code.copied"));
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       toast.error("Failed to copy code");
//     }
//   };

//   const downloadCode = () => {
//     const extensions: Record<string, string> = {
//       typescript: 'ts',
//       javascript: 'js',
//       python: 'py',
//       html: 'html',
//       css: 'css',
//       json: 'json',
//       sql: 'sql',
//       bash: 'sh',
//     };
//     const ext = extensions[language] || 'txt';
//     const blob = new Blob([cleanCode], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.${ext}`;
//     a.click();
//     URL.revokeObjectURL(url);
//     toast.success("📁 " + t("code.download") + "ed!");
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`rounded-xl overflow-hidden shadow-lg my-4 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
//     >
//       <div className={`flex justify-between items-center px-4 py-2 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
//         <div className="flex items-center gap-2">
//           <div className="flex gap-1">
//             <div className="w-3 h-3 rounded-full bg-red-500"></div>
//             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//             <div className="w-3 h-3 rounded-full bg-green-500"></div>
//           </div>
//           <span className={`text-sm font-mono ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
//             {title}.{extensions[language] || 'txt'}
//           </span>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={copyToClipboard}
//             className={`p-1.5 rounded-md transition-all flex items-center gap-1 text-xs ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"}`}
//             title={t("code.copy")}
//           >
//             {copied ? (
//               <span>✅ {t("code.copied")}</span>
//             ) : (
//               <>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                 </svg>
//                 {t("code.copy")}
//               </>
//             )}
//           </button>
//           <button
//             onClick={downloadCode}
//             className={`p-1.5 rounded-md transition-all flex items-center gap-1 text-xs ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"}`}
//             title={t("code.download")}
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//             </svg>
//             {t("code.download")}
//           </button>
//           {hasMoreLines && (
//             <button
//               onClick={() => setExpanded(!expanded)}
//               className={`p-1.5 rounded-md transition-all flex items-center gap-1 text-xs ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"}`}
//             >
//               {expanded ? (
//                 <>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//                   </svg>
//                   {t("code.showLess")}
//                 </>
//               ) : (
//                 <>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                   {t("code.showMore")}
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       </div>
//       <SyntaxHighlighter
//         language={language}
//         style={darkMode ? vscDarkPlus : vs}
//         showLineNumbers={showLineNumbers}
//         wrapLines={true}
//         customStyle={{
//           margin: 0,
//           padding: "1rem",
//           fontSize: "0.875rem",
//           maxHeight: expanded ? "none" : "400px",
//           overflow: "auto",
//         }}
//       >
//         {displayCode}
//       </SyntaxHighlighter>
//     </motion.div>
//   );
// };

// // ==================== MULTI-AI RESPONSE FUNCTION ====================
// interface Message {
//   id: string;
//   text: string;
//   isUser: boolean;
//   timestamp: Date;
//   imageData?: string;
//   isImage?: boolean;
// }

// // DeepSeek API Call
// const callDeepSeek = async (prompt: string, language: Language, imageBase64?: string): Promise<string | null> => {
//   if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === "") return null;
  
//   try {
//     const messages = imageBase64 ? [
//       {
//         role: "user",
//         content: [
//           { type: "text", text: prompt },
//           { type: "image_url", image_url: { url: imageBase64 } }
//         ]
//       }
//     ] : [
//       { role: "system", content: `You are an expert AI tutor. Respond in ${language === "en" ? "English" : language === "rw" ? "Kinyarwanda" : "French"}.` },
//       { role: "user", content: prompt }
//     ];
    
//     const response = await fetch(DEEPSEEK_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "deepseek-chat",
//         messages: Array.isArray(messages) ? messages : [messages],
//         max_tokens: 2000,
//         temperature: 0.7,
//       }),
//     });
    
//     const data = await response.json();
    
//     if (data.choices && data.choices[0] && data.choices[0].message) {
//       return data.choices[0].message.content;
//     }
    
//     if (data.error) {
//       console.error("DeepSeek Error:", data.error);
//       return null;
//     }
    
//     return null;
//   } catch (error) {
//     console.error("DeepSeek Exception:", error);
//     return null;
//   }
// };

// // OpenRouter API Call (access to GPT, Claude, etc.)
// const callOpenRouter = async (prompt: string, language: Language): Promise<string | null> => {
//   if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === "") return null;
  
//   try {
//     const response = await fetch(OPENROUTER_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
//         "HTTP-Referer": window.location.origin,
//         "X-Title": "E-Learning Platform",
//       },
//       body: JSON.stringify({
//         model: "openai/gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: `You are an expert AI tutor. Respond in ${language === "en" ? "English" : language === "rw" ? "Kinyarwanda" : "French"}.` },
//           { role: "user", content: prompt }
//         ],
//         max_tokens: 2000,
//         temperature: 0.7,
//       }),
//     });
    
//     const data = await response.json();
    
//     if (data.choices && data.choices[0] && data.choices[0].message) {
//       return data.choices[0].message.content;
//     }
    
//     return null;
//   } catch (error) {
//     console.error("OpenRouter Exception:", error);
//     return null;
//   }
// };

// // Google Gemini API Call
// const callGemini = async (prompt: string, language: Language): Promise<string | null> => {
//   if (!GEMINI_API_KEY || GEMINI_API_KEY === "" || !GEMINI_API_KEY.startsWith("AIza")) return null;
  
//   try {
//     const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }],
//         generationConfig: { temperature: 0.7, maxOutputTokens: 2000 },
//       }),
//     });
    
//     const data = await response.json();
    
//     if (data.candidates && data.candidates[0] && data.candidates[0].content) {
//       return data.candidates[0].content.parts[0].text;
//     }
    
//     return null;
//   } catch (error) {
//     console.error("Gemini Exception:", error);
//     return null;
//   }
// };

// // HuggingFace API Call
// const callHuggingFace = async (prompt: string, language: Language): Promise<string | null> => {
//   if (!HUGGINGFACE_API_KEY || HUGGINGFACE_API_KEY === "") return null;
  
//   try {
//     const response = await fetch(HUGGINGFACE_API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         inputs: prompt,
//         parameters: { max_length: 500, temperature: 0.7 },
//       }),
//     });
    
//     const data = await response.json();
    
//     if (data && data[0] && data[0].generated_text) {
//       return data[0].generated_text;
//     }
    
//     if (data.generated_text) {
//       return data.generated_text;
//     }
    
//     return null;
//   } catch (error) {
//     console.error("HuggingFace Exception:", error);
//     return null;
//   }
// };

// // Main AI response function with fallback chain
// const getAIResponse = async (
//   question: string, 
//   language: Language, 
//   imageBase64?: string
// ): Promise<string> => {
//   const langName = language === "en" ? "English" : language === "rw" ? "Kinyarwanda" : "French";
  
//   const prompt = `Answer in ${langName} language. Be detailed, helpful, and include proper code formatting when relevant. Use markdown for code blocks with language specification.

// Question: ${question}`;
  
//   // Try APIs in order: DeepSeek -> OpenRouter -> Gemini -> HuggingFace
//   const apis = [
//     { name: "DeepSeek", fn: () => callDeepSeek(prompt, language, imageBase64) },
//     { name: "OpenRouter (GPT)", fn: () => callOpenRouter(prompt, language) },
//     { name: "Google Gemini", fn: () => callGemini(prompt, language) },
//     { name: "HuggingFace", fn: () => callHuggingFace(prompt, language) },
//   ];
  
//   for (const api of apis) {
//     try {
//       const response = await api.fn();
//       if (response && response.length > 20) {
//         console.log(`✅ Response from ${api.name}`);
//         return response;
//       }
//     } catch (error) {
//       console.error(`${api.name} failed:`, error);
//     }
//   }
  
//   // If all APIs fail, show status message
//   const apiStatus = `
// ⚠️ **All AI APIs are currently unavailable**

// **API Status:**
// ${DEEPSEEK_API_KEY ? "✅ DeepSeek API Key present" : "❌ DeepSeek API Key missing"}
// ${OPENROUTER_API_KEY ? "✅ OpenRouter API Key present" : "❌ OpenRouter API Key missing"}
// ${GEMINI_API_KEY && GEMINI_API_KEY.startsWith("AIza") ? "✅ Gemini API Key present" : "❌ Gemini API Key missing"}
// ${HUGGINGFACE_API_KEY ? "✅ HuggingFace API Key present" : "❌ HuggingFace API Key missing"}

// **How to fix:**

// 1. **DeepSeek (Recommended - Cheapest)**
//    - Visit: https://platform.deepseek.com/
//    - Sign up and get free credits
//    - Add to .env: \`VITE_DEEPSEEK_API_KEY=your_key\`

// 2. **OpenRouter (Access to GPT-4, Claude)**
//    - Visit: https://openrouter.ai/
//    - Get free credits on signup
//    - Add to .env: \`VITE_OPENROUTER_API_KEY=your_key\`

// 3. **Google Gemini (Free Tier Available)**
//    - Visit: https://makersuite.google.com/app/apikey
//    - Free API quota available
//    - Add to .env: \`VITE_GEMINI_API_KEY=your_key\`

// 4. **HuggingFace (Free Inference API)**
//    - Visit: https://huggingface.co/
//    - Free tier available
//    - Add to .env: \`VITE_HUGGINGFACE_API_KEY=your_key\`

// Your question was: "${question.substring(0, 100)}..."
//   `;
  
//   return apiStatus;
// };

// // ==================== COOKIE STORAGE FOR CHAT ====================
// const saveChatToCookies = (messages: Message[], expirationHours: number = 24) => {
//   const serialized = JSON.stringify(
//     messages.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() })),
//   );
//   const date = new Date();
//   date.setTime(date.getTime() + expirationHours * 60 * 60 * 1000);
//   document.cookie = `chat_history=${encodeURIComponent(serialized)}; path=/; expires=${date.toUTCString()}; SameSite=Lax`;
// };

// const loadChatFromCookies = (): Message[] => {
//   const match = document.cookie.match(/chat_history=([^;]+)/);
//   if (match) {
//     try {
//       const parsed = JSON.parse(decodeURIComponent(match[1]));
//       return parsed.map((m: Message) => ({
//         ...m,
//         timestamp: new Date(m.timestamp),
//       }));
//     } catch (e) {
//       console.error("Failed to load chat cookies", e);
//     }
//   }
//   return [
//     {
//       id: "1",
//       text: "🌟 **Multi-AI Tutor Ready!**\n\nI'm powered by **4 different AI models**:\n- 🐋 DeepSeek (Primary)\n- 🤖 OpenRouter (GPT Access)\n- 🧠 Google Gemini\n- 🤗 HuggingFace\n\n**What I can do:**\n- 💻 Generate code in any language\n- 📐 Explain math and science\n- 🔬 Analyze images (DeepSeek Vision)\n- 📚 Help with homework\n- 🌐 Speak English, Kinyarwanda, and French\n\n**How can I help you today?**",
//       isUser: false,
//       timestamp: new Date(),
//     },
//   ];
// };

// const clearChatCookies = () => {
//   document.cookie = "chat_history=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
// };

// // ==================== AI TUTOR CHAT COMPONENT ====================
// const AITutorChat = () => {
//   const { darkMode } = useDarkMode();
//   const { language, t } = useLanguage();
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [autoClearTimer, setAutoClearTimer] = useState<number | null>(null);
//   const [timeRemaining, setTimeRemaining] = useState<number>(0);
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const timerIntervalRef = useRef<number | null>(null);
  
//   const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
//   const [showAlternativesFor, setShowAlternativesFor] = useState<string | null>(null);
//   const [alternativeResponses, setAlternativeResponses] = useState<{ messageId: string; alternatives: string[] } | null>(null);
//   const [isParaphrasing, setIsParaphrasing] = useState<string | null>(null);

//   const AUTO_CLEAR_INTERVAL = 300;

//   useEffect(() => {
//     const saved = loadChatFromCookies();
//     setMessages(saved);
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (isMounted && messages.length > 0) {
//       saveChatToCookies(messages, 24);
//     }
//   }, [messages, isMounted]);

//   useEffect(() => {
//     if (autoClearTimer) {
//       setTimeRemaining(autoClearTimer);
//       if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      
//       timerIntervalRef.current = window.setInterval(() => {
//         setTimeRemaining((prev) => {
//           if (prev <= 1) {
//             clearChat();
//             if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//             toast.info(t("chat.clearConfirm"));
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } else {
//       if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//       setTimeRemaining(0);
//     }
    
//     return () => {
//       if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
//     };
//   }, [autoClearTimer]);

//   const clearChat = () => {
//     const welcomeMessage: Message = {
//       id: Date.now().toString(),
//       text: "🌟 **Chat Cleared!**\n\nHello again! Your Multi-AI Tutor is ready.\n\n**Available APIs:**\n- 🐋 DeepSeek\n- 🤖 OpenRouter (GPT)\n- 🧠 Google Gemini\n- 🤗 HuggingFace\n\nAsk me anything!",
//       isUser: false,
//       timestamp: new Date(),
//     };
//     setMessages([welcomeMessage]);
//     clearChatCookies();
//     setAutoClearTimer(null);
//     toast.success(t("chat.clearConfirm"));
//   };

//   const startAutoClear = () => {
//     if (autoClearTimer) {
//       setAutoClearTimer(AUTO_CLEAR_INTERVAL);
//     } else {
//       setAutoClearTimer(AUTO_CLEAR_INTERVAL);
//       toast.info(`Chat will auto-clear in ${AUTO_CLEAR_INTERVAL} seconds`);
//     }
//   };

//   const stopAutoClear = () => {
//     setAutoClearTimer(null);
//     toast.info("Auto-clear disabled");
//   };

//   const copyToClipboard = async (text: string, messageId: string) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setCopiedMessageId(messageId);
//       toast.success("📋 Response copied to clipboard!");
//       setTimeout(() => setCopiedMessageId(null), 2000);
//     } catch (err) {
//       toast.error("Failed to copy");
//     }
//   };

//   const getPreviousUserMessage = (currentIndex: number): string => {
//     for (let i = currentIndex - 1; i >= 0; i--) {
//       if (messages[i].isUser) {
//         return messages[i].text;
//       }
//     }
//     return "";
//   };

//   const generateAlternatives = async (messageId: string, originalText: string, originalQuestion: string) => {
//     setIsParaphrasing(messageId);
//     setShowAlternativesFor(messageId);
    
//     const prompt = `Rewrite the following answer in 3 different ways:

// Original question: "${originalQuestion}"
// Original answer: "${originalText.substring(0, 1000)}"

// Provide exactly 3 versions:
// 1. SIMPLE - Easy to understand
// 2. DETAILED - Comprehensive with examples
// 3. CONCISE - Short and to the point

// Format: [SIMPLE] version1 [DETAILED] version2 [CONCISE] version3`;
    
//     try {
//       let alternatives: string[] = [];
//       const response = await getAIResponse(prompt, language);
      
//       const simpleMatch = response.match(/\[SIMPLE\]([\s\S]*?)\[DETAILED\]/);
//       const detailedMatch = response.match(/\[DETAILED\]([\s\S]*?)\[CONCISE\]/);
//       const conciseMatch = response.match(/\[CONCISE\]([\s\S]*?)$/);
      
//       alternatives = [
//         simpleMatch ? simpleMatch[1].trim() : "📖 " + originalText.substring(0, 200),
//         detailedMatch ? detailedMatch[1].trim() : "🔍 " + originalText,
//         conciseMatch ? conciseMatch[1].trim() : "⚡ " + originalText.split('.')[0] + "."
//       ];
      
//       setAlternativeResponses({ messageId, alternatives });
//       toast.info("✨ Alternative versions ready!");
//     } catch (error) {
//       console.error("Paraphrase error:", error);
//       setAlternativeResponses({ 
//         messageId, 
//         alternatives: [
//           "📖 Simple:\n" + originalText.substring(0, 200),
//           "🔍 Detailed:\n" + originalText,
//           "⚡ Concise:\n" + originalText.split('.')[0]
//         ] 
//       });
//       toast.info("✨ Alternative versions ready!");
//     } finally {
//       setIsParaphrasing(null);
//     }
//   };

//   const replaceWithAlternative = (messageId: string, newText: string, versionLabel: string) => {
//     const newMessages = messages.map(msg => 
//       msg.id === messageId ? { ...msg, text: newText } : msg
//     );
//     setMessages(newMessages);
//     setShowAlternativesFor(null);
//     setAlternativeResponses(null);
//     toast.success(`✅ Response changed to ${versionLabel} version`);
//   };

//   const reloadResponse = async (messageId: string, userText: string, imageData?: string) => {
//     setIsLoading(true);
    
//     try {
//       const response = await getAIResponse(userText, language, imageData);
//       const newMessages = messages.map(msg => 
//         msg.id === messageId ? { ...msg, text: response, timestamp: new Date() } : msg
//       );
//       setMessages(newMessages);
//       toast.success("✅ Response reloaded successfully!");
//     } catch (error) {
//       console.error("Reload failed:", error);
//       toast.error("Failed to reload response. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         toast.error("Please select an image file");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("Image size should be less than 5MB");
//         return;
//       }
      
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const sendImageMessage = async () => {
//     if (!selectedImage || !imagePreview) return;
    
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: inputValue.trim() || "📸 Analyze this image",
//       isUser: true,
//       timestamp: new Date(),
//       imageData: imagePreview,
//       isImage: true,
//     };
    
//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue("");
//     setSelectedImage(null);
//     setImagePreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setIsLoading(true);
    
//     const response = await getAIResponse(inputValue.trim() || "Describe this image in detail", language, imagePreview);
//     const aiMessage: Message = {
//       id: (Date.now() + 1).toString(),
//       text: response,
//       isUser: false,
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, aiMessage]);
//     setIsLoading(false);
//   };

//   const handleSendMessage = async () => {
//     const trimmed = inputValue.trim();
//     if (trimmed.length < 2) return;
    
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: trimmed,
//       isUser: true,
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue("");
//     setIsLoading(true);
    
//     const response = await getAIResponse(trimmed, language);
//     const aiMessage: Message = {
//       id: (Date.now() + 1).toString(),
//       text: response,
//       isUser: false,
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, aiMessage]);
//     setIsLoading(false);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       if (selectedImage) {
//         sendImageMessage();
//       } else {
//         handleSendMessage();
//       }
//     }
//   };

//   const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
//   const formatTimeRemaining = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const renderMessageContent = (text: string) => {
//     const parts: React.ReactNode[] = [];
//     let lastIndex = 0;
//     const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
//     let match;
    
//     while ((match = codeBlockRegex.exec(text)) !== null) {
//       if (match.index > lastIndex) {
//         parts.push(
//           <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
//             {text.substring(lastIndex, match.index)}
//           </span>
//         );
//       }
//       const [, lang, code] = match;
//       parts.push(
//         <CodeDisplay 
//           key={`code-${match.index}`} 
//           code={code.trim()} 
//           language={lang || 'javascript'} 
//           title="Code" 
//         />
//       );
//       lastIndex = match.index + match[0].length;
//     }
    
//     if (lastIndex < text.length) {
//       parts.push(
//         <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
//           {text.substring(lastIndex)}
//         </span>
//       );
//     }
    
//     return parts.length > 0 ? parts : <span className="whitespace-pre-wrap">{text}</span>;
//   };

//   return (
//     <>
//       <motion.button
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(0, 150, 255, 0.5)" }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 p-3 sm:p-4 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
//       >
//         <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//         </svg>
//       </motion.button>
      
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsOpen(false)}
//               className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
//             />
            
//             <motion.div
//               initial={{ opacity: 0, scale: 0.85, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.85, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 350 }}
//               className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 
//                 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] 2xl:w-[55%]
//                 h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[70vh] xl:h-[65vh] 2xl:h-[60vh]
//                 max-w-[1400px] min-w-[280px] max-h-[900px] min-h-[450px]
//                 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
//             >
//               <div className={`flex flex-col h-full ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}>
//                 <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                       <div className="flex gap-1">
//                         <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                         <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
//                         <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
//                       </div>
//                       <h3 className="font-semibold text-base sm:text-lg">
//                         🤖 Multi-AI Tutor (4 Models)
//                       </h3>
//                     </div>
//                     <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>
//                   <p className="text-[11px] text-white/80 mt-1">
//                     🐋 DeepSeek | 🤖 OpenRouter | 🧠 Gemini | 🤗 HuggingFace | 📋 Copy | 🔄 Paraphrase | 📸 Images
//                   </p>
//                 </div>
                
//                 <div className={`flex items-center justify-between px-4 py-2.5 border-b ${darkMode ? "border-gray-800 bg-gray-800/50" : "border-blue-100 bg-white/50"}`}>
//                   <div className="flex gap-2">
//                     <button onClick={clearChat} className={`text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${darkMode ? "bg-red-900/50 text-red-300 hover:bg-red-800" : "bg-red-100 text-red-600 hover:bg-red-200"}`}>
//                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                       {t("chat.clearAll")}
//                     </button>
//                     {!autoClearTimer ? (
//                       <button onClick={startAutoClear} className={`text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${darkMode ? "bg-green-900/50 text-green-300 hover:bg-green-800" : "bg-green-100 text-green-600 hover:bg-green-200"}`}>
//                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         Auto (5m)
//                       </button>
//                     ) : (
//                       <button onClick={stopAutoClear} className={`text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${darkMode ? "bg-yellow-900/50 text-yellow-300 hover:bg-yellow-800" : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"}`}>
//                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9l4 4-4 4" />
//                         </svg>
//                         Stop
//                       </button>
//                     )}
//                   </div>
//                   {autoClearTimer && timeRemaining > 0 && (
//                     <div className={`text-xs font-mono ${darkMode ? "text-gray-400" : "text-blue-500"}`}>
//                       ⏱️ {formatTimeRemaining(timeRemaining)}
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                   {messages.map((message, idx) => (
//                     <div key={message.id}>
//                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
//                         <div className={`max-w-[85%] rounded-2xl p-3 shadow-md ${
//                           message.isUser
//                             ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm"
//                             : darkMode ? "bg-gray-800 text-gray-200 rounded-bl-sm border border-gray-700"
//                             : "bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 rounded-bl-sm"
//                         }`}>
//                           {message.isImage && message.imageData && (
//                             <div className="mb-2">
//                               <img src={message.imageData} alt="User uploaded" className="max-w-full max-h-32 rounded-lg object-cover" />
//                             </div>
//                           )}
//                           <div className="text-sm">
//                             {renderMessageContent(message.text)}
//                           </div>
//                           <div className="flex justify-between items-center mt-2">
//                             <p className={`text-[10px] ${message.isUser ? "text-white/70" : darkMode ? "text-gray-500" : "text-purple-600/70"}`}>
//                               {formatTime(message.timestamp)}
//                             </p>
//                             {!message.isUser && (
//                               <div className="flex gap-2">
//                                 <button onClick={() => copyToClipboard(message.text, message.id)} className={`text-[10px] px-2 py-0.5 rounded transition-all flex items-center gap-1 ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white/50 hover:bg-white"}`}>
//                                   {copiedMessageId === message.id ? <span>✅</span> : (
//                                     <>
//                                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                                       </svg>
//                                       Copy
//                                     </>
//                                   )}
//                                 </button>
//                                 <button onClick={() => generateAlternatives(message.id, message.text, getPreviousUserMessage(idx))} disabled={isParaphrasing === message.id} className={`text-[10px] px-2 py-0.5 rounded transition-all flex items-center gap-1 ${darkMode ? "bg-purple-900/50 hover:bg-purple-800" : "bg-purple-100 hover:bg-purple-200 text-purple-700"}`}>
//                                   {isParaphrasing === message.id ? <span>⏳</span> : (
//                                     <>
//                                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//                                       </svg>
//                                       Para
//                                     </>
//                                   )}
//                                 </button>
//                                 <button onClick={() => reloadResponse(message.id, getPreviousUserMessage(idx), messages[idx-1]?.imageData)} disabled={isLoading} className={`text-[10px] px-2 py-0.5 rounded transition-all flex items-center gap-1 ${darkMode ? "bg-orange-900/50 hover:bg-orange-800" : "bg-orange-100 hover:bg-orange-200 text-orange-700"}`}>
//                                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                                   </svg>
//                                   Reload
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </motion.div>
                      
//                       {showAlternativesFor === message.id && alternativeResponses?.messageId === message.id && (
//                         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="ml-12 mt-2 mr-8">
//                           <div className={`rounded-xl p-3 ${darkMode ? "bg-purple-900/40 border border-purple-600" : "bg-purple-50 border border-purple-200"}`}>
//                             <div className="flex justify-between items-center mb-2">
//                               <p className={`text-xs font-semibold ${darkMode ? "text-purple-300" : "text-purple-700"}`}>📝 Choose a version:</p>
//                               <button onClick={() => { setShowAlternativesFor(null); setAlternativeResponses(null); }} className="text-xs text-gray-500">✕</button>
//                             </div>
//                             <div className="space-y-2">
//                               {alternativeResponses.alternatives.map((alt, altIdx) => {
//                                 const labels = ["📖 Simple & Easy", "🔍 Detailed & Complete", "⚡ Short & Concise"];
//                                 const colors = ["border-green-300 bg-green-50", "border-blue-300 bg-blue-50", "border-orange-300 bg-orange-50"];
//                                 return (
//                                   <button key={altIdx} onClick={() => replaceWithAlternative(message.id, alt, labels[altIdx])} className={`w-full text-left p-3 rounded-lg border text-sm transition-all hover:shadow-md ${colors[altIdx]} ${darkMode ? "text-gray-200 dark:bg-opacity-20" : "text-gray-700"}`}>
//                                     <div className="font-semibold mb-1">{labels[altIdx]}</div>
//                                     <div className="text-xs opacity-90 line-clamp-3">{alt.length > 200 ? alt.substring(0, 200) + "..." : alt}</div>
//                                   </button>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}
//                     </div>
//                   ))}
                  
//                   {isLoading && (
//                     <div className="flex justify-start">
//                       <div className={`rounded-2xl rounded-bl-sm p-3 shadow-md ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-blue-100 to-purple-100"}`}>
//                         <div className="flex gap-1">
//                           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
//                           <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
//                           <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   <div ref={messagesEndRef} />
//                 </div>
                
//                 <div className={`p-4 border-t ${darkMode ? "border-gray-800" : "border-blue-100"}`}>
//                   {imagePreview && (
//                     <div className="mb-3 relative inline-block">
//                       <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-lg border-2 border-purple-500" />
//                       <button onClick={() => { setSelectedImage(null); setImagePreview(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600">×</button>
//                     </div>
//                   )}
//                   <div className="flex gap-2">
//                     <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageSelect} className="hidden" />
//                     <button onClick={() => fileInputRef.current?.click()} className={`p-2 rounded-xl transition-all ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-purple-100 hover:bg-purple-200 text-purple-600"}`} title={t("image.upload")}>
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                     </button>
//                     <textarea 
//                       value={inputValue} 
//                       onChange={(e) => setInputValue(e.target.value)} 
//                       onKeyPress={handleKeyPress} 
//                       placeholder={t("ai.placeholder")} 
//                       rows={2} 
//                       className={`flex-1 px-3 py-2 rounded-xl border resize-none text-sm transition-all focus:ring-2 focus:ring-purple-500 ${
//                         darkMode ? "border-gray-700 bg-gray-800 text-white focus:border-purple-500" : "border-purple-200 bg-white text-gray-800 focus:border-purple-500"
//                       }`} 
//                     />
//                     <button 
//                       onClick={selectedImage ? sendImageMessage : handleSendMessage} 
//                       disabled={isLoading || (!inputValue.trim() && !selectedImage)} 
//                       className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl disabled:opacity-50 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md"
//                     >
//                       {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// const ScrollToTop = () => {
//   const { pathname } = useLocation();
//   useEffect(() => window.scrollTo(0, 0), [pathname]);
//   return null;
// };

// const AppContent = () => {
//   const { darkMode, toggleDarkMode } = useDarkMode();
  
//   return (
//     <>
//       <ScrollToTop />
//       <div className={`min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}>
//         <ToastContainer position="top-right" autoClose={3000} theme={darkMode ? "dark" : "light"} />
//         <Navbar darkMode={darkMode} onDarkModeToggle={toggleDarkMode} />
//         <div className="pt-16 lg:pt-20">
//           <Routes>
//             <Route path="/" element={<Hero />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/quiz-generator" element={<QuizGenerator />} />
//             <Route path="/recommendations" element={<CourseRecommendation />} />
//           </Routes>
//         </div>
//         <Footer />
//         <AITutorChat />
//       </div>
//     </>
//   );
// };

// export const App = () => {
//   return (
//     <DarkModeProvider>
//       <LanguageProvider>
//         <AppContent />
//       </LanguageProvider>
//     </DarkModeProvider>
//   );
// };
// ***************************************************************************************
/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";

// Components
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { Hero } from "./components/hero/Hero";
import { About } from "./pages/about/About";
import { Services } from "./pages/services/Services";
import { QuizGenerator } from "./pages/quiz/QuizGenerator";
import { CourseRecommendation } from "./components/recommandation/CourseRecommandation";

// ==================== DARK MODE CONTEXT ====================
interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("useDarkMode must be used within DarkModeProvider");
  return context;
};

const DarkModeProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const toggleDarkMode = (): void => setDarkMode(!darkMode);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// ==================== LANGUAGE CONTEXT ====================
type Language = "en" | "rw" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

const translations = {
  en: {
    "app.welcome": "Welcome to E-Learning",
    "app.subtitle": "Learn anytime, anywhere",
    "ai.title": "AI Tutor",
    "ai.placeholder": "Ask me anything about code, math, science...",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "chat.clear": "Clear Chat",
    "chat.clearAll": "Clear All",
    "chat.clearConfirm": "Chat history cleared!",
    "chat.autoClear": "Auto-clear in",
    "image.analyzing": "Analyzing image...",
    "image.upload": "Upload Image",
    "reload.response": "Reload Response",
    "code.copy": "Copy Code",
    "code.copied": "Copied!",
    "code.download": "Download",
    "code.showMore": "Show More",
    "code.showLess": "Show Less",
    "deepseek.mode": "🐋 DeepSeek Mode",
    "openrouter.mode": "🤖 OpenRouter Mode",
    "general.mode": "📚 General Mode",
    "api.error": "Service temporarily unavailable. Please try again in a moment.",
  },
  rw: {
    "app.welcome": "Murakaza neza muri E-Learning",
    "app.subtitle": "Wiga igihe cyose, aho uhari",
    "ai.title": "Umurezi wa AI",
    "ai.placeholder": "Mumbaze ikintu icyo aricyo cyose...",
    "nav.home": "Ahabanza",
    "nav.about": "Ibyacu",
    "nav.services": "Serivisi",
    "chat.clear": "Gukura Ibikubiyemo",
    "chat.clearAll": "Gukura Byose",
    "chat.clearConfirm": "Amakuru y'ikibazo yakuweho!",
    "chat.autoClear": "Gukura bwite nyuma ya",
    "image.analyzing": "Isesengura ifoto...",
    "image.upload": "Ohereza Ifoto",
    "reload.response": "Ongera Usubireho",
    "code.copy": "Koporora Kode",
    "code.copied": "Yakoporowe!",
    "code.download": "Kurura",
    "code.showMore": "Reba Byinshi",
    "code.showLess": "Reba Bike",
    "deepseek.mode": "🐋 Ikoreshwa rya DeepSeek",
    "openrouter.mode": "🤖 Ikoreshwa rya OpenRouter",
    "general.mode": "📚 Ikoreshwa rusange",
    "api.error": "Serivisi ntihari. Ongera ugerageze nyuma y'akanya gato.",
  },
  fr: {
    "app.welcome": "Bienvenue à E-Learning",
    "app.subtitle": "Apprenez à tout moment, n'importe où",
    "ai.title": "Tuteur IA",
    "ai.placeholder": "Demandez-moi n'importe quoi...",
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "chat.clear": "Effacer le Chat",
    "chat.clearAll": "Tout Effacer",
    "chat.clearConfirm": "Historique du chat effacé!",
    "chat.autoClear": "Effacement auto dans",
    "image.analyzing": "Analyse de l'image...",
    "image.upload": "Télécharger l'image",
    "reload.response": "Recharger la réponse",
    "code.copy": "Copier le Code",
    "code.copied": "Copié!",
    "code.download": "Télécharger",
    "code.showMore": "Voir Plus",
    "code.showLess": "Voir Moins",
    "deepseek.mode": "🐋 Mode DeepSeek",
    "openrouter.mode": "🤖 Mode OpenRouter",
    "general.mode": "📚 Mode Général",
    "api.error": "Service temporairement indisponible. Veuillez réessayer.",
  },
};

const LanguageProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return saved === "en" || saved === "rw" || saved === "fr" ? (saved as Language) : "rw";
  });

  useEffect(() => localStorage.setItem("language", language), [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ==================== API KEYS ====================
// Use proper type assertion for import.meta.env
interface ImportMetaEnv {
  VITE_DEEPSEEK_API_KEY?: string;
  VITE_OPENROUTER_API_KEY?: string;
  VITE_GEMINI_API_KEY?: string;
  VITE_HUGGINGFACE_API_KEY?: string;
}

const DEEPSEEK_API_KEY = (import.meta as { env: ImportMetaEnv }).env?.VITE_DEEPSEEK_API_KEY || "";
const OPENROUTER_API_KEY = (import.meta as { env: ImportMetaEnv }).env?.VITE_OPENROUTER_API_KEY || "";
const GEMINI_API_KEY = (import.meta as { env: ImportMetaEnv }).env?.VITE_GEMINI_API_KEY || "";
const HUGGINGFACE_API_KEY = (import.meta as { env: ImportMetaEnv }).env?.VITE_HUGGINGFACE_API_KEY || "";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// ==================== MESSAGE TYPE ====================
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  imageData?: string;
  isImage?: boolean;
  isCodeResponse?: boolean;
  usedApi?: string;
}

// ==================== CODE DETECTION ====================
const isCodeRelatedQuestion = (question: string): boolean => {
  const codeKeywords: string[] = [
    'code', 'programming', 'function', 'class', 'component', 'react', 'vue', 'angular',
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'php',
    'html', 'css', 'algorithm', 'data structure', 'debug', 'error', 'bug', 'fix',
    'implement', 'write a program', 'create a function', 'build a', 'develop a',
    'coding', 'script', 'api', 'database', 'sql', 'mongodb', 'express', 'node',
    'framework', 'library', 'dependency', 'syntax', 'variable', 'loop', 'array',
    'object', 'promise', 'async', 'await', 'tutorial', 'example', 'navbar'
  ];
  
  const lowerQuestion: string = question.toLowerCase();
  return codeKeywords.some(keyword => lowerQuestion.includes(keyword));
};

// ==================== DEEPSEEK API ====================
const callDeepSeek = async (prompt: string, currentLanguage: Language): Promise<string | null> => {
  if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === "") {
    console.log("[DeepSeek] No API key configured");
    return null;
  }

  const langName: string = currentLanguage === "en" ? "English" : currentLanguage === "rw" ? "Kinyarwanda" : "French";
  
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { 
            role: "system", 
            content: `You are DeepSeek, an expert programming assistant. Generate COMPLETE, PRODUCTION-READY code. NEVER use placeholders. Write EVERY line explicitly. Respond in ${langName}.` 
          },
          { 
            role: "user", 
            content: `Generate COMPLETE code for: ${prompt}` 
          }
        ],
        max_tokens: 4096,
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      console.log("[DeepSeek] Success!");
      return data.choices[0].message.content;
    }
    
    if (data.error) {
      console.log("[DeepSeek] Error:", data.error.message);
      if (data.error.message?.includes("Insufficient Balance")) {
        console.log("[DeepSeek] Insufficient balance - will use fallback");
      }
      return null;
    }
    
    return null;
  } catch (error) {
    console.log("[DeepSeek] Exception:", error);
    return null;
  }
};

// ==================== OPENROUTER API (GPT FALLBACK) ====================
const callOpenRouter = async (prompt: string, currentLanguage: Language): Promise<string | null> => {
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === "") {
    console.log("[OpenRouter] No API key configured");
    return null;
  }
  
  const langName: string = currentLanguage === "en" ? "English" : currentLanguage === "rw" ? "Kinyarwanda" : "French";
  
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "E-Learning Platform",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: `You are an expert programming assistant and tutor. Generate COMPLETE, working code. Respond in ${langName}.` 
          },
          { role: "user", content: prompt }
        ],
        max_tokens: 4096,
        temperature: 0.7,
      }),
    });
    
    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      console.log("[OpenRouter] Success!");
      return data.choices[0].message.content;
    }
    
    console.log("[OpenRouter] No response");
    return null;
  } catch (error) {
    console.log("[OpenRouter] Exception:", error);
    return null;
  }
};

// ==================== GEMINI API ====================
const callGemini = async (prompt: string, currentLanguage: Language): Promise<string | null> => {
  if (!GEMINI_API_KEY || !GEMINI_API_KEY.startsWith("AIza")) {
    console.log("[Gemini] No valid API key");
    return null;
  }
  
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
  const langName: string = currentLanguage === "en" ? "English" : currentLanguage === "rw" ? "Kinyarwanda" : "French";
  
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Respond in ${langName}. ${prompt}` }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2000 },
      }),
    });
    
    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      console.log("[Gemini] Success!");
      return data.candidates[0].content.parts[0].text;
    }
    
    return null;
  } catch (error) {
    console.log("[Gemini] Exception:", error);
    return null;
  }
};

// ==================== HUGGINGFACE API ====================
const callHuggingFace = async (prompt: string): Promise<string | null> => {
  if (!HUGGINGFACE_API_KEY || HUGGINGFACE_API_KEY === "") {
    console.log("[HuggingFace] No API key");
    return null;
  }
  
  const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large";
  
  try {
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_length: 500 },
      }),
    });
    
    const data = await response.json();
    
    if (data && data[0] && data[0].generated_text) {
      console.log("[HuggingFace] Success!");
      return data[0].generated_text;
    }
    
    if (data.generated_text) {
      console.log("[HuggingFace] Success!");
      return data.generated_text;
    }
    
    return null;
  } catch (error) {
    console.log("[HuggingFace] Exception:", error);
    return null;
  }
};

// ==================== MAIN AI ROUTER WITH FALLBACK ====================
const getAIResponse = async (
  question: string,
  currentLanguage: Language,
  translateFunc: (key: string) => string
): Promise<{ response: string; isCodeResponse: boolean; usedApi: string }> => {
  
  const isCodeQuestion: boolean = isCodeRelatedQuestion(question);
  
  // For code questions, try APIs in order: DeepSeek -> OpenRouter -> Gemini
  if (isCodeQuestion) {
    console.log("[AI Router] Code question detected");
    
    // Try DeepSeek first
    console.log("[AI Router] Trying DeepSeek...");
    const deepSeekResponse = await callDeepSeek(question, currentLanguage);
    if (deepSeekResponse && deepSeekResponse.length > 100) {
      return { response: deepSeekResponse, isCodeResponse: true, usedApi: "DeepSeek" };
    }
    
    // Try OpenRouter as fallback
    console.log("[AI Router] DeepSeek failed, trying OpenRouter...");
    const openRouterResponse = await callOpenRouter(question, currentLanguage);
    if (openRouterResponse && openRouterResponse.length > 50) {
      return { response: openRouterResponse, isCodeResponse: true, usedApi: "OpenRouter (GPT)" };
    }
    
    // Try Gemini as last resort for code
    console.log("[AI Router] OpenRouter failed, trying Gemini...");
    const geminiResponse = await callGemini(question, currentLanguage);
    if (geminiResponse && geminiResponse.length > 50) {
      return { response: geminiResponse, isCodeResponse: true, usedApi: "Gemini" };
    }
    
    // If all fail
    return {
      response: `⚠️ ${translateFunc("api.error")}\n\nI'm having trouble generating code right now. This is likely because DeepSeek needs credits. Please try:\n\n1. Adding credits to DeepSeek at platform.deepseek.com\n2. Or ask a general question instead\n\nYour question: "${question.substring(0, 100)}..."`,
      isCodeResponse: true,
      usedApi: "None"
    };
  }
  
  // For general questions, try OpenRouter -> Gemini -> HuggingFace
  console.log("[AI Router] General question detected");
  
  // Try OpenRouter first for general questions
  console.log("[AI Router] Trying OpenRouter...");
  const openRouterResponse = await callOpenRouter(question, currentLanguage);
  if (openRouterResponse && openRouterResponse.length > 50) {
    return { response: openRouterResponse, isCodeResponse: false, usedApi: "OpenRouter" };
  }
  
  // Try Gemini
  console.log("[AI Router] OpenRouter failed, trying Gemini...");
  const geminiResponse = await callGemini(question, currentLanguage);
  if (geminiResponse && geminiResponse.length > 50) {
    return { response: geminiResponse, isCodeResponse: false, usedApi: "Gemini" };
  }
  
  // Try HuggingFace
  console.log("[AI Router] Gemini failed, trying HuggingFace...");
  const huggingFaceResponse = await callHuggingFace(question);
  if (huggingFaceResponse && huggingFaceResponse.length > 20) {
    return { response: huggingFaceResponse, isCodeResponse: false, usedApi: "HuggingFace" };
  }
  
  // If all fail
  return {
    response: `⚠️ ${translateFunc("api.error")}\n\nPlease try again in a moment.`,
    isCodeResponse: false,
    usedApi: "None"
  };
};

// ==================== COOKIE STORAGE ====================
const saveChatToCookies = (messages: Message[], expirationHours: number = 24): void => {
  const serialized: string = JSON.stringify(
    messages.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() })),
  );
  const date: Date = new Date();
  date.setTime(date.getTime() + expirationHours * 60 * 60 * 1000);
  document.cookie = `chat_history=${encodeURIComponent(serialized)}; path=/; expires=${date.toUTCString()}; SameSite=Lax`;
};

const loadChatFromCookies = (): Message[] => {
  const match: RegExpMatchArray | null = document.cookie.match(/chat_history=([^;]+)/);
  if (match) {
    try {
      const parsed = JSON.parse(decodeURIComponent(match[1]));
      return parsed.map((m: Message) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      }));
    } catch {
      console.error("Failed to load chat cookies");
    }
  }
  return [
    {
      id: "1",
      text: "# 🌟 Welcome to AI Code Assistant!\n\nI'm powered by **DeepSeek, OpenRouter, Gemini, and HuggingFace** APIs.\n\n## How I Work:\n\n- 🐋 **DeepSeek** - Primary for code (needs credits)\n- 🤖 **OpenRouter/GPT** - Fallback for code & general questions\n- 🧠 **Gemini** - Backup for general questions\n- 🤗 **HuggingFace** - Final fallback\n\n## What I Can Do:\n\n- 💻 Generate complete React/TypeScript components\n- 🐍 Write Python applications\n- 🔧 Create production-ready APIs\n- 📱 Build responsive UIs with Tailwind CSS\n\n## Try These Examples:\n\n```\nCreate a complete React component for a user profile with edit functionality, including TypeScript interfaces, Tailwind CSS, error handling, and form validation\n```\n\n```\nWrite a full Express.js REST API with TypeScript, including CRUD operations, authentication middleware, error handling, and MongoDB integration\n```\n\n**How can I help you today?**",
      isUser: false,
      timestamp: new Date(),
      isCodeResponse: false,
      usedApi: "System",
    },
  ];
};

const clearChatCookies = (): void => {
  document.cookie = "chat_history=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
};

// ==================== CODE DISPLAY COMPONENT ====================
interface CodeDisplayProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

const CodeDisplay = ({ code, language = "typescript", title = "Code Example", showLineNumbers = true }: CodeDisplayProps): React.ReactElement => {
  const { darkMode } = useDarkMode();
  const [copied, setCopied] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const removeComments = (codeStr: string): string => {
    const lines: string[] = codeStr.split('\n');
    let inBlockComment: boolean = false;
    let inString: boolean = false;
    let stringChar: string = '';
    
    const cleanedLines: string[] = lines.map(line => {
      let result: string = '';
      let i: number = 0;
      
      while (i < line.length) {
        if (!inBlockComment && !inString) {
          if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
            inString = true;
            stringChar = line[i];
            result += line[i];
            i++;
            continue;
          }
          if (line[i] === '/' && line[i+1] === '/') {
            break;
          } else if (line[i] === '/' && line[i+1] === '*') {
            inBlockComment = true;
            i += 2;
            continue;
          }
          result += line[i];
          i++;
        } else if (inString) {
          result += line[i];
          if (line[i] === stringChar && line[i-1] !== '\\') {
            inString = false;
          }
          i++;
        } else {
          if (line[i] === '*' && line[i+1] === '/') {
            inBlockComment = false;
            i += 2;
            continue;
          }
          i++;
        }
      }
      
      return result.trim();
    });
    
    return cleanedLines.filter(line => line.length > 0).join('\n');
  };

  const cleanCode: string = removeComments(code);
  const lines: string[] = cleanCode.split('\n');
  const totalLines: number = lines.length;
  const displayCode: string = expanded ? cleanCode : lines.slice(0, 50).join('\n');
  const hasMoreLines: boolean = totalLines > 50;
  
  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      typescript: 'ts', javascript: 'js', python: 'py', html: 'html',
      css: 'css', json: 'json', sql: 'sql', bash: 'sh'
    };
    return extensions[lang] || 'txt';
  };

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      toast.success(`✅ Copied ${totalLines} lines!`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  const downloadCode = (): void => {
    const ext: string = getFileExtension(language);
    const blob: Blob = new Blob([cleanCode], { type: 'text/plain' });
    const url: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`📁 Downloaded ${totalLines} lines!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl overflow-hidden shadow-lg my-4 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      <div className={`flex flex-wrap justify-between items-center px-4 py-2 gap-2 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className={`text-sm font-mono ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {title}.{getFileExtension(language)}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${darkMode ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-700"}`}>
            📄 {totalLines} lines
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className={`p-1.5 rounded-md transition-all flex items-center gap-1 text-xs ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"}`}
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
          <button
            onClick={downloadCode}
            className={`p-1.5 rounded-md transition-all flex items-center gap-1 text-xs ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"}`}
          >
            💾 Download
          </button>
          {hasMoreLines && (
            <button
              onClick={() => setExpanded(!expanded)}
              className={`p-1.5 rounded-md transition-all flex items-center gap-1 text-xs ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"}`}
            >
              {expanded ? "📖 Show Less" : `📚 Show All (${totalLines} lines)`}
            </button>
          )}
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={darkMode ? vscDarkPlus : vs}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.875rem",
          maxHeight: "500px",
          overflow: "auto",
        }}
      >
        {displayCode}
      </SyntaxHighlighter>
    </motion.div>
  );
};

// ==================== AI TUTOR CHAT COMPONENT ====================
const AITutorChat = (): React.ReactElement => {
  const { darkMode } = useDarkMode();
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [autoClearTimer, setAutoClearTimer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeApi, setActiveApi] = useState<string>("DeepSeek");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerIntervalRef = useRef<number | null>(null);
  
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showAlternativesFor, setShowAlternativesFor] = useState<string | null>(null);
  const [alternativeResponses, setAlternativeResponses] = useState<{ messageId: string; alternatives: string[] } | null>(null);
  const [isParaphrasing, setIsParaphrasing] = useState<string | null>(null);

  const AUTO_CLEAR_INTERVAL: number = 300;

  useEffect(() => {
    const saved: Message[] = loadChatFromCookies();
    setMessages(saved);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && messages.length > 0) {
      saveChatToCookies(messages, 24);
    }
  }, [messages, isMounted]);

  useEffect(() => {
    if (autoClearTimer) {
      setTimeRemaining(autoClearTimer);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      
      timerIntervalRef.current = window.setInterval(() => {
        setTimeRemaining((prev: number) => {
          if (prev <= 1) {
            clearChat();
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            toast.info(t("chat.clearConfirm"));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setTimeRemaining(0);
    }
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [autoClearTimer]);

  const clearChat = (): void => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: "# 🌟 Chat Cleared!\n\nI'm still here to help! What would you like me to build for you today?\n\n**Current API Status:**\n- 🐋 DeepSeek: Configured (needs credits for best results)\n- 🤖 OpenRouter: ✅ Ready (will auto-fallback)\n- 🧠 Gemini: ✅ Ready\n- 🤗 HuggingFace: ✅ Ready\n\nAsk me anything!",
      isUser: false,
      timestamp: new Date(),
      isCodeResponse: false,
      usedApi: "System",
    };
    setMessages([welcomeMessage]);
    clearChatCookies();
    setAutoClearTimer(null);
    toast.success(t("chat.clearConfirm"));
  };

  const startAutoClear = (): void => {
    if (autoClearTimer) {
      setAutoClearTimer(AUTO_CLEAR_INTERVAL);
    } else {
      setAutoClearTimer(AUTO_CLEAR_INTERVAL);
      toast.info(`Chat will auto-clear in ${AUTO_CLEAR_INTERVAL} seconds`);
    }
  };

  const stopAutoClear = (): void => {
    setAutoClearTimer(null);
    toast.info("Auto-clear disabled");
  };

  const copyToClipboard = async (text: string, messageId: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      toast.success("📋 Response copied!");
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const getPreviousUserMessage = (currentIndex: number): string => {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (messages[i].isUser) {
        return messages[i].text;
      }
    }
    return "";
  };

  const generateAlternatives = async (messageId: string, originalText: string, originalQuestion: string): Promise<void> => {
    setIsParaphrasing(messageId);
    setShowAlternativesFor(messageId);
    
    const paraphrasePrompt: string = `Rewrite the following answer in 3 different ways:

Original question: "${originalQuestion}"
Original answer: "${originalText.substring(0, 1000)}"

Provide exactly 3 versions:
1. SIMPLE - Easy to understand
2. DETAILED - Comprehensive with examples
3. CONCISE - Short and to the point

Format: [SIMPLE] version1 [DETAILED] version2 [CONCISE] version3`;
    
    try {
      const { response } = await getAIResponse(paraphrasePrompt, language, t);
      
      const simpleMatch: RegExpMatchArray | null = response.match(/\[SIMPLE\]([\s\S]*?)\[DETAILED\]/);
      const detailedMatch: RegExpMatchArray | null = response.match(/\[DETAILED\]([\s\S]*?)\[CONCISE\]/);
      const conciseMatch: RegExpMatchArray | null = response.match(/\[CONCISE\]([\s\S]*?)$/);
      
      const alternatives: string[] = [
        simpleMatch ? simpleMatch[1].trim() : "📖 " + originalText.substring(0, 200),
        detailedMatch ? detailedMatch[1].trim() : "🔍 " + originalText,
        conciseMatch ? conciseMatch[1].trim() : "⚡ " + originalText.split('.')[0] + "."
      ];
      
      setAlternativeResponses({ messageId, alternatives });
      toast.info("✨ Alternative versions ready!");
    } catch {
      setAlternativeResponses({ 
        messageId, 
        alternatives: [
          "📖 Simple:\n" + originalText.substring(0, 200),
          "🔍 Detailed:\n" + originalText,
          "⚡ Concise:\n" + originalText.split('.')[0]
        ] 
      });
      toast.info("✨ Alternative versions ready!");
    } finally {
      setIsParaphrasing(null);
    }
  };

  const replaceWithAlternative = (messageId: string, newText: string, versionLabel: string): void => {
    const newMessages: Message[] = messages.map(msg => 
      msg.id === messageId ? { ...msg, text: newText } : msg
    );
    setMessages(newMessages);
    setShowAlternativesFor(null);
    setAlternativeResponses(null);
    toast.success(`✅ Changed to ${versionLabel} version`);
  };

  const reloadResponse = async (messageId: string, userText: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const { response, isCodeResponse, usedApi } = await getAIResponse(userText, language, t);
      const newMessages: Message[] = messages.map(msg => 
        msg.id === messageId ? { ...msg, text: response, timestamp: new Date(), isCodeResponse, usedApi } : msg
      );
      setMessages(newMessages);
      setActiveApi(usedApi);
      toast.success(`✅ Response reloaded using ${usedApi}!`);
    } catch {
      toast.error("Failed to reload response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setSelectedImage(file);
      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendImageMessage = async (): Promise<void> => {
    if (!selectedImage || !imagePreview) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim() || "📸 Analyze this image",
      isUser: true,
      timestamp: new Date(),
      imageData: imagePreview,
      isImage: true,
    };
    
    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInputValue("");
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsLoading(true);
    
    const { response, isCodeResponse, usedApi } = await getAIResponse(inputValue.trim() || "Describe this image", language, t);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date(),
      isCodeResponse,
      usedApi,
    };
    setMessages((prev: Message[]) => [...prev, aiMessage]);
    setActiveApi(usedApi);
    setIsLoading(false);
  };

  const handleSendMessage = async (): Promise<void> => {
    const trimmed: string = inputValue.trim();
    if (trimmed.length < 2) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    const { response, isCodeResponse, usedApi } = await getAIResponse(trimmed, language, t);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date(),
      isCodeResponse,
      usedApi,
    };
    setMessages((prev: Message[]) => [...prev, aiMessage]);
    setActiveApi(usedApi);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (selectedImage) {
        sendImageMessage();
      } else {
        handleSendMessage();
      }
    }
  };

  const formatTime = (date: Date): string => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
  const formatTimeRemaining = (seconds: number): string => {
    const mins: number = Math.floor(seconds / 60);
    const secs: number = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getApiBadge = (usedApi?: string): React.ReactElement | null => {
    if (!usedApi || usedApi === "System") return null;
    
    const badges: Record<string, { color: string; icon: string }> = {
      "DeepSeek": { color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400", icon: "🐋" },
      "OpenRouter": { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400", icon: "🤖" },
      "OpenRouter (GPT)": { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400", icon: "🤖" },
      "Gemini": { color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400", icon: "🧠" },
      "HuggingFace": { color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400", icon: "🤗" },
    };
    
    const badge = badges[usedApi] || { color: "bg-gray-100 text-gray-700", icon: "🔌" };
    
    return (
      <span className={`text-[10px] px-2 py-0.5 rounded-full ${badge.color} flex items-center gap-1`}>
        <span>{badge.icon}</span> {usedApi}
      </span>
    );
  };

  const renderMessageContent = (text: string, isCodeResponse: boolean = false): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let lastIndex: number = 0;
    const codeBlockRegex: RegExp = /```(\w*)\n([\s\S]*?)```/g;
    let match: RegExpExecArray | null;
    
    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <div key={`text-${lastIndex}`} className="whitespace-pre-wrap">
            {text.substring(lastIndex, match.index)}
          </div>
        );
      }
      const [, lang, code] = match;
      parts.push(
        <CodeDisplay 
          key={`code-${match.index}`} 
          code={code.trim()} 
          language={lang || (isCodeResponse ? 'javascript' : 'text')} 
          title="Code" 
        />
      );
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      parts.push(
        <div key={`text-${lastIndex}`} className="whitespace-pre-wrap">
          {text.substring(lastIndex)}
        </div>
      );
    }
    
    return parts.length > 0 ? parts : <div className="whitespace-pre-wrap">{text}</div>;
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(0, 150, 255, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 p-3 sm:p-4 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 
                w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] 2xl:w-[55%]
                h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[70vh] xl:h-[65vh] 2xl:h-[60vh]
                max-w-[1400px] min-w-[280px] max-h-[900px] min-h-[450px]
                rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className={`flex flex-col h-full ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}>
                {/* Header */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      </div>
                      <h3 className="font-semibold text-base sm:text-lg">
                        🧠 Multi-AI Code Assistant
                      </h3>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-[11px] text-white/80">
                      🐋 DeepSeek | 🤖 OpenRouter | 🧠 Gemini | 🤗 HuggingFace
                    </p>
                    <div className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                      Active: {activeApi}
                    </div>
                  </div>
                </div>
                
                {/* Controls */}
                <div className={`flex items-center justify-between px-4 py-2.5 border-b ${darkMode ? "border-gray-800 bg-gray-800/50" : "border-blue-100 bg-white/50"}`}>
                  <div className="flex gap-2">
                    <button onClick={clearChat} className={`text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${darkMode ? "bg-red-900/50 text-red-300 hover:bg-red-800" : "bg-red-100 text-red-600 hover:bg-red-200"}`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {t("chat.clearAll")}
                    </button>
                    {!autoClearTimer ? (
                      <button onClick={startAutoClear} className={`text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${darkMode ? "bg-green-900/50 text-green-300 hover:bg-green-800" : "bg-green-100 text-green-600 hover:bg-green-200"}`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Auto (5m)
                      </button>
                    ) : (
                      <button onClick={stopAutoClear} className={`text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${darkMode ? "bg-yellow-900/50 text-yellow-300 hover:bg-yellow-800" : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"}`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9l4 4-4 4" />
                        </svg>
                        Stop
                      </button>
                    )}
                  </div>
                  {autoClearTimer && timeRemaining > 0 && (
                    <div className={`text-xs font-mono ${darkMode ? "text-gray-400" : "text-blue-500"}`}>
                      ⏱️ {formatTimeRemaining(timeRemaining)}
                    </div>
                  )}
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message: Message, idx: number) => (
                    <div key={message.id}>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] rounded-2xl p-3 shadow-md ${
                          message.isUser
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm"
                            : darkMode ? "bg-gray-800 text-gray-200 rounded-bl-sm border border-gray-700"
                            : message.isCodeResponse
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-gray-800 rounded-bl-sm border-l-4 border-green-500"
                              : "bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 rounded-bl-sm"
                        }`}>
                          {message.isImage && message.imageData && (
                            <div className="mb-2">
                              <img src={message.imageData} alt="User uploaded" className="max-w-full max-h-32 rounded-lg object-cover" />
                            </div>
                          )}
                          <div className="flex justify-between items-center mb-1">
                            {!message.isUser && getApiBadge(message.usedApi)}
                          </div>
                          <div className="text-sm">
                            {renderMessageContent(message.text, message.isCodeResponse)}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className={`text-[10px] ${message.isUser ? "text-white/70" : darkMode ? "text-gray-500" : "text-purple-600/70"}`}>
                              {formatTime(message.timestamp)}
                            </p>
                            {!message.isUser && (
                              <div className="flex gap-2">
                                <button onClick={() => copyToClipboard(message.text, message.id)} className={`text-[10px] px-2 py-0.5 rounded transition-all flex items-center gap-1 ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white/50 hover:bg-white"}`}>
                                  {copiedMessageId === message.id ? "✅" : "📋 Copy"}
                                </button>
                                <button onClick={() => generateAlternatives(message.id, message.text, getPreviousUserMessage(idx))} disabled={isParaphrasing === message.id} className={`text-[10px] px-2 py-0.5 rounded transition-all flex items-center gap-1 ${darkMode ? "bg-purple-900/50 hover:bg-purple-800" : "bg-purple-100 hover:bg-purple-200 text-purple-700"}`}>
                                  {isParaphrasing === message.id ? "⏳" : "🔄 Para"}
                                </button>
                                <button onClick={() => reloadResponse(message.id, getPreviousUserMessage(idx))} disabled={isLoading} className={`text-[10px] px-2 py-0.5 rounded transition-all flex items-center gap-1 ${darkMode ? "bg-orange-900/50 hover:bg-orange-800" : "bg-orange-100 hover:bg-orange-200 text-orange-700"}`}>
                                  🔄 Reload
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                      
                      {showAlternativesFor === message.id && alternativeResponses?.messageId === message.id && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="ml-12 mt-2 mr-8">
                          <div className={`rounded-xl p-3 ${darkMode ? "bg-purple-900/40 border border-purple-600" : "bg-purple-50 border border-purple-200"}`}>
                            <div className="flex justify-between items-center mb-2">
                              <p className={`text-xs font-semibold ${darkMode ? "text-purple-300" : "text-purple-700"}`}>📝 Choose a version:</p>
                              <button onClick={() => { setShowAlternativesFor(null); setAlternativeResponses(null); }} className="text-xs text-gray-500">✕</button>
                            </div>
                            <div className="space-y-2">
                              {alternativeResponses.alternatives.map((alt: string, altIdx: number) => {
                                const labels: string[] = ["📖 Simple & Easy", "🔍 Detailed & Complete", "⚡ Short & Concise"];
                                const colors: string[] = ["border-green-300 bg-green-50", "border-blue-300 bg-blue-50", "border-orange-300 bg-orange-50"];
                                return (
                                  <button key={altIdx} onClick={() => replaceWithAlternative(message.id, alt, labels[altIdx])} className={`w-full text-left p-3 rounded-lg border text-sm transition-all hover:shadow-md ${colors[altIdx]} ${darkMode ? "text-gray-200 dark:bg-opacity-20" : "text-gray-700"}`}>
                                    <div className="font-semibold mb-1">{labels[altIdx]}</div>
                                    <div className="text-xs opacity-90 line-clamp-3">{alt.length > 200 ? alt.substring(0, 200) + "..." : alt}</div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className={`rounded-2xl rounded-bl-sm p-3 shadow-md ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-blue-100 to-purple-100"}`}>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                          <span className="text-xs text-gray-500">Contacting API...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input Area */}
                <div className={`p-4 border-t ${darkMode ? "border-gray-800" : "border-blue-100"}`}>
                  {imagePreview && (
                    <div className="mb-3 relative inline-block">
                      <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-lg border-2 border-purple-500" />
                      <button onClick={() => { setSelectedImage(null); setImagePreview(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600">×</button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageSelect} className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} className={`p-2 rounded-xl transition-all ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-purple-100 hover:bg-purple-200 text-purple-600"}`} title={t("image.upload")}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <textarea 
                      value={inputValue} 
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)} 
                      onKeyPress={handleKeyPress} 
                      placeholder={t("ai.placeholder")} 
                      rows={2} 
                      className={`flex-1 px-3 py-2 rounded-xl border resize-none text-sm transition-all focus:ring-2 focus:ring-purple-500 ${
                        darkMode ? "border-gray-700 bg-gray-800 text-white focus:border-purple-500" : "border-purple-200 bg-white text-gray-800 focus:border-purple-500"
                      }`} 
                    />
                    <button 
                      onClick={selectedImage ? sendImageMessage : handleSendMessage} 
                      disabled={isLoading || (!inputValue.trim() && !selectedImage)} 
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl disabled:opacity-50 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md"
                    >
                      {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="text-[10px] text-center mt-2 text-gray-400">
                    💡 APIs: DeepSeek → OpenRouter → Gemini → HuggingFace (auto-fallback)
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const ScrollToTop = (): null => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = (): React.ReactElement => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <>
      <ScrollToTop />
      <div className={`min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}>
        <ToastContainer position="top-right" autoClose={3000} theme={darkMode ? "dark" : "light"} />
        <Navbar darkMode={darkMode} onDarkModeToggle={toggleDarkMode} />
        <div className="pt-16 lg:pt-20">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/quiz-generator" element={<QuizGenerator />} />
            <Route path="/recommendations" element={<CourseRecommendation />} />
          </Routes>
        </div>
        <Footer />
        <AITutorChat />
      </div>
    </>
  );
};

export const App = (): React.ReactElement => {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </DarkModeProvider>
  );
};