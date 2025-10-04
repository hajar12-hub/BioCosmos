import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HolographicPanelProps {
  children: ReactNode;
  title?: string;
  className?: string;
  glowColor?: string;
}

export function HolographicPanel({ 
  children, 
  title, 
  className = '', 
  glowColor = '#8b5cf6' 
}: HolographicPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Holographic frame */}
      <div
        className="relative rounded-2xl p-6 backdrop-blur-xl"
        style={{
          background: 'rgba(26, 11, 46, 0.3)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          boxShadow: `
            0 0 20px ${glowColor}40,
            inset 0 0 20px ${glowColor}10,
            0 4px 30px rgba(0, 0, 0, 0.3)
          `,
        }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: glowColor }} />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: glowColor }} />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: glowColor }} />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: glowColor }} />

        {/* Scanning line effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="absolute inset-x-0 h-px"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
              boxShadow: `0 0 10px ${glowColor}`,
            }}
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Title bar */}
        {title && (
          <div className="mb-4 pb-3 border-b border-border/30">
            <motion.h3
              className="text-white"
              style={{ textShadow: `0 0 10px ${glowColor}` }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {title}
            </motion.h3>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* External glow */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl blur-xl opacity-30"
        style={{ background: glowColor }}
      />
    </motion.div>
  );
}
