# Using Node.js for building the application
FROM node:18-alpine AS build

WORKDIR /code
# Define build arguments for environment variables
ARG VITE_API_URL
# Set environment variables during the build process
ENV VITE_API_URL=$VITE_API_URL

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm && pnpm install && npm install serve -g
COPY . .

RUN pnpm build
EXPOSE 8082
CMD ["serve", "-s", "dist", "-l", "8082"]


# Using Nginx for serving the static files
FROM nginx AS release

COPY ./dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8082
