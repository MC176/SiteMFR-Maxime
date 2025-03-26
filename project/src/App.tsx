import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Users, Star, Clock, Shield, Leaf, ChevronRight, Award,
  Euro, Smartphone, CheckCircle, MapPin, Signal, Wifi, Battery,
  ArrowRight, Bell, Heart, Menu, X, Scissors, TreePine, MessageSquare,
  Instagram, Facebook, Mail, Send, Plus
} from 'lucide-react';

function CountUpAnimation({ end, duration }: { end: number; duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);

    return () => {
      startTimestamp = null;
    };
  }, [end, duration]);

  return <span className="font-bold text-5xl gradient-text">{count}+</span>;
}

function PhoneMockup() {
  const notifications = [
    {
      id: 1,
      title: "Villa Les Jardins d'Élégance",
      message: "Installation de l'éclairage paysager terminée ✨",
      time: "Il y a 5 min",
      progress: 100,
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Domaine du Lac",
      message: "Nouvelles photos du bassin aquatique 🌿",
      time: "Il y a 12 min",
      progress: 75,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Résidence Les Magnolias",
      message: "Validation du plan d'aménagement ⭐️",
      time: "Il y a 25 min",
      progress: 40,
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80"
    }
  ];

  const [activeNotification, setActiveNotification] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNotification((prev) => (prev + 1) % notifications.length);
      setTime(new Date());
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="phone-mockup">
      <div className="phone-notch">
        <div className="phone-dynamic-island">
          <div className="phone-camera" />
          <div className="phone-sensor" />
        </div>
      </div>
      <div className="phone-status-bar">
        <span className="font-medium">{time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="phone-signal-icons">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>
      </div>
      <div className="relative h-full bg-gradient-to-b from-[#F9FCFF] to-white px-4 pt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-[#081F5C]">Bonjour 👋</h3>
            <p className="text-sm text-[#7096D1]">Voici vos projets en cours</p>
          </div>
          <Bell className="w-5 h-5 text-[#334EAC]" />
        </div>
        
        <AnimatePresence mode="wait">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: activeNotification === index ? 1 : 0,
                y: activeNotification === index ? 0 : 20,
                scale: activeNotification === index ? 1 : 0.95,
              }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="notification-card"
              style={{
                zIndex: activeNotification === index ? 10 : 1,
              }}
            >
              <div className="flex items-start gap-4">
                <img
                  src={notification.image}
                  alt={notification.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-[#081F5C] text-sm mb-1">{notification.title}</h4>
                  <p className="text-[#7096D1] text-sm mb-2">{notification.message}</p>
                  <div className="w-full h-1 bg-[#E7F1FF] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#081F5C] to-[#334EAC]"
                      initial={{ width: 0 }}
                      animate={{ width: `${notification.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs text-[#7096D1] mt-2 block">{notification.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="absolute bottom-8 left-4 right-4">
          <button className="w-full premium-button justify-center">
            <Plus className="w-5 h-5 mr-2" />
            Nouveau projet
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, price, period, description }: {
  icon: React.ElementType;
  title: string;
  price: string;
  period: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="premium-card p-10"
    >
      <div className="space-y-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#F9FCFF] to-[#E7F1FF] p-4 w-fit">
          <Icon className="w-10 h-10 text-[#334EAC]" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-[#081F5C]">{title}</h3>
          <p className="text-[#7096D1] leading-relaxed mb-6">{description}</p>
        </div>
        <div className="space-y-6">
          <div>
            <span className="service-price">{price}</span>
            <span className="service-period">{period}</span>
          </div>
          <button className="learn-more-button w-full justify-center">
            Demander un devis
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ image, title, category, rating }: {
  image: string;
  title: string;
  category: string;
  rating: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="premium-card overflow-hidden"
    >
      <div className="relative aspect-square">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm opacity-90">{category}</span>
            <div className="flex items-center gap-1">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ContactForm() {
  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nom complet
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-3 rounded-xl border border-[#E7F1FF] focus:ring-2 focus:ring-[#334EAC] focus:border-transparent"
          placeholder="Votre nom"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-3 rounded-xl border border-[#E7F1FF] focus:ring-2 focus:ring-[#334EAC] focus:border-transparent"
          placeholder="votre@email.com"
        />
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
          Type de service
        </label>
        <select
          id="service"
          className="w-full px-4 py-3 rounded-xl border border-[#E7F1FF] focus:ring-2 focus:ring-[#334EAC] focus:border-transparent"
        >
          <option value="">Sélectionnez un service</option>
          <option value="taille">Taille de haies & élagage</option>
          <option value="amenagement">Aménagement paysager</option>
          <option value="entretien">Entretien de jardins</option>
          <option value="creation">Création d'espaces verts</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-[#E7F1FF] focus:ring-2 focus:ring-[#334EAC] focus:border-transparent"
          placeholder="Décrivez votre projet..."
        ></textarea>
      </div>
      <button type="submit" className="premium-button w-full justify-center">
        Envoyer
        <Send className="w-5 h-5 ml-2" />
      </button>
    </form>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'realisations', label: 'Réalisations' },
    { id: 'avis', label: 'Avis Clients' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-[#334EAC] rounded-lg flex items-center justify-center text-white font-bold">
              MFR
            </div>
            <span className="ml-3 text-xl font-bold text-[#081F5C]">MFR Paysage</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-[#334EAC]'
                    : 'text-gray-600 hover:text-[#334EAC]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button className="premium-button">
              <Phone className="w-4 h-4 mr-2" />
              Nous contacter
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#334EAC]" />
            ) : (
              <Menu className="h-6 w-6 text-[#334EAC]" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-[#334EAC]"
                  >
                    {item.label}
                  </button>
                ))}
                <button className="premium-button w-full justify-center mt-4">
                  <Phone className="w-4 h-4 mr-2" />
                  Nous contacter
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Propriétaire",
      content: "Un travail remarquable réalisé par l'équipe. Le suivi via l'application est vraiment pratique !",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Pierre Martin",
      role: "Gérant de copropriété",
      content: "Professionnalisme et qualité au rendez-vous. Les apprentis sont très bien encadrés.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Sophie Laurent",
      role: "Architecte paysagiste",
      content: "Une collaboration fructueuse qui allie formation et excellence du service.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="py-24 bg-white" id="avis">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Ce que disent nos clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits et leur expérience avec notre équipe.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="premium-card p-8"
            >
              <div className="flex items-center mb-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-[#081F5C]">{review.name}</h4>
                  <p className="text-sm text-[#7096D1]">{review.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600">{review.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Remplacement par l'iframe YouTube */}
      <iframe
        className="absolute inset-0 w-full h-full object-cover"
        src="https://www.youtube.com/embed/zJIkX35lpcU?autoplay=1&loop=1&mute=1&playlist=zJIkX35lpcU&controls=0"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-6"
          >
            Une équipe passionnée à votre service
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8"
          >
            Découvrez notre savoir-faire et notre engagement pour des espaces verts d'exception
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            <button className="premium-button">
              Découvrir nos services
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button className="secondary-button bg-white/10 hover:bg-white/20 border-white/20">
              Nos réalisations
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <Header />
      
      {/* Hero Section */}
      <div className="relative min-h-[90vh] hero-gradient overflow-hidden" id="accueil">
        {/* Background blobs */}
        <div className="absolute w-96 h-96 rounded-full bg-[#081F5C]/5 top-20 left-20 animate-blob opacity-70 filter blur-3xl" />
        <div className="absolute w-96 h-96 rounded-full bg-[#334EAC]/5 bottom-20 right-20 animate-blob opacity-70 filter blur-3xl" style={{ animationDelay: "-2s" }} />
        <div className="absolute w-96 h-96 rounded-full bg-[#7096D1]/5 top-40 right-40 animate-blob opacity-70 filter blur-3xl" style={{ animationDelay: "-4s" }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-bold leading-tight mb-6">
                <span className="gradient-text">Excellence</span>
                <br />
                en Paysagisme
              </h1>
              <p className="text-xl text-[#7096D1] mb-10 leading-relaxed">
                Une expertise unique dans la création et l'entretien de jardins d'exception. 
                Nous donnons vie à vos rêves d'espaces extérieurs avec raffinement et élégance.
              </p>
              <div className="flex gap-4">
                <button className="premium-button">
                  Découvrir nos services
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
                <button className="secondary-button">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Télécharger l'App
                </button>
              </div>

              {/* Floating stats cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 bg-gradient-to-br from-white to-[#E7F1FF]/20 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E7F1FF] max-w-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#081F5C]/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-[#081F5C]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#7096D1]">Note moyenne</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="ml-2 font-semibold text-[#081F5C]">4.9/5</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="max-w-[300px] mx-auto">
                <PhoneMockup />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Users className="w-12 h-12 text-green-600 mx-auto mb-6" />
              <CountUpAnimation end={500} duration={2000} />
              <p className="text-gray-600 mt-3 text-lg">Clients Satisfaits</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Star className="w-12 h-12 text-green-600 mx-auto mb-6" />
              <CountUpAnimation end={150} duration={2000} />
              <p className="text-gray-600 mt-3 text-lg">Projets Réalisés</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Award className="w-12 h-12 text-green-600 mx-auto mb-6" />
              <CountUpAnimation end={50} duration={2000} />
              <p className="text-gray-600 mt-3 text-lg">Apprentis Formés</p>
            </motion.div>
          </div>
        </div>
      </div>

      <Reviews />
      
      <VideoSection />

      {/* Services Section */}
      <div className="py-24 bg-gray-50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Nos Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Des prestations éco-responsables réalisées par nos apprentis sous la supervision 
              constante de professionnels expérimentés.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={Scissors}
              title="Taille & Élagage"
              price="À partir de 80€"
              period="/intervention"
              description="Taille de haies, arbustes et petits arbres. Intervention précise et respectueuse de la végétation."
            />
            <ServiceCard
              icon={TreePine}
              title="Aménagement"
              price="Sur devis"
              period="personnalisé"
              description="Création d'espaces paysagers écologiques avec des matériaux locaux et durables."
            />
            <ServiceCard
              icon={Award}
              title="Entretien"
              price="À partir de 120€"
              period="/mois"
              description="Entretien régulier de votre jardin : tonte, désherbage, taille et soins des végétaux."
            />
            <ServiceCard
              icon={Leaf}
              title="Création"
              price="Sur devis"
              period="personnalisé"
              description="Conception et réalisation complète de votre jardin, de l'étude à la plantation."
            />
          </div>
        </div>
      </div>

      {/* Réalisations Section */}
      <div className="py-24 bg-white" id="realisations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Nos Réalisations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Découvrez nos plus beaux projets et laissez-vous inspirer pour votre futur jardin.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              image="https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80"
              title="Jardin Méditerranéen"
              category="Création complète"
              rating={5}
            />
            <ProjectCard
              image="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80"
              title="Terrasse Zen"
              category="Aménagement"
              rating={5}
            />
            <ProjectCard
              image="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80"
              title="Potager Bio"
              category="Création"
              rating={5}
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-24 bg-gray-50" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Contactez-nous
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Vous avez un projet en tête ? N'hésitez pas à nous contacter pour en discuter. 
                Notre équipe vous répondra dans les plus brefs délais.
              </p>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-green-50 p-3">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Téléphone</h3>
                    <p className="text-gray-600">+33 4 90 28 00 00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-green-50 p-3">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-gray-600">contact@mfr-richerenches.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-green-50 p-3">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Adresse</h3>
                    <p className="text-gray-600">MFR de Richerenches<br />Enclave des Papes<br />84600 Richerenches</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="premium-card p-8"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#081F5C] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">À propos</h3>
              <p className="text-[#7096D1] leading-relaxed">
                Une initiative de la MFR de Richerenches pour former la nouvelle génération 
                de paysagistes tout en proposant des services de qualité.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-[#7096D1]">
                <li>Taille & Élagage</li>
                <li>Aménagement Paysager</li>
                <li>Entretien de Jardins</li>
                <li>Création d'Espaces Verts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-[#7096D1]">
                <li>Mentions légales</li>
                <li>Politique de confidentialité</li>
                <li>Conditions générales</li>
                <li>Cookies</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-[#7096D1] transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-white hover:text-[#7096D1] transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <div className="mt-6">
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/review.svg?post_id=123456&theme=light"
                  alt="Avis clients"
                  className="h-10"
                />
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#334EAC]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#7096D1] text-sm">
                © {new Date().getFullYear()} MFR de Richerenches - Tous droits réservés
              </p>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                <p className="text-sm">
                  Développé avec passion par la MFR de Richerenches
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;