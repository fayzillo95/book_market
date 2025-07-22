# Dockerfile

FROM node:20-alpine

WORKDIR /app

# Yagona qatorda kopaytirib install tezlashadi
COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY . .

RUN npm run build
RUN npx prisma generate

EXPOSE 15975

CMD ["node", "dist/main.js"]
