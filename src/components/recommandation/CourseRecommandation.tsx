/* eslint-disable no-useless-assignment */
/* eslint-disable react-hooks/set-state-in-effect */
// components/CourseRecommendation.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useDarkMode, useLanguage } from "../../App";
import { toast } from "react-toastify";

// ==================== TYPES ====================
interface QuizResult {
  studentName: string;
  studentEmail: string;
  topic: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: { questionId: number; userAnswer: number; isCorrect: boolean }[];
  completedAt: Date;
  certificateCode?: string;
}

interface Recommendation {
  id: string;
  type: "course" | "practice" | "resource" | "tip" | "strategy" | "debug" | "skill";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: string;
  actionUrl?: string;
  estimatedTime?: string;
}

interface PerformanceAnalysis {
  overall: {
    score: number;
    grade: "Excellent" | "Good" | "Average" | "Needs Improvement" | "Poor";
    summary: string;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: Recommendation[];
  nextSteps: string[];
  predictedImprovement: string;
}

// ==================== API KEYS ====================
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// ==================== COURSE RECOMMENDATION COMPONENT ====================
export const CourseRecommendation = () => {
  const { darkMode } = useDarkMode();
  const { language } = useLanguage();

  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<QuizResult | null>(null);
  const [analysis, setAnalysis] = useState<PerformanceAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">(
    "all",
  );

  // Translations
  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      "title": {
        en: "AI Learning Assistant",
        rw: "Umurezi wa AI wo Kwiga",
        fr: "Assistant d'Apprentissage IA"
      },
      "subtitle": {
        en: "Test your skills, find bugs, and get personalized help",
        rw: "Gerageza ubumenyi bwawe, shakisha amakosa, ukabona ubufasha bukugendeye",
        fr: "Testez vos compétences, trouvez des bugs et obtenez de l'aide personnalisée"
      },
      "quizzesTaken": {
        en: "Tests Taken",
        rw: "Ibizamini Byakozwe",
        fr: "Tests Effectués"
      },
      "averageScore": {
        en: "Average Score",
        rw: "Amanota Agereranya",
        fr: "Score Moyen"
      },
      "bestScore": {
        en: "Best Score",
        rw: "Amanota Meza",
        fr: "Meilleur Score"
      },
      "needsWork": {
        en: "Needs Work",
        rw: "Birakenewe Gukora",
        fr: "À Améliorer"
      },
      "recentTests": {
        en: "Recent Tests",
        rw: "Ibizamini Biheruka",
        fr: "Tests Récents"
      },
      "noResults": {
        en: "No test results yet. Take a test to get personalized recommendations!",
        rw: "Nta bizamini byakozwe. Kora ikizamini ukabona inama zihuje nawe!",
        fr: "Pas encore de résultats. Faites un test pour obtenir des recommandations personnalisées!"
      },
      "analyzing": {
        en: "AI is analyzing your performance...",
        rw: "AI irimo isesengura ibyo wakoze...",
        fr: "L'IA analyse votre performance..."
      },
      "generating": {
        en: "Generating personalized recommendations",
        rw: "Irema inama zihuje nawe",
        fr: "Génération de recommandations personnalisées"
      },
      "backToHistory": {
        en: "Back to History",
        rw: "Subira mu Mateka",
        fr: "Retour à l'Historique"
      },
      "strengths": {
        en: "Strengths",
        rw: "Ibyo Wishoboye",
        fr: "Forces"
      },
      "areasToImprove": {
        en: "Areas to Improve",
        rw: "Ibyo Ugomba Guteza Imbere",
        fr: "Domaines à Améliorer"
      },
      "all": {
        en: "All",
        rw: "Zose",
        fr: "Tous"
      },
      "highPriority": {
        en: "High Priority",
        rw: "Iby'Agaciro Kanini",
        fr: "Haute Priorité"
      },
      "mediumPriority": {
        en: "Medium Priority",
        rw: "Iby'Agaciro Giciriritse",
        fr: "Priorité Moyenne"
      },
      "lowPriority": {
        en: "Low Priority",
        rw: "Iby'Agaciro Gake",
        fr: "Basse Priorité"
      },
      "recommendedNextSteps": {
        en: "Recommended Next Steps",
        rw: "Inama Zikurikira",
        fr: "Prochaines Étapes Recommandées"
      },
      "predictedImprovement": {
        en: "Predicted Improvement",
        rw: "Iterambere Riteganijwe",
        fr: "Amélioration Prévue"
      },
      "viewOtherTests": {
        en: "View Other Tests",
        rw: "Reba Ibindi Bizamini",
        fr: "Voir Autres Tests"
      },
      "retakeTest": {
        en: "Retake Test",
        rw: "Ongera Ukore Ikizamini",
        fr: "Repasser le Test"
      },
      "tip": {
        en: "Tip",
        rw: "Inama",
        fr: "Conseil"
      },
      "poweredBy": {
        en: "Powered by AI | Analyzes your performance and provides personalized learning recommendations",
        rw: "Ikoresha AI | Isesengura ibyo wakoze ikanaguha inama zihuje nawe",
        fr: "Alimenté par IA | Analyse vos performances et fournit des recommandations d'apprentissage personnalisées"
      },
      "skillTest": {
        en: "Skill Test",
        rw: "Kugerageza Ubumenyi",
        fr: "Test de Compétence"
      },
      "bugFinder": {
        en: "Bug Finder",
        rw: "Gushakisha Amakosa",
        fr: "Recherche de Bugs"
      },
      "aiTutor": {
        en: "AI Tutor",
        rw: "Umurezi wa AI",
        fr: "Tuteur IA"
      },
      "debugCode": {
        en: "Debug Code",
        rw: "Kosora Kode",
        fr: "Déboguer le Code"
      }
    };
    return translations[key]?.[language] || translations[key]?.["en"] || key;
  };

  // Load quiz results from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("quizResults");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuizResults(
          parsed.map((r: any) => ({
            ...r,
            completedAt: new Date(r.completedAt),
          })),
        );
      } catch (e) {
        console.error("Failed to load quiz results", e);
      }
    }
  }, []);

  // Analyze performance with AI
  const analyzePerformance = async (result: QuizResult) => {
    setIsAnalyzing(true);
    setSelectedResult(result);

    // Get weak topics from incorrect answers
    const weakTopics =
      result.percentage < 70
        ? ["Core concepts", "Practical application", "Problem-solving", "Debugging skills"]
        : ["Advanced topics", "Complex bug patterns"];

    const prompt = `Analyze this student's test performance and provide personalized recommendations for improvement:

Student: ${result.studentName}
Topic: ${result.topic}
Score: ${result.score}/${result.totalQuestions} (${result.percentage.toFixed(1)}%)
Difficulty: ${result.difficulty}
Weak Areas: ${weakTopics.join(", ")}

Return ONLY valid JSON in this format:
{
  "overall": {
    "score": ${result.percentage},
    "grade": "${result.percentage >= 90 ? "Excellent" : result.percentage >= 75 ? "Good" : result.percentage >= 60 ? "Average" : result.percentage >= 40 ? "Needs Improvement" : "Poor"}",
    "summary": "Brief 1-2 sentence summary of performance"
  },
  "strengths": ["Strength 1", "Strength 2"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "recommendations": [
    {
      "type": "skill",
      "title": "Skill practice recommendation",
      "description": "Why this helps",
      "priority": "high/medium/low",
      "category": "${result.topic}",
      "estimatedTime": "X hours"
    },
    {
      "type": "debug",
      "title": "Debugging practice",
      "description": "How to improve debugging skills",
      "priority": "high/medium/low",
      "category": "Debugging",
      "estimatedTime": "X hours"
    }
  ],
  "nextSteps": ["Step 1", "Step 2", "Step 3"],
  "predictedImprovement": "X% improvement expected"
}

Generate 3-5 specific, actionable recommendations focused on skill improvement and debugging.`;

    try {
      let aiAnalysis: PerformanceAnalysis | null = null;

      // Try OpenRouter first
      if (OPENROUTER_API_KEY && OPENROUTER_API_KEY !== "") {
        try {
          const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
              model: "openai/gpt-3.5-turbo",
              messages: [{ role: "user", content: prompt }],
              max_tokens: 2000,
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
              aiAnalysis = JSON.parse(jsonMatch[0]);
            }
          }
        } catch (error) {
          console.error("OpenRouter analysis failed:", error);
        }
      }

      // Fallback to Gemini
      if (!aiAnalysis && GEMINI_API_KEY && GEMINI_API_KEY.startsWith("AIza")) {
        try {
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 2000 },
            },
          );

          const content =
            response.data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (content) {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              aiAnalysis = JSON.parse(jsonMatch[0]);
            }
          }
        } catch (error) {
          console.error("Gemini analysis failed:", error);
        }
      }

      // Use fallback analysis if AI fails
      if (!aiAnalysis) {
        aiAnalysis = getFallbackAnalysis(result);
      }

      setAnalysis(aiAnalysis);
      setShowRecommendations(true);
      toast.success(
        language === "en" 
          ? "AI analysis complete! Check your personalized recommendations."
          : language === "fr"
          ? "Analyse IA terminée! Vérifiez vos recommandations personnalisées."
          : "Isesengura rya AI ryaranguye! Reba inama zihuje nawe."
      );
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error(
        language === "en"
          ? "Analysis failed. Using standard recommendations."
          : language === "fr"
          ? "Analyse échouée. Utilisation des recommandations standard."
          : "Isesengura ntiryanakora. Dukoresha inama zisanzwe."
      );
      setAnalysis(getFallbackAnalysis(result));
      setShowRecommendations(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Fallback analysis generator
  const getFallbackAnalysis = (result: QuizResult): PerformanceAnalysis => {
    const percentage = result.percentage;
    let grade: PerformanceAnalysis["overall"]["grade"];
    let summary = "";

    if (percentage >= 90) {
      grade = "Excellent";
      summary = language === "en"
        ? `Excellent performance on ${result.topic}! You have a strong grasp of the material.`
        : language === "fr"
        ? `Performance excellente sur ${result.topic}! Vous maîtrisez bien la matière.`
        : `Ukoze neza cyane kuri ${result.topic}! Ufite ubumenyi bukomeye.`;
    } else if (percentage >= 75) {
      grade = "Good";
      summary = language === "en"
        ? `Good work on ${result.topic}! You understand most concepts well.`
        : language === "fr"
        ? `Bon travail sur ${result.topic}! Vous comprenez bien la plupart des concepts.`
        : `Ukoze neza kuri ${result.topic}! Urumva ibintu byinshi neza.`;
    } else if (percentage >= 60) {
      grade = "Average";
      summary = language === "en"
        ? `Average performance. Some concepts need more practice.`
        : language === "fr"
        ? `Performance moyenne. Certains concepts nécessitent plus de pratique.`
        : `Ukoze hagati. Ibintu bimwe bisaba imyitozo myinshi.`;
    } else if (percentage >= 40) {
      grade = "Needs Improvement";
      summary = language === "en"
        ? `Room for improvement. Focus on understanding core concepts first.`
        : language === "fr"
        ? `Marge d'amélioration. Concentrez-vous d'abord sur la compréhension des concepts clés.`
        : `Hari aho ugomba gutera imbere. Ibanza kwibanda ku gusobanukirwa ibintu by'ibanze.`;
    } else {
      grade = "Poor";
      summary = language === "en"
        ? `Significant improvement needed. Consider starting with foundational materials.`
        : language === "fr"
        ? `Amélioration significative nécessaire. Commencez par des documents fondamentaux.`
        : `Ugomba gutera imbere cyane. Tangira kubintu by'ibanze.`;
    }

    return {
      overall: { score: percentage, grade, summary },
      strengths:
        percentage >= 70
          ? language === "en"
            ? ["Basic concepts", "Problem-solving approach"]
            : language === "fr"
            ? ["Concepts de base", "Approche de résolution de problèmes"]
            : ["Ibintu by'ibanze", "Uburyo bwo gukemura ibibazo"]
          : language === "en"
            ? ["Attempted all questions"]
            : language === "fr"
            ? ["Tentative de toutes les questions"]
            : ["Wagerageje ibibazo byose"],
      weaknesses:
        percentage < 70
          ? language === "en"
            ? ["Core understanding", "Application of concepts", "Debugging skills"]
            : language === "fr"
            ? ["Compréhension fondamentale", "Application des concepts", "Compétences de débogage"]
            : ["Gusobanukirwa ibintu", "Gukoresha ibyo wiga", "Ubumenyi bwo gushakisha amakosa"]
          : language === "en"
            ? ["Advanced applications", "Complex bug patterns"]
            : language === "fr"
            ? ["Applications avancées", "Modèles de bugs complexes"]
            : ["Ibintu bikomeye", "Uburyo bukomeye bwa makosa"],
      recommendations: [
        {
          id: "1",
          type: "skill",
          title: language === "en" ? `${result.topic} Skill Practice` : language === "fr" ? `Pratique des compétences ${result.topic}` : `Kugerageza Ubumenyi kuri ${result.topic}`,
          description: language === "en"
            ? `Build a strong foundation in ${result.topic} with interactive exercises and skill tests.`
            : language === "fr"
            ? `Construisez une base solide en ${result.topic} avec des exercices interactifs et des tests de compétences.`
            : `Kubera umusingi ukomeye muri ${result.topic} ukoresheje imyitozo n'ibizamini by'ubumenyi.`,
          priority: percentage < 60 ? "high" : "medium",
          category: result.topic,
          estimatedTime: "4-6 hours",
        },
        {
          id: "2",
          type: "debug",
          title: language === "en" ? "Debugging Practice" : language === "fr" ? "Pratique de Débogage" : "Kosora Amakosa",
          description: language === "en"
            ? "Learn to find and fix bugs in your code with AI-powered debugging tools."
            : language === "fr"
            ? "Apprenez à trouver et corriger les bugs dans votre code avec des outils de débogage IA."
            : "Wiga gushakisha no gukosora amakosa muri kode yawe ukoresheje ibikoresho bya AI.",
          priority: percentage < 70 ? "high" : "medium",
          category: "Debugging",
          estimatedTime: "2-3 hours",
        },
        {
          id: "3",
          type: "tip",
          title: language === "en" ? "AI Tutor Assistance" : language === "fr" ? "Assistance Tuteur IA" : "Ubufasha bw'Umurezi wa AI",
          description: language === "en"
            ? "Get 24/7 help from AI tutor to explain concepts you're struggling with."
            : language === "fr"
            ? "Obtenez de l'aide 24/7 d'un tuteur IA pour expliquer les concepts difficiles."
            : "Habona ubufasha buri gihe bw'umurezi wa AI kugira ngo agusobanurire ibintu udasobanukirwa.",
          priority: "medium",
          category: result.topic,
          estimatedTime: "Always available",
        },
      ],
      nextSteps: language === "en"
        ? [
            "Review all incorrect answers",
            "Practice with skill tests",
            "Use AI tutor for difficult concepts",
            "Debug code examples",
            "Retake the test after practicing"
          ]
        : language === "fr"
        ? [
            "Passez en revue toutes les réponses incorrectes",
            "Pratiquez avec des tests de compétences",
            "Utilisez le tuteur IA pour les concepts difficiles",
            "Débuguez des exemples de code",
            "Repassez le test après avoir pratiqué"
          ]
        : [
            "Suzuma ibisubizo byose bitari byiza",
            "Kora imyitozo n'ibizamini by'ubumenyi",
            "Koresha umurezi wa AI kubintu udasobanukirwa",
            "Kosora ingero za kode",
            "Ongera ukore ikizamini nyuma yo kwiga"
          ],
      predictedImprovement: percentage < 50 ? "30-40%" : "15-20%",
    };
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return "📚";
      case "practice":
        return "✏️";
      case "resource":
        return "🎥";
      case "tip":
        return "💡";
      case "strategy":
        return "🎯";
      case "skill":
        return "📊";
      case "debug":
        return "🐛";
      default:
        return "📖";
    }
  };

  // Filter recommendations
  const filteredRecommendations =
    analysis?.recommendations.filter(
      (rec) => filter === "all" || rec.priority === filter,
    ) || [];

  // Calculate statistics
  const totalQuizzes = quizResults.length;
  const averageScore =
    quizResults.length > 0
      ? quizResults.reduce((sum, r) => sum + r.percentage, 0) /
        quizResults.length
      : 0;
  const bestScore =
    quizResults.length > 0
      ? Math.max(...quizResults.map((r) => r.percentage))
      : 0;
  const worstScore =
    quizResults.length > 0
      ? Math.min(...quizResults.map((r) => r.percentage))
      : 0;

  return (
    <div
      className={`rounded-2xl p-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl transition-all duration-300`}
    >
      <h2
        className={`text-2xl font-bold mb-2 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}
      >
        <span className="text-3xl">🎯</span>
        {t("title")}
        <span className="text-xs ml-2 px-2 py-1 rounded-full bg-purple-500/20 text-purple-600">
          AI-Powered
        </span>
      </h2>
      <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        {t("subtitle")}
      </p>

      {/* Statistics Dashboard */}
      {quizResults.length > 0 && !showRecommendations && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div
              className={`p-3 rounded-xl text-center ${darkMode ? "bg-gray-700" : "bg-purple-50"}`}
            >
              <div className="text-2xl font-bold text-purple-600">
                {totalQuizzes}
              </div>
              <div className="text-xs">{t("quizzesTaken")}</div>
            </div>
            <div
              className={`p-3 rounded-xl text-center ${darkMode ? "bg-gray-700" : "bg-purple-50"}`}
            >
              <div className="text-2xl font-bold text-purple-600">
                {averageScore.toFixed(0)}%
              </div>
              <div className="text-xs">{t("averageScore")}</div>
            </div>
            <div
              className={`p-3 rounded-xl text-center ${darkMode ? "bg-gray-700" : "bg-purple-50"}`}
            >
              <div className="text-2xl font-bold text-green-600">
                {bestScore.toFixed(0)}%
              </div>
              <div className="text-xs">{t("bestScore")}</div>
            </div>
            <div
              className={`p-3 rounded-xl text-center ${darkMode ? "bg-gray-700" : "bg-purple-50"}`}
            >
              <div className="text-2xl font-bold text-yellow-600">
                {worstScore.toFixed(0)}%
              </div>
              <div className="text-xs">{t("needsWork")}</div>
            </div>
          </div>

          {/* Recent Tests List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <h3
              className={`font-semibold mt-4 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {t("recentTests")}
            </h3>
            {quizResults.slice(0, 10).map((quiz, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => analyzePerformance(quiz)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{quiz.topic}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(quiz.completedAt).toLocaleDateString()} •{" "}
                      {quiz.difficulty}
                    </div>
                  </div>
                  <div className={`text-right`}>
                    <div
                      className={`font-bold text-lg ${
                        quiz.percentage >= 70
                          ? "text-green-600"
                          : quiz.percentage >= 50
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {quiz.percentage.toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {quiz.score}/{quiz.totalQuestions}
                    </div>
                  </div>
                </div>
                <div className="mt-2 h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      quiz.percentage >= 70
                        ? "bg-green-500"
                        : quiz.percentage >= 50
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${quiz.percentage}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {totalQuizzes === 0 && (
            <div
              className={`text-center p-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              <div className="text-4xl mb-2">📊</div>
              <p>{t("noResults")}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-600 rounded-full animate-spin" />
            <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
              🤖 {t("analyzing")}
            </p>
            <p className="text-sm text-gray-500">
              {t("generating")}
            </p>
          </div>
        </motion.div>
      )}

      {/* Recommendations View */}
      {showRecommendations && analysis && selectedResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header with back button */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setShowRecommendations(false);
                setAnalysis(null);
                setSelectedResult(null);
              }}
              className={`px-3 py-1 rounded-lg text-sm ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              ← {t("backToHistory")}
            </button>
            <div
              className={`px-3 py-1 rounded-full text-xs ${
                analysis.overall.grade === "Excellent"
                  ? "bg-green-500/20 text-green-600"
                  : analysis.overall.grade === "Good"
                    ? "bg-blue-500/20 text-blue-600"
                    : "bg-yellow-500/20 text-yellow-600"
              }`}
            >
              {analysis.overall.grade}
            </div>
          </div>

          {/* Performance Summary */}
          <div
            className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-purple-50"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg">{selectedResult.topic}</h3>
                <p className="text-sm text-gray-500">
                  {selectedResult.studentName} • {selectedResult.difficulty}
                </p>
              </div>
              <div className="text-right">
                <div
                  className={`text-3xl font-bold ${
                    selectedResult.percentage >= 70
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {selectedResult.percentage.toFixed(0)}%
                </div>
                <div className="text-xs text-gray-500">
                  {selectedResult.score}/{selectedResult.totalQuestions} correct
                </div>
              </div>
            </div>
            <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
              {analysis.overall.summary}
            </p>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-green-50"}`}
            >
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                ✅ {t("strengths")}
              </h4>
              <ul className="space-y-1">
                {analysis.strengths.map((strength, idx) => (
                  <li key={idx} className="text-sm">
                    • {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-red-50"}`}
            >
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                🎯 {t("areasToImprove")}
              </h4>
              <ul className="space-y-1">
                {analysis.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="text-sm">
                    • {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 border-b dark:border-gray-700 pb-2 flex-wrap">
            {(["all", "high", "medium", "low"] as const).map((priority) => (
              <button
                key={priority}
                onClick={() => setFilter(priority)}
                className={`px-3 py-1 rounded-lg text-sm capitalize transition-all ${
                  filter === priority
                    ? "bg-purple-600 text-white"
                    : darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {priority === "all" ? t("all") : 
                 priority === "high" ? t("highPriority") :
                 priority === "medium" ? t("mediumPriority") : t("lowPriority")}
              </button>
            ))}
          </div>

          {/* Recommendations List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredRecommendations.map((rec, idx) => (
              <motion.div
                key={rec.id || idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-xl border-l-4 transition-all ${
                  rec.priority === "high"
                    ? "border-l-red-500"
                    : rec.priority === "medium"
                      ? "border-l-yellow-500"
                      : "border-l-green-500"
                } ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"}`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{getTypeIcon(rec.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold">{rec.title}</h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(rec.priority)} text-white`}
                      >
                        {rec.priority === "high" ? t("highPriority").split(' ')[0] :
                         rec.priority === "medium" ? t("mediumPriority").split(' ')[0] :
                         t("lowPriority").split(' ')[0]} priority
                      </span>
                      {rec.estimatedTime && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}
                        >
                          ⏱️ {rec.estimatedTime}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {rec.description}
                    </p>
                    <button className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium">
                      {language === "en" ? "Learn More →" : language === "fr" ? "En Savoir Plus →" : "Soma Birenze →"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Next Steps */}
          <div
            className={`p-4 rounded-xl ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}
          >
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              📋 {t("recommendedNextSteps")}
            </h4>
            <ol className="space-y-2">
              {analysis.nextSteps.map((step, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <span className="text-purple-600 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-3 pt-3 border-t dark:border-gray-600">
              <p className="text-sm">
                <span className="font-semibold">{t("predictedImprovement")}:</span>{" "}
                {analysis.predictedImprovement}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowRecommendations(false);
                setAnalysis(null);
                setSelectedResult(null);
              }}
              className="flex-1 py-2 rounded-xl border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
            >
              {t("viewOtherTests")}
            </button>
            <button
              onClick={() => {
                toast.info(language === "en" ? "Feature coming soon - Retake this test!" : language === "fr" ? "Fonctionnalité à venir - Repassez ce test!" : "Ibikorwa bizaza vuba - Ongera ukore iki kizamini!");
              }}
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium"
            >
              🔄 {t("retakeTest")}
            </button>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {quizResults.length === 0 && !showRecommendations && (
        <div
          className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-lg font-semibold mb-2">{t("noResults")}</h3>
          <div className="mt-4 p-4 bg-purple-500/10 rounded-lg text-sm">
            <p className="font-semibold text-purple-600">💡 {t("tip")}</p>
            <p>
              {language === "en"
                ? "After completing a test, this tool will analyze your performance and suggest personalized skill practices, debugging exercises, and study strategies."
                : language === "fr"
                ? "Après avoir terminé un test, cet outil analysera vos performances et suggérera des pratiques de compétences personnalisées, des exercices de débogage et des stratégies d'étude."
                : "Nyuma yo gukora ikizamini, iki gikoresho kizasesengura ibyo wakoze kikaguhana inama zihuje nawe zo kugerageza ubumenyi, imyitozo yo gushakisha amakosa, n'uburyo bwo kwiga."}
            </p>
          </div>
        </div>
      )}

      {/* Info Footer */}
      <div className="mt-4 pt-4 border-t dark:border-gray-700 text-xs text-center text-gray-500">
        🤖 {t("poweredBy")}
      </div>
    </div>
  );
};