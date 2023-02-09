# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Quick fix, remove it later on
RUN npm config set legacy-peer-deps true

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Specify the command to run the application
CMD ["npm", "run", "build"]




