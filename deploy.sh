npm install
npm run build
pm2 delete personal-website-frontend
pm2 --name personal-website-frontend start npm -- start