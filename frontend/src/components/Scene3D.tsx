import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { DNA3D } from './DNA3D';
import { Suspense } from 'react';

interface Scene3DProps {
  showDNA?: boolean;
  className?: string;
}

export function Scene3D({ showDNA = true, className = '' }: Scene3DProps) {
  return (
    <div className={className}>
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          
          {showDNA && <DNA3D />}
          
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
