import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useDarkMode, useLanguage } from "../../App";
import VerifiedIcon from "@mui/icons-material/Verified";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BugReportIcon from "@mui/icons-material/BugReport";

// Core Values
const coreValues = [
  {
    icon: <AssessmentIcon className="text-3xl" />,
    titleEn: "Skill Testing",
    titleRw: "Kugerageza Ubumenyi",
    titleFr: "Test de Compétences",
    descriptionEn: "Helping users test and improve their knowledge",
    descriptionRw:
      "Gufasha abakoresha kugerageza no guteza imbere ubumenyi bwabo",
    descriptionFr:
      "Aider les utilisateurs à tester et améliorer leurs connaissances",
  },
  {
    icon: <BugReportIcon className="text-3xl" />,
    titleEn: "Bug Finding",
    titleRw: "Gushakisha Amakosa",
    titleFr: "Recherche de Bugs",
    descriptionEn: "AI-powered debugging for learning systems",
    descriptionRw: "Gukosora amakosa ukoresheje AI",
    descriptionFr: "Débogage alimenté par IA pour les systèmes d'apprentissage",
  },
  {
    icon: <LightbulbIcon className="text-3xl" />,
    titleEn: "Innovation",
    titleRw: "Ubuhanga",
    titleFr: "Innovation",
    descriptionEn: "Using cutting-edge AI to enhance learning",
    descriptionRw: "Gukoresha AI kugira ngo ube umenya neza",
    descriptionFr: "Utiliser l'IA de pointe pour améliorer l'apprentissage",
  },
  {
    icon: <FavoriteIcon className="text-3xl" />,
    titleEn: "Free Access",
    titleRw: "Ubuntu ku Buntu",
    titleFr: "Accès Gratuit",
    descriptionEn: "No registration, completely free for everyone",
    descriptionRw: "Nta kwiyandikisha, ku buntu kuri bose",
    descriptionFr: "Aucune inscription, complètement gratuit pour tous",
  },
];


// Main About Component
export const About = () => {
  const { darkMode } = useDarkMode();
  const { language } = useLanguage();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Translations for About page
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      "about.title": {
        en: "About E-Learning",
        rw: "Ibyerekeye E-Learning",
        fr: "À propos d'E-Learning",
      },
      "about.subtitle": {
        en: "Free AI-powered platform for skill testing and bug finding",
        rw: "Urubuga rukoresha AI ku buntu rwo kugerageza ubumenyi no gushakisha amakosa",
        fr: "Plateforme gratuite alimentée par l'IA pour tester vos compétences et trouver des bugs",
      },
      "about.mission": {
        en: "Our Mission",
        rw: "Intego Yacu",
        fr: "Notre Mission",
      },
      "about.mission.text": {
        en: "To provide free, accessible tools for testing skills and finding bugs, helping everyone learn and improve without barriers.",
        rw: "Kugeza ibikoresho ku buntu byo kugerageza ubumenyi no gushakisha amakosa, gufasha buri muntu kwiga no gutera imbere nta mbogamizi.",
        fr: "Fournir des outils gratuits et accessibles pour tester les compétences et trouver des bugs, aidant chacun à apprendre et à s'améliorer sans barrières.",
      },
      "about.vision": {
        en: "Our Vision",
        rw: "Icyerekezo Cyacu",
        fr: "Notre Vision",
      },
      "about.vision.text": {
        en: "To become the leading free platform for skill assessment and debugging, empowering learners worldwide.",
        rw: "Kuba urubuga rwa mbere ku buntu rwo gusuzuma ubumenyi no gukosora amakosa, gufasha abiga kwisi yose.",
        fr: "Devenir la principale plateforme gratuite d'évaluation des compétences et de débogage, autonomisant les apprenants dans le monde entier.",
      },
      "about.stats": {
        en: "Our Impact",
        rw: "Ingaruka Zacu",
        fr: "Notre Impact",
      },
      "about.team": {
        en: "Meet Our Team",
        rw: "Menya Itego Ryacu",
        fr: "Rencontrez Notre Équipe",
      },
      "about.team.subtitle": {
        en: "Passionate experts dedicated to free education tools",
        rw: "Intiti zikunda akazi zihaye umutwe ibikoresho byo kwiga ku buntu",
        fr: "Des experts passionnés dédiés aux outils éducatifs gratuits",
      },
      "about.testimonials": {
        en: "What Our Users Say",
        rw: "Ibyo Abakoresha Bacu Bavuga",
        fr: "Ce que Disent Nos Utilisateurs",
      },
      "about.milestones": {
        en: "Our Journey",
        rw: "Urugendo Rwacu",
        fr: "Notre Parcours",
      },
      "about.values": {
        en: "Our Core Values",
        rw: "Indangagaciro Zacu",
        fr: "Nos Valeurs Fondamentales",
      },
      "about.join": {
        en: "Start Testing Your Skills",
        rw: "Tangira Kugerageza Ubumenyi Bwawe",
        fr: "Commencez à Tester Vos Compétences",
      },
      "about.join.text": {
        en: "Join thousands of users testing their skills and finding bugs. Completely free, no registration needed!",
        rw: "Injira mu byinshi by'abakoresha bigerageza ubumenyi bwabo kandi bashakisha amakosa. Ku buntu rwose, nta kwiyandikisha birakenewe!",
        fr: "Rejoignez des milliers d'utilisateurs qui testent leurs compétences et trouvent des bugs. Complètement gratuit, aucune inscription nécessaire!",
      },
      "about.start": {
        en: "Start Testing Free",
        rw: "Tangira Kugerageza ku Buntu",
        fr: "Commencez à Tester Gratuitement",
      },
      "stats.activeUsers": {
        en: "Active Users",
        rw: "Abakoresha",
        fr: "Utilisateurs Actifs",
      },
      "stats.testsTaken": {
        en: "Tests Taken",
        rw: "Ibizamini Byakozwe",
        fr: "Tests Effectués",
      },
      "stats.bugsFixed": {
        en: "Bugs Fixed",
        rw: "Amakosa Yakosowe",
        fr: "Bugs Corrigés",
      },
      "stats.countries": {
        en: "Countries",
        rw: "Ibihugu",
        fr: "Pays",
      },
    };
    return translations[key]?.[language] || translations[key]?.["en"] || key;
  };

  const getCoreValueTitle = (value: (typeof coreValues)[0]) => {
    if (language === "rw") return value.titleRw;
    if (language === "fr") return value.titleFr;
    return value.titleEn;
  };

  const getCoreValueDescription = (value: (typeof coreValues)[0]) => {
    if (language === "rw") return value.descriptionRw;
    if (language === "fr") return value.descriptionFr;
    return value.descriptionEn;
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="absolute inset-0 z-0">
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              darkMode
                ? "bg-gradient-to-br from-gray-900 via-gray-900 to-primary-900/20"
                : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
            }`}
          />
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {t("about.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-lg lg:text-xl max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {t("about.subtitle")}
            </motion.p>

            {/* Free Access Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30"
            >
              <VerifiedIcon className="text-green-500 text-sm" />
              <span
                className={`text-sm font-medium ${darkMode ? "text-green-400" : "text-green-600"}`}
              >
                {language === "en"
                  ? "✅ 100% Free • No Registration • Start Instantly"
                  : language === "fr"
                    ? "✅ 100% Gratuit • Aucune Inscription • Commencez Instantanément"
                    : "✅ Ubuntu 100% • Nta Kwiyandikisha • Tangira Ako Kanya"}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`py-16 ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {t("about.stats")}
            </h2>
          </div>
         
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-2xl shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${darkMode ? "bg-primary-900/30" : "bg-primary-50"}`}
              >
                <RocketLaunchIcon
                  className={`text-3xl ${darkMode ? "text-primary-400" : "text-primary-600"}`}
                />
              </div>
              <h2
                className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                {t("about.mission")}
              </h2>
              <p
                className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {t("about.mission.text")}
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-2xl shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${darkMode ? "bg-primary-900/30" : "bg-primary-50"}`}
              >
                <VisibilityIcon
                  className={`text-3xl ${darkMode ? "text-primary-400" : "text-primary-600"}`}
                />
              </div>
              <h2
                className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                {t("about.vision")}
              </h2>
              <p
                className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {t("about.vision.text")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {t("about.values")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl text-center transition-all duration-300 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:shadow-xl"}`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 ${darkMode ? "bg-primary-900/30" : "bg-primary-50"}`}
                >
                  <div
                    className={
                      darkMode ? "text-primary-400" : "text-primary-600"
                    }
                  >
                    {value.icon}
                  </div>
                </div>
                <h3
                  className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {getCoreValueTitle(value)}
                </h3>
                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {getCoreValueDescription(value)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-12 rounded-2xl text-center bg-gradient-to-r from-primary-600 to-purple-600 shadow-2xl`}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {t("about.join")}
            </h2>
            <p className="text-white/90 mb-8 text-lg">{t("about.join.text")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/services")}
                className="px-8 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
              >
                <AssessmentIcon className="text-sm" />
                {t("about.start")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/services")}
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2"
              >
                <BugReportIcon className="text-sm" />
                {language === "en"
                  ? "Find Bugs"
                  : language === "fr"
                    ? "Trouver des Bugs"
                    : "Shakisha Amakosa"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add custom CSS for 3D flip effect */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
