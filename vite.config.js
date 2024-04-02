import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {

            "@": path.resolve(__dirname, "./src/"),

            routes: `${path.resolve(__dirname, "./src/routes/")}`,

            services: `${path.resolve(__dirname, "./src/services/")}`,

        }
  }
})
