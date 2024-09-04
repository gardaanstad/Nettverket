'use client';

import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const omOssRef = useRef<HTMLDivElement>(null);
  const tjenesterRef = useRef<HTMLDivElement>(null);
  const kontaktRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (isMounted && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navLogo}>
          Nettverket
        </Link>
        <ul className={styles.navLinks}>
          <li><a onClick={() => scrollToSection(omOssRef)}>Om oss</a></li>
          <li><a onClick={() => scrollToSection(tjenesterRef)}>Tjenester</a></li>
          <li><a onClick={() => scrollToSection(kontaktRef)}>Kontakt</a></li>
        </ul>
        <div className={styles.navButtons}>
          <Link href="/login" className={styles.navButton}>
            Logg inn
          </Link>
          <Link href="/signup" className={styles.navButton}>
            Registrer deg
          </Link>
        </div>
      </nav>
      <main className={styles.main}>
        <h1 className={styles.title}>Velkommen til Nettverket</h1>
        <p className={styles.description}>Den norske utviklerens sosiale nettverk</p>
        <div className={styles.buttonContainer}>
          <Link href="/signup" passHref>
            <button className={`${styles.button} ${styles.signupButton}`}>
              Registrer deg
            </button>
          </Link>
          <Link href="/login" passHref>
            <button className={`${styles.button} ${styles.loginButton}`}>
              Logg inn
            </button>
          </Link>
        </div>

        <div ref={omOssRef} className={styles.section}>
          <h2>Om oss</h2>
          <p>Nettverket er den ledende plattformen for norske utviklere. Vi tilbyr et unikt fellesskap hvor du kan dele kunnskap, finne inspirasjon og knytte verdifulle kontakter i bransjen.</p>
        </div>

        <div ref={tjenesterRef} className={styles.section}>
          <h2>Tjenester</h2>
          <ul>
            <li>Jobbmarked for utviklere</li>
            <li>Faglige diskusjonsforum</li>
            <li>Nettverkstreff og konferanser</li>
            <li>Mentorprogram</li>
          </ul>
        </div>

        <div ref={kontaktRef} className={styles.section}>
          <h2>Kontakt</h2>
          <p>Har du spørsmål eller tilbakemeldinger? Ta gjerne kontakt med oss:</p>
          <p>E-post: kontakt@nettverket.no</p>
          <p>Telefon: +47 123 45 678</p>
        </div>
      </main>
    </div>
  );
}
