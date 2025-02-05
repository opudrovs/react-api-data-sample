# Use Node.js image
FROM node:22.12.0-alpine

# Set working directory to backend
WORKDIR /backend

# Copy package.json & package-lock.json first (for Docker caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy all backend files (excluding node_modules via .dockerignore)
COPY . .

# Set environment variable for production mode
ENV NODE_ENV=production

# Expose backend port
EXPOSE 4000

# CMD is not needed because the root docker-compose.yml runs the correct commands.
