import Layout from "@/cmp/layout";
import { getStaticids, getPostData } from "@/lib/post";
import utilStyles from "@/styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getStaticids();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);
  return {
    props: { postData },
  };
}

export default function Post({ postData }: { postData: any }) {
  return (
    <Layout>
      <article className={utilStyles.articleContainer}>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <p className={utilStyles.lightText}>{postData.date}</p>
        <img src={postData.thumbnail} alt={postData.title} className={utilStyles.thumbnail} />
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHtml }} />
      </article>
    </Layout>
  );
}
