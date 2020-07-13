FROM node:10

# Setting working directory
WORKDIR /usr/src/app

# Installing dependencies
COPY ./server/package*.json ./
RUN npm install

# Copying source files
COPY ./server/src ./src
# COPY ./public ./public

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]