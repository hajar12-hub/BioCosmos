import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const pageTransitions = {
  '/': {
    name: 'Home Base',
    color: '#8b5cf6',
    particles: 100,
  },
  '/mars': {
    name: 'Mars Surface',
    color: '#cd5c5c',
    particles: 120,
  },
  '/moon': {
    name: 'Lunar Station',
    color: '#c0c0c0',
    particles: 90,
  },
  '/iss': {
    name: 'ISS Orbit',
    color: '#3b82f6',
    particles: 110,
  },
  '/human': {
    name: 'Human Star',
    color: '#ffd700',
    particles: 150,
  },
  '/about': {
    name: 'Mission Info',
    color: '#06b6d4',
    particles: 80,
  },
  '/ai-summarizer': {
    name: 'AI Laboratory',
    color: '#10b981',
    particles: 100,
  },
};

export function GalaxyNavigation() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevLocation, setPrevLocation] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevLocation) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevLocation(location.pathname);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, prevLocation]);

  const currentPage = pageTransitions[location.pathname as keyof typeof pageTransitions] || pageTransitions['/'];

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          {/* Warp speed effect */}
          <div className="absolute inset-0 bg-black">
            {/* Speed lines */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-0.5 bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: '2px',
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: [0, 100, 0],
                  opacity: [0, 1, 0],
                  x: [0, -500],
                }}
                transition={{
                  duration: 0.8,
                  delay: Math.random() * 0.5,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Radial burst */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at center, ${currentPage.color}40 0%, transparent 70%)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 3, opacity: [0, 1, 0] }}
              transition={{ duration: 1.2 }}
            />

            {/* Central portal */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1.5, 0], rotate: 360 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              <div
                className="w-64 h-64 rounded-full border-4"
                style={{
                  borderColor: currentPage.color,
                  boxShadow: `0 0 60px ${currentPage.color}, inset 0 0 60px ${currentPage.color}`,
                }}
              />
            </motion.div>

            {/* Particles explosion */}
            {Array.from({ length: currentPage.particles }).map((_, i) => {
              const angle = (i / currentPage.particles) * Math.PI * 2;
              const radius = 50 + Math.random() * 200;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    backgroundColor: currentPage.color,
                    boxShadow: `0 0 4px ${currentPage.color}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: x * 3,
                    y: y * 3,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: Math.random() * 0.3,
                    ease: 'easeOut',
                  }}
                />
              );
            })}

            {/* Destination label */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
              transition={{ duration: 1.5, times: [0, 0.3, 0.7, 1] }}
            >
              <div className="text-center">
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, ease: 'linear' }}
                >
                  🚀
                </motion.div>
                <h2 className="text-white text-2xl mb-2" style={{ textShadow: `0 0 20px ${currentPage.color}` }}>
                  Traveling to
                </h2>
                <h1
                  className="text-white text-4xl"
                  style={{ 
                    textShadow: `0 0 30px ${currentPage.color}`,
                    color: currentPage.color,
                  }}
                >
                  {currentPage.name}
                </h1>
              </div>
            </motion.div>

            {/* Grid effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(${currentPage.color}20 1px, transparent 1px),
                  linear-gradient(90deg, ${currentPage.color}20 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.5, 0], scale: 2 }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
