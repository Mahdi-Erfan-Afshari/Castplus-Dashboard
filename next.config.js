/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
	  domains: ['github.com', 'lh3.googleusercontent.com', 'deow9bq0xqvbj.cloudfront.net']
	},
  webpack: (config, { isServer }) => {
		if (!isServer) {
			// config.node = {
			// 	dns: 'empty',
			// };
		  config.resolve.fallback.fs = false
		  config.resolve.fallback.tls = false
		  config.resolve.fallback.net = false
		  config.resolve.fallback.child_process = false
		  config.resolve.fallback.dns = false
		}
		
	
		return config
		
	  },     
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
