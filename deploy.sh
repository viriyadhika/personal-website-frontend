npm install
npm run build
npm install -g pm2
pm2 delete personal-website-frontend
pm2 --name personal-website-frontend start npm -- start