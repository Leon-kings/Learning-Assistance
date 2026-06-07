/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
// App.tsx - MODIFIED: Removed Quiz, Progress, Certificate, Recommended Courses
// Added: Chat clearing by time interval or manual delete
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
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

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("useDarkMode must be used within DarkModeProvider");
  return context;
};

const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

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

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

const translations = {
  en: {
    "app.welcome": "Welcome to E-Learning",
    "app.subtitle": "Learn anytime, anywhere",
    "ai.title": "AI Tutor",
    "ai.placeholder": "Ask me anything...",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "chat.clear": "Clear Chat",
    "chat.clearAll": "Clear All",
    "chat.clearConfirm": "Chat history cleared!",
    "chat.autoClear": "Auto-clear in",
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
  },
};

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return saved === "en" || saved === "rw" || saved === "fr"
      ? (saved as Language)
      : "rw";
  });

  useEffect(() => localStorage.setItem("language", language), [language]);

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

// ==================== API KEYS ====================
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || "";

// ==================== COOKIE STORAGE FOR CHAT ====================
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Cookie utilities with expiration
const saveChatToCookies = (
  messages: Message[],
  expirationHours: number = 24,
) => {
  const serialized = JSON.stringify(
    messages.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() })),
  );
  const date = new Date();
  date.setTime(date.getTime() + expirationHours * 60 * 60 * 1000);
  document.cookie = `chat_history=${encodeURIComponent(serialized)}; path=/; expires=${date.toUTCString()}; SameSite=Lax`;
};

const loadChatFromCookies = (): Message[] => {
  const match = document.cookie.match(/chat_history=([^;]+)/);
  if (match) {
    try {
      const parsed = JSON.parse(decodeURIComponent(match[1]));
      return parsed.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      }));
    } catch (e) {
      console.error("Failed to load chat cookies", e);
    }
  }
  return [
    {
      id: "1",
      text: "🌟 Hello! I'm your AI Tutor. Ask me anything about science, math, programming, or any subject! I support English, Kinyarwanda, and French.",
      isUser: false,
      timestamp: new Date(),
    },
  ];
};

const clearChatCookies = () => {
  document.cookie =
    "chat_history=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
};

// ==================== AI RESPONSE (Working with your keys) ====================
const getAIResponse = async (
  question: string,
  language: Language,
): Promise<string> => {
  const langName =
    language === "en"
      ? "English"
      : language === "rw"
        ? "Kinyarwanda"
        : "French";
  const prompt = `Answer in ${langName} language. Be detailed and helpful. Question: ${question}`;

  if (OPENROUTER_API_KEY && OPENROUTER_API_KEY !== "") {
    try {
      console.log("Trying OpenRouter API...");
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": window.location.origin,
            "X-Title": "E-Learning Platform",
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 500,
            temperature: 0.7,
          }),
        },
      );

      const data = await response.json();
      console.log("OpenRouter response:", data);

      const text = data.choices?.[0]?.message?.content;
      if (text && text.length > 20) {
        return text;
      }
    } catch (error) {
      console.error("OpenRouter error:", error);
    }
  }

  if (GEMINI_API_KEY && GEMINI_API_KEY.startsWith("AIza")) {
    try {
      console.log("Trying Gemini API...");
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
          }),
        },
      );

      const data = await response.json();
      console.log("Gemini response:", data);

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.length > 20) {
        return text;
      }
    } catch (error) {
      console.error("Gemini error:", error);
    }
  }

  if (HUGGINGFACE_API_KEY && HUGGINGFACE_API_KEY !== "") {
    try {
      console.log("Trying HuggingFace API...");
      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-large",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: { max_length: 500, temperature: 0.7 },
          }),
        },
      );

      const data = await response.json();
      console.log("HuggingFace response:", data);

      const text = data[0]?.generated_text || data.generated_text;
      if (text && text.length > 20) {
        return text;
      }
    } catch (error) {
      console.error("HuggingFace error:", error);
    }
  }

  return `💡 I'm having trouble connecting to my AI services. Please check your API keys in the .env file.

Your question was: "${question}"

Available keys:
• OpenRouter: ${OPENROUTER_API_KEY ? "✅" : "❌"}
• Gemini: ${GEMINI_API_KEY ? "✅" : "❌"}
• HuggingFace: ${HUGGINGFACE_API_KEY ? "✅" : "❌"}`;
};

// ==================== AI TUTOR CHAT (Enhanced with Clear Options & Attractive Colors) ====================
const AITutorChat = () => {
  const { darkMode } = useDarkMode();
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoClearTimer, setAutoClearTimer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const timerIntervalRef = useRef<number | null>(null);

  // Auto-clear settings (in seconds) - set to 300 seconds (5 minutes) as default
  const AUTO_CLEAR_INTERVAL = 300; // 5 minutes

  // Load from cookies
  useEffect(() => {
    const saved = loadChatFromCookies();
    setMessages(saved);
    setIsMounted(true);
  }, []);

  // Save to cookies (expires in 24 hours)
  useEffect(() => {
    if (isMounted && messages.length > 0) {
      saveChatToCookies(messages, 24);
    }
  }, [messages, isMounted]);

  // Auto-clear timer effect
  useEffect(() => {
    if (autoClearTimer) {
      setTimeRemaining(autoClearTimer);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

      timerIntervalRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Time's up - clear chat
            clearChat();
            if (timerIntervalRef.current)
              clearInterval(timerIntervalRef.current);
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

  const clearChat = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: "🌟 Chat cleared! Hello again! I'm your AI Tutor. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    clearChatCookies();
    setAutoClearTimer(null);
    toast.success(t("chat.clearConfirm"));
  };

  const startAutoClear = () => {
    if (autoClearTimer) {
      // Reset timer
      setAutoClearTimer(AUTO_CLEAR_INTERVAL);
    } else {
      setAutoClearTimer(AUTO_CLEAR_INTERVAL);
      toast.info(`Chat will auto-clear in ${AUTO_CLEAR_INTERVAL} seconds`);
    }
  };

  const stopAutoClear = () => {
    setAutoClearTimer(null);
    toast.info("Auto-clear disabled");
  };

  const handleSendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || trimmed.length < 2) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const response = await getAIResponse(trimmed, language);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatTimeRemaining = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 25px rgba(236, 72, 153, 0.5)",
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 p-3 sm:p-4 rounded-full shadow-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-16 sm:bottom-24 right-2 sm:right-6 z-50 w-[95%] sm:w-96 h-[500px] sm:h-[550px] max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div
                className={`flex flex-col h-full ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-indigo-50 via-white to-pink-50"}`}
              >
                {/* Header with gradient colors */}
                <div className="p-3 sm:p-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <h3 className="font-semibold text-sm sm:text-base">
                        ✨ AI Tutor{" "}
                        {language === "en"
                          ? "Assistant"
                          : language === "rw"
                            ? "Umufasha"
                            : "Assistant"}
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-[10px] text-white/80 mt-1">
                    🚀 Powered by OpenRouter + Gemini + HuggingFace
                  </p>
                </div>

                {/* Chat Controls Bar */}
                <div
                  className={`flex items-center justify-between px-3 py-2 border-b ${darkMode ? "border-gray-800 bg-gray-800/50" : "border-indigo-100 bg-white/50"}`}
                >
                  <div className="flex gap-2">
                    <button
                      onClick={clearChat}
                      className={`text-xs px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${darkMode ? "bg-red-900/50 text-red-300 hover:bg-red-800" : "bg-red-100 text-red-600 hover:bg-red-200"}`}
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      {t("chat.clearAll")}
                    </button>
                    {!autoClearTimer ? (
                      <button
                        onClick={startAutoClear}
                        className={`text-xs px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${darkMode ? "bg-green-900/50 text-green-300 hover:bg-green-800" : "bg-green-100 text-green-600 hover:bg-green-200"}`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Auto (5m)
                      </button>
                    ) : (
                      <button
                        onClick={stopAutoClear}
                        className={`text-xs px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${darkMode ? "bg-yellow-900/50 text-yellow-300 hover:bg-yellow-800" : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"}`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 9l4 4-4 4"
                          />
                        </svg>
                        Stop
                      </button>
                    )}
                  </div>
                  {autoClearTimer && timeRemaining > 0 && (
                    <div
                      className={`text-xs font-mono ${darkMode ? "text-gray-400" : "text-indigo-500"}`}
                    >
                      ⏱️ {formatTimeRemaining(timeRemaining)}
                    </div>
                  )}
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-2.5 sm:p-3 shadow-md ${
                          message.isUser
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-br-sm"
                            : darkMode
                              ? "bg-gray-800 text-gray-200 rounded-bl-sm border border-gray-700"
                              : "bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-800 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">
                          {message.text}
                        </p>
                        <p
                          className={`text-[8px] sm:text-[10px] mt-1 ${message.isUser ? "text-white/70" : darkMode ? "text-gray-500" : "text-purple-600/70"}`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div
                        className={`rounded-2xl rounded-bl-sm p-2.5 sm:p-3 shadow-md ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-indigo-100 to-purple-100"}`}
                      >
                        <div className="flex gap-1">
                          <div
                            className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div
                  className={`p-3 sm:p-4 border-t ${darkMode ? "border-gray-800" : "border-indigo-100"}`}
                >
                  <div className="flex gap-2">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t("ai.placeholder")}
                      rows={2}
                      className={`flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl border resize-none text-sm transition-all focus:ring-2 focus:ring-purple-500 ${
                        darkMode
                          ? "border-gray-700 bg-gray-800 text-white focus:border-purple-500"
                          : "border-indigo-200 bg-white text-gray-800 focus:border-purple-500"
                      }`}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl disabled:opacity-50 hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-md"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      )}
                    </button>
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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

// ==================== MAIN APP (Login/Register Removed from Navbar) ====================
const AppContent = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <ScrollToTop />
      <div
        className={`min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-indigo-50 via-white to-pink-50"}`}
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme={darkMode ? "dark" : "light"}
        />
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

export const App = () => {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </DarkModeProvider>
  );
};
