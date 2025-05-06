/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  // Base config
  const config = {
    plugins: [
      react(),
      Sitemap({ 
        hostname: 'https://TheodoraPOWER.github.io/landing/',
      }),
      // Sentry plugin - only run during build and if config is available
      (env.SENTRY_ORG && env.SENTRY_PROJECT && env.SENTRY_AUTH_TOKEN && command === 'build') ? sentryVitePlugin({
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
        // and should be stored securely in environment variables or secrets.
        authToken: env.SENTRY_AUTH_TOKEN,
        // Optional: specify release name dynamically
        // release: { name: process.env.npm_package_version }, 
        sourcemaps: {
          // Specify assets to include in the release. Needed for source map uploading.
          assets: "./dist/**",
        },
        // Run upload only during actual build, not dev server
        // This is implicitly handled by `command === 'build'` check above
      }) : null,
    ].filter(Boolean), // Remove null plugin if Sentry config is missing
    base: '/', // Base path for GitHub Pages
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    test: {
      globals: true, // Use Vitest global APIs
      environment: 'jsdom', // Simulate DOM environment
      setupFiles: './src/setupTests.ts', // Setup file for tests
      // Optional: Configure coverage if needed later
      // coverage: {
      //   provider: 'v8', // or 'istanbul'
      //   reporter: ['text', 'json', 'html'],
      // },
    },
    // Recommended by Sentry for source maps
    build: {
      sourcemap: true, // Generate source maps for build
    }
  };

  return config;
});
