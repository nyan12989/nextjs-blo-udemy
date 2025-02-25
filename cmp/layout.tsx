import { Geist } from "next/font/google";
import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Image from "next/image";
import Link from "next/link";

const name = "カマキリのブログ";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export default function Layout({ 
  children, 
  home 
}: { 
  children: React.ReactNode; 
  home?: boolean;
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={`${styles.container} ${geist.variable}`}>
        <header className={styles.header}>
          {home ? (
            <>
              <div className={styles.logoContainer}>
                <Image 
                  src="/images/logo.png" 
                  alt="カマキリのブログ" 
                  className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
                  width={240}
                  height={240}
                  priority
                />
              </div>
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              <div className={styles.logoContainer}>
                <Link href="/">
                  <Image 
                    src="/images/logo.png" 
                    alt="カマキリのブログ" 
                    className={`${utilStyles.borderCircle} ${styles.headerImage}`}
                    width={96}
                    height={96}
                    priority
                  />
                </Link>
              </div>
              <h1 className={utilStyles.headingLg}>{name}</h1>
            </>
          )}
        </header>
        
        <main>
          {!home && (
            <div className={styles.backToHome}>
              <Link href="/">
                <button className={styles.backButton}>ホームに戻る</button>
              </Link>
            </div>
          )}
          {children}
        </main>
        
        <footer className={styles.footer}>
          <p>© 2025 {name}. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}