pm2 delete personal-website-frontend
npm install
npm run build
pm2 --name personal-website-frontend start npm -- start