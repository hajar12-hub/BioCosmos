import { motion } from 'motion/react';
import { Brain, Globe, Sparkles, Zap, Telescope, Activity } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Advanced machine learning algorithms analyze space radiation data and biological responses',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Globe,
    title: 'Multi-Destination Support',
    description: 'Explore Mars, Moon, ISS, and human biological data with interactive 3D visualizations',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Sparkles,
    title: 'Gemini Chat Assistant',
    description: 'Get instant answers about space radiation, prevention strategies, and mission data',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Real-Time Analytics',
    description: 'Live dashboards with radiation levels, exposure trends, and predictive modeling',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Telescope,
    title: 'NASA Data Integration',
    description: 'Comprehensive datasets from Mars missions, lunar expeditions, and ISS operations',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Activity,
    title: 'Biological Monitoring',
    description: 'Track DNA damage, cellular responses, and health metrics in space environments',
    gradient: 'from-green-500 to-emerald-500',
  },
];

export function FeatureReel() {
  return (
    <div className="w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-6"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm">Cutting-Edge Features</span>
        </motion.div>
        
        <h2 className="mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Revolutionizing Space Bioscience
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          NovaTrip combines AI, NASA data, and stunning 3D visualizations to provide comprehensive insights into space radiation and biological effects
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="relative h-full p-6 overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all group">
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon container */}
                <motion.div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 relative z-10`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="mb-2 relative z-10">{feature.title}</h3>
                <p className="text-sm text-muted-foreground relative z-10 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl -z-10" />
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Animated stats section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16 px-4"
      >
        {[
          { value: '4', label: 'Destinations' },
          { value: '100K+', label: 'Data Points' },
          { value: 'AI', label: 'Powered' },
          { value: '3D', label: 'Visualizations' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="text-center p-6 rounded-xl border border-primary/20 bg-card/30 backdrop-blur-sm"
          >
            <motion.div
              className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              {stat.value}
            </motion.div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
