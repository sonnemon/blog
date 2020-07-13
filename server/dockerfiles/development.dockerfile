FROM node:10

WORKDIR /usr/src/app

COPY ["./server/package.json", "/usr/src/app"]
COPY ["./server/package-lock.json", "/usr/src/app"]
COPY ["./server/", "/usr/src/app"]

RUN npm install

CMD [ "npm", "run", "dev" ]