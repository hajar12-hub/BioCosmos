import { motion } from 'framer-motion';

export function NovaLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer glow circle */}
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="url(#gradient1)"
        strokeWidth="2"
        opacity="0.3"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Middle ring */}
      <motion.circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke="url(#gradient2)"
        strokeWidth="1.5"
        strokeDasharray="5,5"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
      />
      
      {/* Star/Nova center */}
      <g>
        {/* Star points */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.path
            key={i}
            d={`M 100 100 L ${100 + Math.cos((angle * Math.PI) / 180) * 35} ${
              100 + Math.sin((angle * Math.PI) / 180) * 35
            } L ${100 + Math.cos(((angle + 36) * Math.PI) / 180) * 15} ${
              100 + Math.sin(((angle + 36) * Math.PI) / 180) * 15
            } Z`}
            fill="url(#gradient3)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{ transformOrigin: "100px 100px" }}
          />
        ))}
        
        {/* Center core */}
        <motion.circle
          cx="100"
          cy="100"
          r="12"
          fill="url(#gradient4)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </g>
      
      {/* Orbital path */}
      <motion.circle
        cx="100"
        cy="100"
        r="45"
        fill="none"
        stroke="url(#gradient5)"
        strokeWidth="0.5"
        opacity="0.5"
        strokeDasharray="2,4"
      />
      
      {/* Orbiting particle */}
      <motion.circle
        cx="145"
        cy="100"
        r="3"
        fill="#06b6d4"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
      />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        
        <radialGradient id="gradient4">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </radialGradient>
        
        <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
