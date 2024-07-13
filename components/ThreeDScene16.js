// components/ThreeDScene16.js
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import useSound from 'use-sound';
import styles from '../styles/ThreeDScene.module.css';
import Modal from 'react-modal';

const Model = () => {
  const gltf = useGLTF('/16/scene.gltf');
  const { scene, animations } = gltf;
  const mixer = useRef();

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => mixer.current.clipAction(clip).play());
    }
  }, [animations, scene]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return <primitive object={scene} />;
};

const ImageComponent = ({ imageUrl }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src={imageUrl} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </div>
  );
};

const Lightbox = ({ isOpen, onClose, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          position: 'static',
          border: 'none',
          background: 'transparent',
          padding: 0,
          overflow: 'hidden',
        },
      }}
    >
      <div style={{ position: 'relative', width: '80vw', height: '80vh' }}>
        <button style={{ position: 'absolute', top: 10, left: 10, padding: 10 }} onClick={onClose}>
          Close
        </button>
        <button style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', padding: 10 }} onClick={prevImage}>
          Prev
        </button>
        <button style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', padding: 10 }} onClick={nextImage}>
          Next
        </button>
        <ImageComponent imageUrl={images[currentImageIndex]} />
      </div>
    </Modal>
  );
};

const ThreeDScene16 = () => {
  const [play, { stop }] = useSound('/16/sound.mp3');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const images = [
    'https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-astronaut-macinmac.jpg',
    'https://mrwallpaper.com/images/hd/eiffel-tower-portrait-n5lx5ag2y09fsnvu.jpg',
    // Masukkan URL gambar lainnya di sini
  ];

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  const toggleShowLightbox = () => {
    setShowLightbox(!showLightbox);
  };

  return (
    <>
      <div className={styles.container}>
        <button onClick={toggleAudio} className={styles.button}>
          {isPlaying ? 'Stop Audio' : 'Play Audio'}
        </button>
        <button onClick={toggleShowLightbox} className={styles.button}>
          Open Lightbox
        </button>
      </div>
      <Lightbox isOpen={showLightbox} onClose={toggleShowLightbox} images={images} />
      <Canvas style={{ height: '100vh', width: '100vw' }} camera={{ position: [0, 5, 20], fov: 45 }}>
        <ambientLight intensity={2} />
        <directionalLight intensity={1} position={[5, 10, 7.5]} />
        <hemisphereLight intensity={0.5} groundColor={0x444444} />
        <Model />
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default ThreeDScene16;
