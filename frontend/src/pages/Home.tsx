import { motion } from 'framer-motion';
import { StarfieldBackground } from '../components/StarfieldBackground';
import { FloatingPlanetButtons } from '../components/FloatingPlanetButtons';
import { FeatureReel } from '../components/FeatureReel';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarfieldBackground />
      
      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm">AI-Powered NASA Dashboard</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 dark:from-white dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent"
          >
            Welcome to NovaTrip
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-4xl mx-auto leading-relaxed mb-8"
          >
            An intelligent exploration hub powered by AI and NASA data. Explore planetary environments, 
            radiation effects, and biological responses across space missions.
          </motion.p>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <Button
              onClick={() => navigate('/about')}
              variant="outline"
              className="border-primary/30 hover:bg-primary/10"
            >
              About Mission
            </Button>
            <Button
              onClick={() => navigate('/ai-summarizer')}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              AI Summarizer
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* 4 Floating 3D Planet Buttons */}
        <FloatingPlanetButtons />

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-20 text-sm text-muted-foreground"
        >
          <p>Click any destination to explore real-time data and AI-powered insights</p>
        </motion.div>
      </div>

      {/* Feature Reel Section */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-background/50 to-background">
        <FeatureReel />
      </div>
    </div>
  );
}
