FROM node:10

# Setting working directory
WORKDIR /usr/src/app


# Copying source files
COPY ./client/package*.json ./
COPY ./client/src ./src
COPY ./client/public ./public

# Installing dependencies
RUN npm install


# Running the app
CMD [ "npm", "start" ]