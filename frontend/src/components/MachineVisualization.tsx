import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import type { MachineState } from '../logic/VoynichCompiler'
import { PI_LESS_CONSTANT } from 'co-sphere'

const Disk: React.FC<{ 
  radius: number, 
  color: string, 
  rotationSpeed: number, 
  label: string,
  stateValue: string | number
}> = ({ radius, color, rotationSpeed, label, stateValue }) => {
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed * 0.01
    }
  })

  return (
    <group ref={ref}>
      <mesh rotation={[-PI_LESS_CONSTANT / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.2, radius, 64]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <Text
        position={[radius, 0.1, 0]}
        rotation={[-PI_LESS_CONSTANT / 2, 0, -PI_LESS_CONSTANT / 2]}
        fontSize={0.2}
        color={color}
      >
        {`${label}: ${stateValue}`}
      </Text>
    </group>
  )
}

export const MachineVisualization: React.FC<{ state: MachineState }> = ({ state }) => {
  return (
    <div style={{ height: '400px', width: '100%', border: '1px solid #333', marginTop: '1rem' }}>
      <Canvas camera={{ position: [0, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        
        {/* Stator A - Outer */}
        <Disk 
          radius={3} 
          color="#00ff41" 
          rotationSpeed={0} 
          label="Stator A" 
          stateValue={state.statorA} 
        />
        
        {/* Rotor B - Middle */}
        <Disk 
          radius={2} 
          color="#008f11" 
          rotationSpeed={state.rotorB.length > 0 ? 0.5 : 0.1} 
          label="Rotor B" 
          stateValue={state.rotorB || 'NULL'} 
        />
        
        {/* Scalar Cam - Inner */}
        <Disk 
          radius={1} 
          color="#003b00" 
          rotationSpeed={state.scalarCam * 0.2} 
          label="Scalar" 
          stateValue={state.scalarCam} 
        />

        {/* Central Spine */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 2, 32]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </Canvas>
    </div>
  )
}
