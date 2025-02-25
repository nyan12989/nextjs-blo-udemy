import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

// インターフェース定義
export interface PostData {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
}

// 詳細ページ用のPostDataWithContent型（PostDataを拡張）
export interface PostDataWithContent extends PostData {
  blogContentHtml: string;
}

// mdファイルのデータを取得
export function getSortedPostsData(): PostData[] {
  const filenames = fs.readdirSync(postsDirectory);

  const allPostsData = filenames.map((filename) => {
    const id = filename.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id: id || "no-id", // idがなければ "no-id"
      title: matterResult.data.title || "No Title", // titleがなければデフォルト
      date: matterResult.data.date || "No Date", // dateがなければデフォルト
      thumbnail: matterResult.data.thumbnail || "/images/default-thumbnail.jpg", // thumbnailがなければデフォルト
    };
  });

  return allPostsData.filter((post) => post.id && post.title && post.date); // undefined を除外
}

export function getStaticids() {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md$/, "")
      }
    };
  });
}

export async function getPostData(id: string): Promise<PostDataWithContent> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // マークダウンをパース
  const matterResult = matter(fileContents);

  // マークダウンをHTMLに変換
  const blogContent = await remark()
    .use(html)
    .process(matterResult.content);

  const blogContentHtml = blogContent.toString();

  // データを返却（undefined値にデフォルト値を設定）
  return {
    id,
    blogContentHtml,
    title: matterResult.data.title || "タイトルなし",
    date: matterResult.data.date || "日付なし",
    thumbnail: matterResult.data.thumbnail || "/images/default-thumbnail.jpg",
  };
}