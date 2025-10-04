import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';
import type { Mesh, Group } from 'three';
import { Vector3 } from 'three';
import { motion } from 'framer-motion';

// Mars planet
function MarsPlanet() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#cd5c5c"
        roughness={0.8}
        metalness={0.2}
      />
    </Sphere>
  );
}

// Crater on surface
function Crater({ position, size }: { position: [number, number, number]; size: number }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color="#8b4513" roughness={0.9} />
    </mesh>
  );
}

// Orbiting molecular button
interface MolecularButtonProps {
  angle: number;
  radius: number;
  color: string;
  icon: string;
  label: string;
  onClick: () => void;
  speed: number;
}

function OrbitingMolecule({ angle, radius, color, icon, onClick, speed }: MolecularButtonProps) {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime * speed;
      const x = Math.cos(t + angle) * radius;
      const z = Math.sin(t + angle) * radius;
      const y = Math.sin(t * 2) * 0.2; // Bobbing effect

      groupRef.current.position.set(x, y, z);
      groupRef.current.rotation.y += 0.02;

      // Scale on hover
      const targetScale = hovered ? 1.3 : 1;
      groupRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main sphere */}
      <Sphere args={[0.3, 32, 32]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.5}
          transparent
          opacity={0.9}
        />
      </Sphere>
      
      {/* Orbiting particles */}
      {[0, 120, 240].map((particleAngle) => {
        const rad = (particleAngle * Math.PI) / 180;
        return (
          <mesh key={particleAngle} position={[Math.cos(rad) * 0.5, 0, Math.sin(rad) * 0.5]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

interface MarsLandscapeProps {
  onMoleculeClick: (category: string) => void;
  selectedCategory: string | null;
}

export function MarsLandscape({ onMoleculeClick, selectedCategory }: MarsLandscapeProps) {
  const molecules = [
    { id: 'O2', label: 'O₂', color: '#06b6d4', angle: 0, speed: 0.3 },
    { id: 'H2O', label: 'H₂O', color: '#3b82f6', angle: Math.PI / 3, speed: 0.35 },
    { id: 'DNA', label: 'DNA', color: '#8b5cf6', angle: (Math.PI * 2) / 3, speed: 0.4 },
    { id: 'Energy', label: 'Energy', color: '#f59e0b', angle: Math.PI, speed: 0.33 },
    { id: 'Agriculture', label: 'Agriculture', color: '#10b981', angle: (Math.PI * 4) / 3, speed: 0.37 },
    { id: 'Protection', label: 'Protection', color: '#ef4444', angle: (Math.PI * 5) / 3, speed: 0.36 },
  ];

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-border/30">
      <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b35" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        
        {/* Mars Planet */}
        <MarsPlanet />
        
        {/* Craters */}
        <Crater position={[1.5, 0.5, 1]} size={0.3} />
        <Crater position={[-1.2, -0.8, 1.2]} size={0.2} />
        <Crater position={[0.8, 1.2, -1]} size={0.25} />
        
        {/* Orbiting molecular buttons */}
        {molecules.map((mol) => (
          <OrbitingMolecule
            key={mol.id}
            {...mol}
            icon={mol.label}
            radius={4}
            onClick={() => onMoleculeClick(mol.id)}
          />
        ))}
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* UI Overlay with labels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-xl px-4 py-3"
          >
            <h3 className="text-white mb-1">🌌 Bio-Spatial Explorer</h3>
            <p className="text-xs text-white/70">Click floating molecules to explore data</p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl px-4 py-3"
          >
            <p className="text-xs text-white/70">🔄 Drag to rotate • Scroll to zoom</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
