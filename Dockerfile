FROM node:lts

ENV NODE_ENV=production
ENV PORT=9000

WORKDIR /usr/src/app

COPY ./dist/ .

RUN npm i

CMD ["node", "./server/bundle.js"]