import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          politics: path.resolve(__dirname, 'politics.html'),
          technology: path.resolve(__dirname, 'technology.html'),
          business: path.resolve(__dirname, 'business.html'),
          sports: path.resolve(__dirname, 'sports.html'),
          article: path.resolve(__dirname, 'article.html'),
          about: path.resolve(__dirname, 'about.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          articleSolar: path.resolve(__dirname, 'article-solar-irrigation.html'),
          articleMubas: path.resolve(__dirname, 'article-mubas-lab.html'),
          articleEntrepreneurs: path.resolve(__dirname, 'article-entrepreneurs.html'),
          articleYouthFootball: path.resolve(__dirname, 'article-youth-football.html'),
          articleDigitalLiteracy: path.resolve(__dirname, 'article-digital-literacy.html'),
          articleNationalLibrary: path.resolve(__dirname, 'article-national-library.html'),
          articleReforestation: path.resolve(__dirname, 'article-reforestation.html'),
          articleYouthParliament: path.resolve(__dirname, 'article-youth-parliament.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
