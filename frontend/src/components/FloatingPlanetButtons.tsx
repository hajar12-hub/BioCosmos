import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Mesh, Group, Shape } from 'three';

// Mars Planet Button
function MarsButton({ onClick }: { onClick: () => void }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group onClick={onClick}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#cd5c5c"
          roughness={0.8}
          metalness={0.2}
          emissive="#cd5c5c"
          emissiveIntensity={0.3}
        />
      </Sphere>
      {/* Atmosphere glow */}
      <Sphere args={[1.1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ff6b35"
          transparent
          opacity={0.2}
          emissive="#ff6b35"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </group>
  );
}

// Moon Button
function MoonButton({ onClick }: { onClick: () => void }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + 1) * 0.1;
    }
  });

  return (
    <group onClick={onClick}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#c0c0c0"
          roughness={0.9}
          metalness={0.5}
          emissive="#c0c0c0"
          emissiveIntensity={0.2}
        />
      </Sphere>
      {/* Silver glow */}
      <Sphere args={[1.05, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#e8e8e8"
          transparent
          opacity={0.3}
          emissive="#ffffff"
          emissiveIntensity={0.4}
        />
      </Sphere>
    </group>
  );
}

// ISS Station Button
function ISSButton({ onClick }: { onClick: () => void }) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.3, 0.3]} />
        <meshStandardMaterial color="#4a90e2" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Solar panels */}
      <mesh position={[-1, 0, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.6]} />
        <meshStandardMaterial color="#1e3a8a" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.6]} />
        <meshStandardMaterial color="#1e3a8a" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Modules */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Human Star Button
function HumanStarButton({ onClick }: { onClick: () => void }) {
  const groupRef = useRef<Group>(null);
  const glowRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + 3) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Star points - 5 pointed star made from cones */}
      {[...Array(5)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const x = Math.cos(angle) * 0.6;
        const y = Math.sin(angle) * 0.6;
        return (
          <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle + Math.PI / 2]}>
            <coneGeometry args={[0.25, 0.8, 4]} />
            <meshStandardMaterial
              color="#ffd700"
              emissive="#ffd700"
              emissiveIntensity={0.8}
              metalness={0.5}
              roughness={0.2}
            />
          </mesh>
        );
      })}

      {/* Central sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={1}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Pulsating glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          transparent
          opacity={0.2}
          emissive="#ffed4e"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Human silhouette - head */}
      <mesh position={[0, 0, 0.45]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      {/* Body */}
      <mesh position={[0, -0.15, 0.45]}>
        <cylinderGeometry args={[0.08, 0.08, 0.25, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

interface PlanetButtonProps {
  type: 'mars' | 'moon' | 'iss' | 'human';
  label: string;
  description: string;
  route: string;
}

function PlanetButton3D({ type, label, description, route }: PlanetButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      className="relative group cursor-pointer"
    >
      <div className="w-64 h-64">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          
          {type === 'mars' && <MarsButton onClick={handleClick} />}
          {type === 'moon' && <MoonButton onClick={handleClick} />}
          {type === 'iss' && <ISSButton onClick={handleClick} />}
          {type === 'human' && <HumanStarButton onClick={handleClick} />}
        </Canvas>
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-4"
      >
        <h3 className="text-white mb-2 text-xl">{label}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </motion.div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
        style={{
          background:
            type === 'mars'
              ? '#cd5c5c'
              : type === 'moon'
              ? '#c0c0c0'
              : type === 'iss'
              ? '#3b82f6'
              : '#ffd700',
        }}
      />
    </motion.div>
  );
}

export function FloatingPlanetButtons() {
  const buttons: PlanetButtonProps[] = [
    {
      type: 'mars',
      label: 'Mars',
      description: 'Planet Dashboard',
      route: '/mars',
    },
    {
      type: 'moon',
      label: 'Moon',
      description: 'Lunar Dashboard',
      route: '/moon',
    },
    {
      type: 'iss',
      label: 'ISS',
      description: 'Space Station Dashboard',
      route: '/iss',
    },
    {
      type: 'human',
      label: 'Human Star',
      description: 'Astronaut & Biological Dashboard',
      route: '/human',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
      {buttons.map((button, index) => (
        <motion.div
          key={button.type}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
        >
          <PlanetButton3D {...button} />
        </motion.div>
      ))}
    </div>
  );
}
