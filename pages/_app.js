import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import "antd/dist/antd.less";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>
          领先未来-专业的B2B办公综合服务平台-领先未来科技集团有限公司
        </title>
        <meta
          name="keywords"
          content="办公用品-办公耗材-打印机-复印纸-政府采购-政府电商-B2B综合解决方案服务商"
        />
        <meta
          name="description"
          content="领先未来科技集团有限公司，是国内一流的B2B综合解决方案服务商，专注于办公服务领域。为响应国家提出的阳光采购倡议，针对政企采购效率低、成本高、过程不透明的问题。"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
