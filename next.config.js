/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
	  domains: ['github.com', 'lh3.googleusercontent.com', 'deow9bq0xqvbj.cloudfront.net', 'cdn-arch.shenoto.com']
	}
}

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

module.exports = nextConfig
