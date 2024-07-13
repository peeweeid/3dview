// pages/index.js
import Link from 'next/link';
import styles from '../styles/index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className='center'>Welcome to My 3D Web Application!</h1>
      <p>Explore our 3D scene and embrace the "go green" theme:</p>
      <Link href="/three-d-scene" >
        Go to 3D Scene
      </Link>
    </div>
  );
};

export default Home;
