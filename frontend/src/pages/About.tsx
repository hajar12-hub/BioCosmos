import { motion } from 'framer-motion';
import { Database, Microscope, BarChart3, Sparkles } from 'lucide-react';
import { StarfieldBackground } from '../components/StarfieldBackground';
import { HolographicPanel } from '../components/HolographicPanel';
import { Badge } from '../components/ui/badge';

export function About() {
  const dataTypes = [
    {
      icon: Database,
      title: 'Research Publications',
      description: 'Access thousands of NASA bioscience publications on space biology, human health, and life support systems.',
      color: '#8b5cf6',
    },
    {
      icon: Microscope,
      title: 'Experimental Data',
      description: 'Explore datasets from space biology experiments including microgravity effects, radiation studies, and more.',
      color: '#3b82f6',
    },
    {
      icon: BarChart3,
      title: 'Statistical Analysis',
      description: 'Dynamic visualizations and trends analysis across research categories, years, and mission readiness levels.',
      color: '#06b6d4',
    },
    {
      icon: Sparkles,
      title: 'AI-Generated Insights',
      description: 'Machine learning-powered summaries and key findings extracted from complex scientific literature.',
      color: '#10b981',
    },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-16">
      <StarfieldBackground />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block mb-4"
          >
            <div className="text-6xl">🚀</div>
          </motion.div>
          <h1 className="mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 dark:from-white dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
            About SpaceVision
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            An intelligent exploration hub powered by AI and NASA data
          </p>
        </motion.div>

        {/* Mission in holographic panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <HolographicPanel title="🎯 Our Mission" glowColor="#8b5cf6">
            <div className="space-y-6 text-foreground">
              <blockquote className="text-xl leading-relaxed text-white/90 border-l-4 border-cyan-400 pl-6 italic">
                "Our mission is to <strong className="text-cyan-300">empower NASA's mission architects and scientists 
                with intelligent insights from decades of bioscience research</strong>, enabling safer, smarter, 
                and more efficient human space exploration."
              </blockquote>
              
              <div className="pt-4 space-y-4">
                <div className="flex gap-4 items-start">
                  <span className="text-3xl">🌍</span>
                  <div>
                    <h4 className="text-white mb-1">Earth to Mars</h4>
                    <p className="leading-relaxed text-muted-foreground">
                      We analyze how biological systems respond to space environments across planetary surfaces, 
                      space stations, and deep space missions.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <span className="text-3xl">🤖</span>
                  <div>
                    <h4 className="text-white mb-1">AI-Powered Intelligence</h4>
                    <p className="leading-relaxed text-muted-foreground">
                      Advanced machine learning models process thousands of NASA publications, experiments, 
                      and mission data to generate actionable recommendations.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <span className="text-3xl">🚀</span>
                  <div>
                    <h4 className="text-white mb-1">Mission-Ready Insights</h4>
                    <p className="leading-relaxed text-muted-foreground">
                      From radiation protection to life support optimization, we provide real-time dashboards 
                      that inform critical mission decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </HolographicPanel>
        </motion.div>

        {/* Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <HolographicPanel title="Platform Objectives" glowColor="#3b82f6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background/20 rounded-lg p-4 border border-border/30">
                <h4 className="mb-2 text-white flex items-center gap-2">
                  📚 Research Aggregation
                </h4>
                <p className="text-sm text-muted-foreground">
                  Centralize NASA's bioscience publications in one accessible platform
                </p>
              </div>
              <div className="bg-background/20 rounded-lg p-4 border border-border/30">
                <h4 className="mb-2 text-white flex items-center gap-2">
                  🤖 AI Analysis
                </h4>
                <p className="text-sm text-muted-foreground">
                  Generate intelligent summaries and identify research patterns
                </p>
              </div>
              <div className="bg-background/20 rounded-lg p-4 border border-border/30">
                <h4 className="mb-2 text-white flex items-center gap-2">
                  📊 Data Visualization
                </h4>
                <p className="text-sm text-muted-foreground">
                  Transform complex data into interactive, beautiful charts
                </p>
              </div>
              <div className="bg-background/20 rounded-lg p-4 border border-border/30">
                <h4 className="mb-2 text-white flex items-center gap-2">
                  🎓 Knowledge Sharing
                </h4>
                <p className="text-sm text-muted-foreground">
                  Educate and engage through gamified quizzes and challenges
                </p>
              </div>
            </div>
          </HolographicPanel>
        </motion.div>

        {/* Data types available */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <HolographicPanel title="Available Data Types" glowColor="#10b981">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataTypes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-background/20 rounded-xl p-6 border border-border/30 hover:border-primary/50 transition-all group cursor-pointer"
                  style={{
                    boxShadow: `0 0 20px ${item.color}10`,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
                      boxShadow: `0 0 20px ${item.color}20`,
                    }}
                  >
                    <item.icon className="h-7 w-7" style={{ color: item.color }} />
                  </div>
                  <h4 className="mb-2 text-white">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </HolographicPanel>
        </motion.div>

        {/* Tech Stack Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">Built with cutting-edge technology</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['React', 'Three.js', 'Motion', 'TypeScript', 'Flask', 'Recharts', 'AI/ML', 'Tailwind'].map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-primary/10 border-primary/30 text-primary"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
