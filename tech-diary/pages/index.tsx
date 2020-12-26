import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { NextPageContext } from 'next';

import { MainTemplate } from 'components/template/MainTemplate';
import PostLayout from 'container/Post/PostLayout';
import { server } from 'config/config';

type Props = {
  posts: Array<any>,
}

function IndexPage({ posts }: Props) {

  return (
    <>
      <Head>
        <title>Main page</title>
      </Head>
      <MainTemplate>
        <PostLayout posts={posts}/>
      </MainTemplate>
    </>
  );
};

IndexPage.getInitialProps = async (_: NextPageContext) => {
  const posts = await axios.get(`${server.host}/post/`, {
    params: {
        category: "server",
        page: "1",
    },
  });
  
  
  return { posts };
};

 export default IndexPage;