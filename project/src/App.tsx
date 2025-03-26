import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Users, Star, Clock, Shield, Leaf, ChevronRight, Award, Euro, Smartphone, CheckCircle, MapPin, Signal, Wifi, Battery, ArrowRight, Bell, Heart, Scissors, TreePine, Award as Garden, MessageSquare, Instagram, Facebook, Mail, Send } from 'lucide-react';

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
                Paysagisme de qualité,
                <br />
                <span className="gradient-text">prix justes & transparence totale</span>
              </h1>
              <p className="text-xl text-[#334EAC] mb-10 leading-relaxed">
                Une approche éco-responsable et pédagogique du paysagisme. 
                Nos chantiers sont réalisés par des jeunes en formation, 
                encadrés par des professionnels expérimentés.
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
              icon={Garden}
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
      <div className="py-24 bg-white">
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
      <div className="py-24 bg-gray-50">
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