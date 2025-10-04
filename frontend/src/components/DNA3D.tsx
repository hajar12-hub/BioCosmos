import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

export function DNA3D() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Create DNA helix structure
  const spheres = [];
  
  for (let i = 0; i < 50; i++) {
    const angle = (i / 50) * Math.PI * 4;
    const y = (i / 50) * 4 - 2;
    const radius = 0.5;

    // Add spheres at each point
    spheres.push({
      position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
      color: i % 2 === 0 ? '#8b5cf6' : '#3b82f6',
    });
    spheres.push({
      position: [Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius],
      color: i % 2 === 0 ? '#3b82f6' : '#8b5cf6',
    });
  }

  return (
    <group ref={groupRef}>
      {spheres.map((sphere, index) => (
        <mesh key={index} position={sphere.position as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={sphere.color} emissive={sphere.color} emissiveIntensity={0.5} />
        </mesh>
      ))}
      
      {/* Connecting rungs */}
      {Array.from({ length: 25 }).map((_, i) => {
        const angle = (i / 25) * Math.PI * 4;
        const y = (i / 25) * 4 - 2;
        const radius = 0.5;
        return (
          <mesh
            key={`rung-${i}`}
            position={[0, y, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.02, 0.02, radius * 2, 8]} />
            <meshStandardMaterial color="#06b6d4" opacity={0.6} transparent />
          </mesh>
        );
      })}
    </group>
  );
}
