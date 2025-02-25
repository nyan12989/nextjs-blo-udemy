import Head from "next/head";
import Link from "next/link";
import Layout from "@/cmp/layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html"




const postsDirectory=path.join(process.cwd(),"posts");



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


export function getStaticids() {
  const filenames=fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
      return {params:{id:filename.replace(".md","")}}
  });
}


export async function getPostData(id:string)
{
  const fullPath=path.join(postsDirectory,`${id}.md`);
  const fileContents=fs.readFileSync(fullPath,"utf8");

  const matterResult=matter(fileContents);

  const blogContent=await remark()
  .use(html)
  .process(matterResult.content);

  const blogContentHtml=blogContent.toString();


  return {
    id,
    blogContentHtml,
    ...matterResult.data,
    
  }
}