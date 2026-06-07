/* eslint-disable react-hooks/set-state-in-effect */
// components/QuizGenerator.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useDarkMode, useLanguage } from "../../App";
import { toast } from "react-toastify";

// ==================== TYPES ====================
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  userAnswer?: number;
  isCorrect?: boolean;
}

interface QuizResult {
  topic: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: { questionId: number; userAnswer: number; isCorrect: boolean }[];
  completedAt: Date;
}

// ==================== API KEYS FROM ENV ====================
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// ==================== AI QUIZ GENERATOR COMPONENT ====================
export const QuizGenerator = () => {
  const { darkMode } = useDarkMode();
  const { language } = useLanguage();

  // Quiz generation state
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium",
  );
  const [numQuestions, setNumQuestions] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);

  // Quiz state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Saved quizzes
  const [savedQuizzes, setSavedQuizzes] = useState<QuizResult[]>([]);

  // Translations
  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      "title": {
        en: "AI Quiz Generator",
        rw: "Ikiranga Ibibazo na AI",
        fr: "Générateur de Quiz IA"
      },
      "subtitle": {
        en: "Test your knowledge with AI-generated quizzes",
        rw: "Gerageza ubumenyi bwawe n'ibibazo byakozwe na AI",
        fr: "Testez vos connaissances avec des quiz générés par IA"
      },
      "topicPlaceholder": {
        en: "Topic (e.g., Photosynthesis, JavaScript, History)",
        rw: "Umutinga (Urugero: Photosynthesis, JavaScript, Amateka)",
        fr: "Sujet (ex: Photosynthèse, JavaScript, Histoire)"
      },
      "easy": {
        en: "Easy",
        rw: "Byoroshye",
        fr: "Facile"
      },
      "medium": {
        en: "Medium",
        rw: "Biciriritse",
        fr: "Moyen"
      },
      "hard": {
        en: "Hard",
        rw: "Bigoye",
        fr: "Difficile"
      },
      "questions": {
        en: "Questions",
        rw: "Ibibazo",
        fr: "Questions"
      },
      "generate": {
        en: "Generate AI Quiz",
        rw: "Kora Ibibazo na AI",
        fr: "Générer un Quiz IA"
      },
      "generating": {
        en: "AI is generating your quiz...",
        rw: "AI irema ibibazo byawe...",
        fr: "L'IA génère votre quiz..."
      },
      "question": {
        en: "Question",
        rw: "Ikibazo",
        fr: "Question"
      },
      "of": {
        en: "of",
        rw: "muri",
        fr: "de"
      },
      "complete": {
        en: "Complete",
        rw: "Byuzuye",
        fr: "Complet"
      },
      "previous": {
        en: "Previous",
        rw: "Ibibanza",
        fr: "Précédent"
      },
      "next": {
        en: "Next",
        rw: "Gikurikira",
        fr: "Suivant"
      },
      "submit": {
        en: "Submit Quiz",
        rw: "Tanga Ibisubizo",
        fr: "Soumettre le Quiz"
      },
      "correct": {
        en: "Correct",
        rw: "Byiza",
        fr: "Correct"
      },
      "congratulations": {
        en: "Congratulations! You passed!",
        rw: "Urakoze! Watsinze!",
        fr: "Félicitations! Vous avez réussi!"
      },
      "keepPracticing": {
        en: "Keep practicing! You'll do better next time.",
        rw: "Komeza witoza! Uzitwara neza kurundi rugendo.",
        fr: "Continuez à vous entraîner! Vous ferez mieux la prochaine fois."
      },
      "reviewAnswers": {
        en: "Review Your Answers",
        rw: "Suzuma Ibisubizo Byawe",
        fr: "Revoir Vos Réponses"
      },
      "yourAnswer": {
        en: "Your answer",
        rw: "Igisubizo cyawe",
        fr: "Votre réponse"
      },
      "correctAnswer": {
        en: "Correct answer",
        rw: "Igisubizo nyacyo",
        fr: "Bonne réponse"
      },
      "takeNewQuiz": {
        en: "Take New Quiz",
        rw: "Kora Ikizamini Gishya",
        fr: "Faire un Nouveau Quiz"
      },
      "quizHistory": {
        en: "Quiz History",
        rw: "Amateka y'Ibizamini",
        fr: "Historique des Quiz"
      },
      "poweredBy": {
        en: "Powered by AI | Real-time quiz generation",
        rw: "Ikoresha AI | Irema ibibazo ako kanya",
        fr: "Alimenté par IA | Génération de quiz en temps réel"
      },
      "freeAccess": {
        en: "✨ Free • No Registration Needed • Start Testing Instantly",
        rw: "✨ Ku Buntu • Nta Kwiyandikisha Birakenewe • Tangira Ako Kanya",
        fr: "✨ Gratuit • Aucune Inscription Requise • Commencez Instantanément"
      },
      "score": {
        en: "Score",
        rw: "Amanota",
        fr: "Score"
      },
      "correctCount": {
        en: "Correct",
        rw: "Byiza",
        fr: "Correct"
      }
    };
    return translations[key]?.[language] || translations[key]?.["en"] || key;
  };

  // Load saved quizzes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("quizResults");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedQuizzes(
          parsed.map((r: any) => ({
            ...r,
            completedAt: new Date(r.completedAt),
          })),
        );
      } catch (e) {
        console.error("Failed to load saved quizzes", e);
      }
    }
  }, []);

  // Save quiz result
  const saveQuizResult = (result: QuizResult) => {
    const updated = [result, ...savedQuizzes].slice(0, 20); // Keep last 20
    setSavedQuizzes(updated);
    localStorage.setItem("quizResults", JSON.stringify(updated));
    toast.success(
      language === "en" 
        ? "Quiz result saved! 🎉" 
        : language === "fr" 
        ? "Résultat du quiz enregistré! 🎉" 
        : "Ibyavuye mu kizamini byabitswe! 🎉"
    );
  };

  // ==================== AI QUIZ GENERATION ====================
  const generateQuizWithAI = async () => {
    if (!topic.trim()) {
      toast.error(
        language === "en" 
          ? "Please enter a topic!" 
          : language === "fr" 
          ? "Veuillez entrer un sujet!" 
          : "Nyamuneka shyiramo umutwe!"
      );
      return;
    }

    setIsGenerating(true);

    const difficultyText = {
      easy: language === "en" ? "easy" : language === "fr" ? "facile" : "byoroshye",
      medium: language === "en" ? "medium" : language === "fr" ? "moyen" : "biciriritse",
      hard: language === "en" ? "hard" : language === "fr" ? "difficile" : "bigoye"
    };

    const prompt = `Generate a ${difficultyText[difficulty]} difficulty quiz about "${topic}" with ${numQuestions} multiple choice questions.
    
Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "text": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Brief explanation why this is correct"
    }
  ]
}

Rules:
- correctAnswer must be 0, 1, 2, or 3 (index of correct option)
- Make questions educational and appropriate for ${difficultyText[difficulty]} level
- Ensure all questions are relevant to "${topic}"
- Provide clear explanations

Respond with ONLY the JSON, no other text.`;

    try {
      let generatedQuestions: Question[] = [];

      // Try OpenRouter first
      if (OPENROUTER_API_KEY && OPENROUTER_API_KEY !== "") {
        try {
          const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
              model: "openai/gpt-3.5-turbo",
              messages: [{ role: "user", content: prompt }],
              max_tokens: 4000,
              temperature: 0.7,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": window.location.origin,
                "X-Title": "E-Learning Platform",
              },
            },
          );

          const content = response.data.choices[0]?.message?.content;
          if (content) {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]);
              generatedQuestions = parsed.questions.map(
                (q: any, idx: number) => ({
                  id: idx,
                  text: q.text,
                  options: q.options,
                  correctAnswer: q.correctAnswer,
                  explanation: q.explanation || (language === "en" ? "Correct! Well done." : language === "fr" ? "Correct! Bien joué." : "Byiza! Ukoze neza."),
                }),
              );
            }
          }
        } catch (error) {
          console.error("OpenRouter quiz generation failed:", error);
        }
      }

      // Fallback to Gemini if OpenRouter failed
      if (
        generatedQuestions.length === 0 &&
        GEMINI_API_KEY &&
        GEMINI_API_KEY.startsWith("AIza")
      ) {
        try {
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 4000 },
            },
          );

          const content =
            response.data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (content) {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]);
              generatedQuestions = parsed.questions.map(
                (q: any, idx: number) => ({
                  id: idx,
                  text: q.text,
                  options: q.options,
                  correctAnswer: q.correctAnswer,
                  explanation: q.explanation || (language === "en" ? "Correct! Well done." : language === "fr" ? "Correct! Bien joué." : "Byiza! Ukoze neza."),
                }),
              );
            }
          }
        } catch (error) {
          console.error("Gemini quiz generation failed:", error);
        }
      }

      // If both APIs fail, use fallback quiz
      if (generatedQuestions.length === 0) {
        generatedQuestions = getFallbackQuiz(topic, difficulty, numQuestions);
      }

      setQuestions(generatedQuestions);
      setShowQuiz(true);
      toast.success(
        language === "en" 
          ? `Quiz generated! ${generatedQuestions.length} questions ready.`
          : language === "fr"
          ? `Quiz généré! ${generatedQuestions.length} questions prêtes.`
          : `Ibibazo byaremwe! ${generatedQuestions.length} bibazo biteguye.`
      );
    } catch (error) {
      console.error("Quiz generation error:", error);
      toast.error(
        language === "en" 
          ? "Failed to generate quiz. Using fallback questions."
          : language === "fr"
          ? "Échec de la génération du quiz. Utilisation de questions de secours."
          : "Ibibazo ntibyaremwe. Dukoresha ibibazo bisanzwe."
      );
      const fallbackQuestions = getFallbackQuiz(
        topic,
        difficulty,
        numQuestions,
      );
      setQuestions(fallbackQuestions);
      setShowQuiz(true);
    } finally {
      setIsGenerating(false);
    }
  };

  // Fallback quiz generator (when APIs fail)
  const getFallbackQuiz = (
    topic: string,
    difficulty: string,
    count: number,
  ): Question[] => {
    const fallbackQuestions: Question[] = [];
    const topics = {
      default: [
        {
          text: language === "en" ? `What is the main concept of ${topic}?` : language === "fr" ? `Quel est le concept principal de ${topic}?` : `Icy'ibanze cya ${topic} ni iki?`,
          options: language === "en" 
            ? ["Basic understanding", "Advanced theory", "Practical application", "Historical context"]
            : language === "fr"
            ? ["Compréhension de base", "Théorie avancée", "Application pratique", "Contexte historique"]
            : ["Gusobanukirwa ibintu", "Imyumvire ikomeye", "Gukoresha ibyo wiga", "Amateka"],
          correct: 0,
          explanation: language === "en" ? "The main concept forms the foundation of understanding." : language === "fr" ? "Le concept principal forme la base de la compréhension." : "Igikorwa cy'ibanze kigirira akamaro mu gusobanukirwa.",
        },
        {
          text: language === "en" ? `Which of the following is most relevant to ${topic}?` : language === "fr" ? `Lequel des éléments suivants est le plus pertinent pour ${topic}?` : `Ni iki kiri muri ibi bikurikira gikunze gukoreshwa muri ${topic}?`,
          options: language === "en" 
            ? ["Theory and practice", "Only theoretical", "Only practical", "Neither"]
            : language === "fr"
            ? ["Théorie et pratique", "Uniquement théorique", "Uniquement pratique", "Ni l'un ni l'autre"]
            : ["Imyumvire n'ibikorwa", "Imyumvire gusa", "Ibikorwa gusa", "Ntabwo"],
          correct: 0,
          explanation: language === "en" ? "Both theory and practice are important." : language === "fr" ? "La théorie et la pratique sont toutes deux importantes." : "Imyumvire n'ibikorwa byombi ni ibyingenzi.",
        },
        {
          text: language === "en" ? `Why is ${topic} important to study?` : language === "fr" ? `Pourquoi est-il important d'étudier ${topic}?` : `Kuki ${topic} ari ngirakamaro mu kwiga?`,
          options: language === "en" 
            ? ["Career opportunities", "Personal growth", "Problem-solving skills", "All of the above"]
            : language === "fr"
            ? ["Opportunités de carrière", "Croissance personnelle", "Compétences en résolution de problèmes", "Toutes ces réponses"]
            : ["Amahirwe y'akazi", "Iterambere ry'umuntu", "Ubumenyi bwo gukemura ibibazo", "Byose hamwe"],
          correct: 3,
          explanation: language === "en" ? "It provides multiple benefits." : language === "fr" ? "Il offre de multiples avantages." : "Bitanga inyungu nyinshi.",
        },
      ],
    };

    for (let i = 0; i < Math.min(count, 10); i++) {
      const base = topics.default[i % topics.default.length];
      fallbackQuestions.push({
        id: i,
        text: base.text,
        options: base.options,
        correctAnswer: base.correct,
        explanation: base.explanation,
      });
    }
    return fallbackQuestions;
  };

  // ==================== QUIZ HANDLERS ====================
  const handleAnswerSelect = (answerIndex: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === currentQuestionIndex ? { ...q, userAnswer: answerIndex } : q,
      ),
    );
  };

  const handleNextQuestion = () => {
    if (questions[currentQuestionIndex].userAnswer === undefined) {
      toast.warning(
        language === "en" 
          ? "Please select an answer before continuing!"
          : language === "fr"
          ? "Veuillez sélectionner une réponse avant de continuer!"
          : "Nyamuneka hitamo igisubizo mbere yo gukomeza!"
      );
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate results
    const gradedQuestions = questions.map((q) => ({
      ...q,
      isCorrect: q.userAnswer === q.correctAnswer,
    }));

    const correctCount = gradedQuestions.filter((q) => q.isCorrect).length;
    const percentage = (correctCount / questions.length) * 100;

    const result: QuizResult = {
      topic,
      difficulty,
      score: correctCount,
      totalQuestions: questions.length,
      percentage,
      answers: gradedQuestions.map((q) => ({
        questionId: q.id,
        userAnswer: q.userAnswer!,
        isCorrect: q.isCorrect!,
      })),
      completedAt: new Date(),
    };

    setQuizResult(result);
    setQuizSubmitted(true);
    saveQuizResult(result);

    if (percentage >= 70) {
      toast.success(
        language === "en" 
          ? `🎉 Congratulations! You scored ${percentage.toFixed(1)}%!`
          : language === "fr"
          ? `🎉 Félicitations! Vous avez obtenu ${percentage.toFixed(1)}%!`
          : `🎉 Urakoze! Ubonye ${percentage.toFixed(1)}%!`
      );
    } else {
      toast.info(
        language === "en" 
          ? `You scored ${percentage.toFixed(1)}%. Keep learning and try again!`
          : language === "fr"
          ? `Vous avez obtenu ${percentage.toFixed(1)}%. Continuez à apprendre et réessayez!`
          : `Ubonye ${percentage.toFixed(1)}%. Komeza kwiga kandi ugerageze ubundi!`
      );
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setShowQuiz(false);
    setQuizSubmitted(false);
    setQuizResult(null);
    setCurrentQuestionIndex(0);
    setTopic("");
  };

  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div
      className={`rounded-2xl p-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl transition-all duration-300`}
    >
      <h2
        className={`text-2xl font-bold mb-2 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}
      >
        <span className="text-3xl">📝</span>
        {t("title")}
        <span className="text-xs ml-2 px-2 py-1 rounded-full bg-purple-500/20 text-purple-600">
          AI-Powered
        </span>
      </h2>
      <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        {t("subtitle")}
      </p>

      {/* Free Access Banner */}
      <div className={`mb-4 p-3 rounded-lg text-center text-sm ${darkMode ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-200"}`}>
        <span className={darkMode ? "text-green-400" : "text-green-600"}>
          ✨ {t("freeAccess")}
        </span>
      </div>

      {/* Quiz Generation Form */}
      {!showQuiz && !quizSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t("topicPlaceholder") + " *"}
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-purple-500 transition-all ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
            />

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-purple-500 transition-all ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
            >
              <option value="easy">📘 {t("easy")}</option>
              <option value="medium">📚 {t("medium")}</option>
              <option value="hard">🎓 {t("hard")}</option>
            </select>

            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-purple-500 transition-all ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
            >
              <option value={5}>5 {t("questions")}</option>
              <option value={10}>10 {t("questions")}</option>
              <option value={15}>15 {t("questions")}</option>
              <option value={20}>20 {t("questions")}</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateQuizWithAI}
            disabled={isGenerating || !topic.trim()}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium shadow-lg disabled:opacity-50 transition-all"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{t("generating")}</span>
              </div>
            ) : (
              `🚀 ${t("generate")}`
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Quiz Taking View */}
      {showQuiz && !quizSubmitted && questions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                {t("question")} {currentQuestionIndex + 1} {t("of")} {questions.length}
              </span>
              <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                {Math.round(progress)}% {t("complete")}
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className={`p-6 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                {currentQuestion.text}
              </h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      currentQuestion.userAnswer === idx
                        ? "bg-purple-100 dark:bg-purple-900/50 border-2 border-purple-500"
                        : `hover:bg-gray-100 dark:hover:bg-gray-600 ${darkMode ? "border border-gray-600" : "border border-gray-200"}`
                    }`}
                  >
                    <input
                      type="radio"
                      name="question"
                      value={idx}
                      checked={currentQuestion.userAnswer === idx}
                      onChange={() => handleAnswerSelect(idx)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span
                      className={darkMode ? "text-gray-200" : "text-gray-700"}
                    >
                      {String.fromCharCode(65 + idx)}. {option}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 rounded-xl bg-gray-500 text-white disabled:opacity-50 transition-all"
            >
              ← {t("previous")}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextQuestion}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium transition-all"
            >
              {currentQuestionIndex === questions.length - 1
                ? `${t("submit")} ✓`
                : `${t("next")} →`}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Results View */}
      {quizSubmitted && quizResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Score Card */}
          <div
            className={`text-center p-6 rounded-xl ${quizResult.percentage >= 70 ? "bg-green-100 dark:bg-green-900/30" : "bg-yellow-100 dark:bg-yellow-900/30"}`}
          >
            <div className="text-6xl mb-2">
              {quizResult.percentage >= 70 ? "🎉" : "📚"}
            </div>
            <div
              className={`text-4xl font-bold ${quizResult.percentage >= 70 ? "text-green-600" : "text-yellow-600"}`}
            >
              {quizResult.percentage.toFixed(1)}%
            </div>
            <div
              className={`text-lg mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {t("score")}: {quizResult.score} / {quizResult.totalQuestions} {t("correctCount")}
            </div>
            <div
              className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              {quizResult.percentage >= 70
                ? t("congratulations")
                : t("keepPracticing")}
            </div>
          </div>

          {/* Question Review */}
          <details
            className={`rounded-xl p-4 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
          >
            <summary className="cursor-pointer font-semibold">
              📋 {t("reviewAnswers")}
            </summary>
            <div className="mt-4 space-y-4">
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${q.userAnswer === q.correctAnswer ? "border-l-4 border-green-500" : "border-l-4 border-red-500"}`}
                >
                  <p className="font-medium">
                    {idx + 1}. {q.text}
                  </p>
                  <p className="text-sm mt-1">
                    {t("yourAnswer")}: {String.fromCharCode(65 + (q.userAnswer || 0))}
                    . {q.options[q.userAnswer || 0]}
                  </p>
                  {q.userAnswer !== q.correctAnswer && (
                    <p className="text-sm text-green-600 mt-1">
                      {t("correctAnswer")}: {String.fromCharCode(65 + q.correctAnswer)}.{" "}
                      {q.options[q.correctAnswer]}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">{q.explanation}</p>
                </div>
              ))}
            </div>
          </details>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={resetQuiz}
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-colors"
            >
              🎯 {t("takeNewQuiz")}
            </button>
          </div>
        </motion.div>
      )}

      {/* Saved Quizzes History */}
      {savedQuizzes.length > 0 && !showQuiz && !quizSubmitted && (
        <div className="mt-6 pt-6 border-t dark:border-gray-700">
          <h3
            className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            📜 {t("quizHistory")}
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {savedQuizzes.slice(0, 5).map((quiz, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg text-sm ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{quiz.topic}</span>
                    <span className="text-xs ml-2 text-gray-500 capitalize">
                      {quiz.difficulty}
                    </span>
                  </div>
                  <div
                    className={`font-bold ${quiz.percentage >= 70 ? "text-green-600" : "text-yellow-600"}`}
                  >
                    {quiz.percentage.toFixed(0)}%
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{quiz.score}/{quiz.totalQuestions} {t("correctCount")}</span>
                  <span>{new Date(quiz.completedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Info Footer */}
      <div className="mt-4 pt-4 border-t dark:border-gray-700 text-xs text-center text-gray-500">
        🤖 {t("poweredBy")}
      </div>
    </div>
  );
};