import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Globe, Microscope } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm">Powered by NASA Bioscience Research</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 dark:from-white dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent"
          >
            Advancing Life Beyond Earth
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            BioCosmos synthesizes cutting-edge NASA bioscience research to enable sustainable human exploration of the Moon and Mars. Discover AI-powered insights from thousands of publications on space biology, agriculture, human health, and life support systems.
          </motion.p>

          {/* 4 Big Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto"
          >
            {[
              { 
                path: '/', 
                label: 'Home', 
                icon: Globe, 
                color: 'from-purple-600 to-violet-600',
                glow: '#8b5cf6',
                description: 'Welcome Station'
              },
              { 
                path: '/about', 
                label: 'About', 
                icon: Microscope, 
                color: 'from-blue-600 to-cyan-600',
                glow: '#3b82f6',
                description: 'Mission Info'
              },
              { 
                path: '/summary', 
                label: 'Summary', 
                icon: Globe, 
                color: 'from-orange-600 to-red-600',
                glow: '#cd5c5c',
                description: 'Mars Explorer'
              },
              { 
                path: '/quiz', 
                label: 'Quiz', 
                icon: Sparkles, 
                color: 'from-cyan-600 to-teal-600',
                glow: '#06b6d4',
                description: 'Test Knowledge'
              },
            ].map((nav, index) => (
              <motion.div
                key={nav.path}
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group"
                style={{ perspective: '1000px' }}
              >
                <button
                  onClick={() => navigate(nav.path)}
                  className={`w-full h-full relative overflow-hidden rounded-2xl bg-gradient-to-br ${nav.color} p-8 transition-all duration-300 border border-white/10 hover:border-white/30`}
                  style={{
                    boxShadow: `0 10px 40px ${nav.glow}40, 0 0 0 1px ${nav.glow}20`,
                  }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${nav.glow}40 0%, transparent 70%)`,
                    }}
                  />
                  
                  {/* Animated particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <nav.icon className="h-12 w-12 mb-4 mx-auto text-white drop-shadow-lg" />
                    </motion.div>
                    <h3 className="text-white mb-2 text-xl drop-shadow-lg">{nav.label}</h3>
                    <p className="text-white/80 text-sm">{nav.description}</p>
                  </div>

                  {/* 3D edge highlight */}
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Globe,
                title: 'Mission-Critical Research',
                description: 'Curated findings from Moon and Mars exploration studies',
              },
              {
                icon: Microscope,
                title: 'AI-Powered Insights',
                description: 'Machine learning summaries of complex bioscience papers',
              },
              {
                icon: Sparkles,
                title: 'Real-Time Analytics',
                description: 'Dynamic visualizations of research trends and impact',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all">
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
