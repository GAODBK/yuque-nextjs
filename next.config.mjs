/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // 优化mantine组件库, 防止
        // [webpack.cache.PackFileCacheStrategy] Serializing big strings (145kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
        // turbo: {
        //     rules: {
        //         '*.scss': {
        //             loaders: ['style-loader', 'css-loader', 'sass-loader'],
        //             as: '*.js',
        //         },
        //     },
        // },
        turbo: {
            rules: {
                '*.{numbers,xls,xlsx,xlsb}': {
                    loaders: ['@/base64-loader'],
                },
            }
        }
    },
    webpack: (config) => {
        /* add to the webpack config module.rules array */
        config.module.rules.push({
            /* `test` matches file extensions */
            test: /\.(numbers|xls|xlsx|xlsb)/,
            /* use the loader script */
            use: [{loader: './base64-loader'}]
        });
        return config;
    },
    sassOptions: {
        // silenceDeprecations: ['legacy-js-api'],
        // silenceDeprecations: ['modern'],
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*', // Or specify your allowed origin
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
