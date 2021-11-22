let envUrl = null;

if (process.env.NEXT_PUBLIC_DOMAIN_ENV === "production") {
  //生产环境接口地址
  envUrl = "https://www.lxwlmall.com";
} else {
  //开发以及测试环境接口地址
  envUrl = "https://www.lxwlmall.com";
  //   envUrl = "http://maintest2.66123123.com";
}

export default envUrl;
