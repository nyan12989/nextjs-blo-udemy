import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Layout from "@/cmp/layout";
import Link from "next/link";
import Image from "next/image";
import utilStyles from "@/styles/utils.module.css";
import { getSortedPostsData, PostData } from "@/lib/post";

export const siteTitle = "カマキリのブログ";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }: { allPostsData: PostData[] }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="カマキリのブログです。" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <section className={utilStyles.headingMd}>
        <p>私はニコ生配信をしています、よろしくお願いいたします。</p>
      </section>

      <section>
        <h2>最新の投稿</h2>

        <div className={styles.grid}>
          {allPostsData.map(({ id, title, thumbnail, date }) => (
            <article key={id} className={styles.article}>
              <Link href={`/posts/${id}`} className={styles.articleLink}>
              
                <Image
                  src={thumbnail}
                  className={styles.thumbnailImage}
                  alt={title}
                  width={500} // 必要に応じて適切なサイズに変更
                  height={300}
                />
                <h3 className={styles.articleTitle}>{title}</h3>
                <p className={styles.articleDate}>{date}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}