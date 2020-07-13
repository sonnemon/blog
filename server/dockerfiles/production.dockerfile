FROM node:10

# Setting working directory
WORKDIR /usr/src/app


# Copying source files
COPY ./server/package.json ./package.json
COPY ./server/webpack.config.js ./webpack.config.js
COPY ./server/src ./src

# Installing dependencies
RUN npm install

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]