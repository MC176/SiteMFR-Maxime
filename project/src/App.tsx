import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Users,
  Star,
  Clock,
  Shield,
  Leaf,
  ChevronRight,
  Award,
  Euro,
  Smartphone,
  CheckCircle,
  MapPin,
  Signal,
  Wifi,
  Battery,
  ArrowRight,
  Bell,
  Heart
} from 'lucide-react';

function CountUpAnimation({ end, duration }: { end: number; duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 50;
    const increment = end / steps;
    const timePerStep = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, timePerStep);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span className="font-bold text-5xl gradient-text">{count}+</span>;
}

function PhoneMockup() {
  const notifications = [
    {
      id: 1,
      title: "Villa Les Jardins d'Élégance",
      message: "Installation de l'éclairage paysager terminée ✨",
      time: "Il y a 5 min"
    },
    {
      id: 2,
      title: "Domaine du Lac",
      message: "Nouvelles photos du bassin aquatique 🌿",
      time: "Il y a 12 min"
    },
    {
      id: 3,
      title: "Résidence Les Magnolias",
      message: "Validation du plan d'aménagement ⭐️",
      time: "Il y a 25 min"
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
      <div className="phone-notch" />
      <div className="phone-status-bar">
        <span>{time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="phone-signal-icons">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>
      </div>
      <div className="relative h-full bg-[#F9FCFF]">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-[#081F5C]">Notifications</h3>
            <Bell className="w-5 h-5 text-[#334EAC]" />
          </div>
          <AnimatePresence mode="wait">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeNotification === index ? 1 : 0,
                  y: activeNotification === index ? 0 : 20,
                  scale: activeNotification === index ? 1 : 0.95,
                }}
                exit={{ opacity: 0, y: -20 }}
                className="notification-card"
                style={{
                  zIndex: activeNotification === index ? 10 : 1,
                }}
              >
                <h4 className="font-semibold text-[#081F5C] mb-2">{notification.title}</h4>
                <p className="text-[#334EAC] mb-3">{notification.message}</p>
                <span className="text-xs text-[#7096D1]">{notification.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
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
            En savoir plus
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] hero-gradient overflow-hidden">
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
              <p className="text-xl text-[#334EAC] mb-10 leading-relaxed">
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

      {/* Services Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Services Premium</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Des prestations d'excellence réalisées par nos apprentis sous la supervision 
              constante de professionnels expérimentés.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Leaf}
              title="Création Paysagère"
              price="Sur devis"
              period="personnalisé"
              description="Conception et réalisation de jardins d'exception. Nous créons des espaces uniques qui reflètent votre personnalité et subliment votre propriété."
            />
            <ServiceCard
              icon={Clock}
              title="Entretien Premium"
              price="À partir de 250€"
              period="/mois"
              description="Service d'entretien haute qualité avec suivi personnalisé. Nos experts prennent soin de votre jardin avec passion et précision."
            />
            <ServiceCard
              icon={MapPin}
              title="Aménagement Extérieur"
              price="Sur devis"
              period="personnalisé"
              description="Création d'espaces de vie extérieurs luxueux. Terrasses, piscines, éclairages et mobilier haut de gamme pour sublimer votre extérieur."
            />
          </div>
        </div>
      </div>

      {/* Digital Innovation Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Suivi en Temps Réel
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Notre application mobile vous permet de suivre l'avancement de votre projet 
                en temps réel. Recevez des mises à jour quotidiennes, des photos et validez 
                chaque étape directement depuis votre smartphone.
              </p>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-green-50 p-3">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Suivi Photo Quotidien</h3>
                    <p className="text-gray-600">Visualisez l'évolution de votre projet jour après jour</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-green-50 p-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Validation des Étapes</h3>
                    <p className="text-gray-600">Gardez le contrôle sur chaque phase du projet</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-green-50 p-3">
                    <Euro className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Transparence Totale</h3>
                    <p className="text-gray-600">Suivez les coûts en temps réel</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"
                  alt="Application mobile EMFR"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white premium-card p-6 max-w-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Note Moyenne</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "Un suivi impeccable et une équipe très professionnelle. Je recommande vivement !"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Notre Engagement</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Une formation d'excellence certifiée par l'État, garantissant qualité et professionnalisme
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="premium-card p-8"
            >
              <Shield className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Formation Certifiée</h3>
              <p className="text-gray-600 leading-relaxed">
                Nos apprentis suivent un programme rigoureux sous la supervision constante 
                de professionnels expérimentés, garantissant des prestations de haute qualité.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="premium-card p-8"
            >
              <Star className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Excellence Garantie</h3>
              <p className="text-gray-600 leading-relaxed">
                Notre engagement qualité est total. Nous offrons une garantie satisfait ou remboursé 
                sur l'ensemble de nos prestations.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#081F5C] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-400" />
              <p className="text-lg font-medium">Initiative menée par la MFR de Richerenches et Maxime Chauvin</p>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#334EAC] to-transparent mx-auto my-6"></div>
            <p className="text-[#7096D1] text-sm">
              © {new Date().getFullYear()} MFR de Richerenches - Tous droits réservés
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;