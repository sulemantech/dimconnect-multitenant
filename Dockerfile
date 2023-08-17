# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Clear npm cache
RUN npm cache clean --force

# Install dependencies with force
RUN npm install --force

# Copy the rest of the application files to the container
COPY . .

# Specify the command to run the application
CMD ["npm", "run", "build"]




