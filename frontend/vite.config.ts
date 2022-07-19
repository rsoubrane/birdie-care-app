import type { UserConfigFn, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import mkcert from 'vite-plugin-mkcert';
import EnvironmentPlugin from 'vite-plugin-environment';

const defineConfig: UserConfigFn = () => {
	const config: UserConfig = {
		server: {
			https: true,
			port: 3000
		},
		plugins: [
			react(),
			tsconfigPaths(),
			mkcert({
				source: 'coding'
			}),
			EnvironmentPlugin('all')
		],
		build: {
			rollupOptions: {
				output: {
					manualChunks: {
						react: ['react'],
						'react-dom': ['react-dom']
					}
				}
			}
		}
	};
	return config;
};

export default defineConfig;
