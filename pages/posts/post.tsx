import Head from "next/head";
import Link from "next/link";
import Layout from "@/cmp/layout";

// Nodeモジュールのインポートを削除

export default function Post() {
  return (
    <Layout>
      <div>
        <Head>
          <title>最初の投稿</title>
          <meta name="description" content="最初の投稿です。" />
        </Head>
        <h1>最初の投稿</h1>
        <Link href="/">トップへ戻る</Link>
      </div>
    </Layout>
  );
}

// getStaticidsとgetPostData関数を削除
// これらはlib/post.tsに既にあるはずです