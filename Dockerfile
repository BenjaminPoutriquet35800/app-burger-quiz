FROM node

WORKDIR /app

ADD . /app

RUN npm install

ENTRYPOINT ["npm", "start"]
