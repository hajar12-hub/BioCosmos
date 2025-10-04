import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh, Group } from 'three';

// Floating molecule component
function Molecule({ position, scale, color, speed }: any) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * speed * 2) * 0.1);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

// Atom with orbiting electrons
function Atom({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Nucleus */}
      <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
      </Sphere>
      
      {/* Electron orbits */}
      {[0, 60, 120].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <group key={angle} rotation={[0, 0, rad]}>
            <mesh position={[1, 0, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// DNA Helix under construction
function DNAConstruction({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      // Growing effect
      const scale = Math.min(1, state.clock.elapsedTime * 0.1);
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  const helixPoints = [];
  for (let i = 0; i < 30; i++) {
    const angle = (i / 30) * Math.PI * 3;
    const y = (i / 30) * 3 - 1.5;
    const radius = 0.4;
    
    helixPoints.push({
      pos1: [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number],
      pos2: [Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius] as [number, number, number],
      color: i % 2 === 0 ? '#8b5cf6' : '#3b82f6',
    });
  }

  return (
    <group ref={groupRef} position={position}>
      {helixPoints.map((point, i) => (
        <group key={i}>
          <Sphere args={[0.06, 8, 8]} position={point.pos1}>
            <meshStandardMaterial color={point.color} emissive={point.color} emissiveIntensity={0.6} />
          </Sphere>
          <Sphere args={[0.06, 8, 8]} position={point.pos2}>
            <meshStandardMaterial color={point.color} emissive={point.color} emissiveIntensity={0.6} />
          </Sphere>
        </group>
      ))}
    </group>
  );
}

// Protein structure
function Protein({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.y += 0.008;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Create a twisted protein-like structure */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.5 + Math.sin(i * 0.5) * 0.2;
        const y = Math.sin(i * 0.3) * 0.5;
        
        return (
          <Sphere
            key={i}
            args={[0.15, 16, 16]}
            position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}
          >
            <meshStandardMaterial
              color={i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#f59e0b' : '#ec4899'}
              emissive={i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#f59e0b' : '#ec4899'}
              emissiveIntensity={0.4}
            />
          </Sphere>
        );
      })}
    </group>
  );
}

export function MolecularBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, 10, -10]} intensity={0.5} color="#06b6d4" />

        {/* Giant molecules with zoom in/out effect */}
        <Molecule position={[-4, 2, -2]} scale={1.2} color="#8b5cf6" speed={0.5} />
        <Molecule position={[5, -2, -3]} scale={1.5} color="#3b82f6" speed={0.3} />
        <Molecule position={[2, 3, -5]} scale={1} color="#06b6d4" speed={0.4} />
        <Molecule position={[-3, -3, -4]} scale={1.3} color="#10b981" speed={0.6} />
        
        {/* DNA under construction */}
        <DNAConstruction position={[0, 0, 0]} />
        
        {/* Atoms */}
        <Atom position={[-6, -1, -6]} />
        <Atom position={[6, 2, -7]} />
        
        {/* Proteins */}
        <Protein position={[4, 1, -8]} />
        <Protein position={[-5, 3, -9]} />
      </Canvas>
    </div>
  );
}
