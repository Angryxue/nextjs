const withLess = require("next-with-less");

const targetMap = {
  // development: "http://maintest2.66123123.com",
  development: "https://www.lxwlmall.com",
  production: "https://www.lxwlmall.com",
};

const target = targetMap[process.env.NEXT_PUBLIC_DOMAIN_ENV];

module.exports = withLess({
  reactStrictMode: true,
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        "@primary-color": "#19A5A7",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: target + "/api/:path*/",
      },
    ];
  },
});
