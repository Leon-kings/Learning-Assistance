import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode, useLanguage } from '../../App';
import SchoolIcon from '@mui/icons-material/School';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';

export const Footer = () => {
  const { darkMode } = useDarkMode();
  const { t, language, setLanguage } = useLanguage();

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: t('nav.home'), path: '/', icon: HomeIcon },
      { name: t('nav.about'), path: '/about', icon: InfoIcon },
      { name: t('nav.services'), path: '/services', icon: BuildIcon },
    ],
    support: [
      { name: 'Help Center', path: '' },
      { name: 'Contact Us', path: '' },
      { name: 'FAQs', path: '/faqs' },
      { name: t('footer.privacy'), path: '' },
      { name: t('footer.terms'), path: '' },
    ],
  };

  const socialIcons = [
    { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: YouTubeIcon, href: 'https://youtube.com', label: 'YouTube', color: 'hover:text-red-600' },
  ];

  const contactInfo = [
    { icon: PhoneIcon, text: '+250 788 123 456', href: 'tel:+250788123456' },
    { icon: EmailIcon, text: 'info@elearning.rw', href: 'mailto:info@elearning.rw' },
    { icon: LocationOnIcon, text: 'Kigali, Rwanda', href: 'https://maps.google.com' },
    { icon: AccessTimeIcon, text: language === 'en' ? 'Mon - Fri, 8:00 - 17:00' : language === 'fr' ? 'Lun - Ven, 8:00 - 17:00' : 'Kuwa mbere - Kuwa gatanu, 8:00 - 17:00', href: '#' },
  ];

  return (
    <footer className={`transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-900'}`}>
      {/* Main Footer */}
      <div className="relative">
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info Section */}
            <div className="space-y-4">
      <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
          
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
                    <span className={`text-base sm:text-lg lg:text-xl font-bold whitespace-nowrap ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {t("E-Learning Rwanda")}
                    </span>

                  </div>
                </Link>
              </motion.div>
             
            </div>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-300'}`}>
                {language === 'en' 
                  ? 'Test your skills with AI-generated quizzes. Find and fix bugs in your learning system. Get help for any confusion you have. No registration required!'
                  : language === 'fr'
                  ? 'Testez vos compétences avec des quiz générés par IA. Trouvez et corrigez les bugs dans votre système d\'apprentissage. Obtenez de l\'aide pour toute confusion. Aucune inscription requise!'
                  : 'Gerageza ubumenyi bwawe ukoresheje ibibazo byakozwe na AI. Shakisha kandi ukosore amakosa muri sisitemu yawe yo kwiga. Shakisha ubufasha kuri buri kintu kidasobanutse. Nta kwiyandikisha birakenewe!'}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 pt-2">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    whileHover={{ x: 5 }}
                    className={`flex items-center gap-3 text-sm transition-colors duration-200 ${
                      darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-300 hover:text-primary-400'
                    }`}
                  >
                    <item.icon className="text-primary-500 text-sm" />
                    <span>{item.text}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-white'}`}>
                {language === 'en' ? 'Quick Links' : language === 'fr' ? 'Liens Rapides' : 'Ibyerekeye'}
              </h3>
              <ul className="space-y-2">
                {footerLinks.quickLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                          darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-300 hover:text-primary-400'
                        }`}
                      >
                        <Icon className="text-primary-500 text-sm" />
                        {link.name}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-white'}`}>
                {language === 'en' ? 'Support' : language === 'fr' ? 'Support' : 'Ubufasha'}
              </h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-sm transition-colors duration-200 ${
                        darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-300 hover:text-primary-400'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social & Features */}
            <div className="space-y-6">
              {/* Social Icons */}
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-white'}`}>
                  {language === 'en' ? 'Follow Us' : language === 'fr' ? 'Suivez-nous' : 'Dukurikire'}
                </h3>
                <div className="flex gap-3">
                  {socialIcons.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          darkMode
                            ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        } ${social.color}`}
                        aria-label={social.label}
                      >
                        <Icon className="text-xl" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Features Badges */}
              <div className="pt-4">
                <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-white'}`}>
                  {language === 'en' ? 'Features' : language === 'fr' ? 'Fonctionnalités' : 'Ibiranga'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-800 text-gray-300'}`}>
                    {language === 'en' ? '📝 Generate Tests' : language === 'fr' ? '📝 Générer des Tests' : '📝 Kora Ibizamini'}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-800 text-gray-300'}`}>
                    {language === 'en' ? '🐛 Find Bugs' : language === 'fr' ? '🐛 Trouver des Bugs' : '🐛 Shakisha Amakosa'}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-800 text-gray-300'}`}>
                    {language === 'en' ? '🤖 AI Tutor' : language === 'fr' ? '🤖 Tuteur IA' : '🤖 Umurezi wa AI'}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-800 text-gray-300'}`}>
                    {language === 'en' ? '💬 24/7 Support' : language === 'fr' ? '💬 Support 24/7' : '💬 Ubufasha Buri Gihe'}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-800 text-gray-300'}`}>
                    {language === 'en' ? '🚫 No Registration' : language === 'fr' ? '🚫 Pas d\'Inscription' : '🚫 Nta Kwiyandikisha'}
                  </span>
                </div>
              </div>

              {/* Free Access Message */}
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-900/20 border border-green-800'}`}>
                <p className={`text-xs text-center ${darkMode ? 'text-green-400' : 'text-green-400'}`}>
                  {language === 'en' 
                    ? '✅ Free access • No registration needed • Start testing instantly'
                    : language === 'fr'
                    ? '✅ Accès gratuit • Aucune inscription requise • Commencez à tester instantanément'
                    : '✅ Kubuntu • Nta kwiyandikisha birakenewe • Tangira ugerageze ako kanya'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className={`text-sm ${darkMode ? 'text-gray-100' : 'text-gray-300'}`}>
                © {currentYear} <span className="text-blue-400 font-bold">{t('Leon')}</span>. {language === 'en' ? 'All rights reserved.' : language === 'fr' ? 'Tous droits réservés.' : 'Uburenganzira bwose burazirondowe.'}
              </p>
            </div>
            
            <div className="flex gap-6">
              <Link
                to=""
                className={`text-sm transition-colors duration-200 ${
                  darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-300 hover:text-primary-400'
                }`}
              >
                {language === 'en' ? 'Privacy' : language === 'fr' ? 'Confidentialité' : 'Amabanga'}
              </Link>
              <Link
                to=""
                className={`text-sm transition-colors duration-200 ${
                  darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-300 hover:text-primary-400'
                }`}
              >
                {language === 'en' ? 'Terms' : language === 'fr' ? 'Conditions' : 'Amategeko'}
              </Link>
              <Link
                to=""
                className={`text-sm transition-colors duration-200 ${
                  darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-300 hover:text-primary-400'
                }`}
              >
                {language === 'en' ? 'Cookies' : language === 'fr' ? 'Cookies' : 'Cookies'}
              </Link>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                🌐
              </span>
              <button
                onClick={() => setLanguage('rw')}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  language === 'rw'
                    ? 'bg-primary-600 text-white'
                    : darkMode
                    ? 'hover:bg-gray-800 text-gray-400'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                Kinyarwanda
              </button>
              <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  language === 'en'
                    ? 'bg-primary-600 text-white'
                    : darkMode
                    ? 'hover:bg-gray-800 text-gray-400'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                English
              </button>
              <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>|</span>
              <button
                onClick={() => setLanguage('fr')}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  language === 'fr'
                    ? 'bg-primary-600 text-white'
                    : darkMode
                    ? 'hover:bg-gray-800 text-gray-400'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                Français
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 z-40 ${
          darkMode
            ? 'bg-primary-600 hover:bg-primary-700 text-white'
            : 'bg-primary-600 hover:bg-primary-700 text-white'
        }`}
        aria-label={language === 'en' ? 'Back to top' : language === 'fr' ? 'Retour en haut' : 'Subira hejuru'}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </footer>
  );
};