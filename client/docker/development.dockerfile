FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app


# Copying source files
COPY ./client/package*.json ./
COPY ./client/src ./src
COPY ./client/public ./public
COPY ./client/.env ./.env

# Installing dependencies
RUN npm install


# Running the app
CMD [ "npm", "start" ]