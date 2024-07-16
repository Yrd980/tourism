import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import path from 'path'
import {VueAmapResolver} from "@vuemap/unplugin-resolver"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver({
                exclude: /^ElAmap[A-Z]*/
            }), VueAmapResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver({
                exclude: /^ElAmap[A-Z]*/
            }), VueAmapResolver()],
            include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.tsx\?tsx/],
        }),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, './src'),

        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
        proxy: {
            '/api': {
                // target: 'https://restapi.amap.com',
                target: 'http://localhost:9215/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                secure: false,
            },
            '/map': {
                target: 'https://restapi.amap.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/map/, ''),
                secure: false,
            },
        },
    },
})
