# FROM node:18-alpine
#
# WORKDIR /code
# # Define build arguments for environment variables
# ARG VITE_API_URL
# # Set environment variables during the build process
# ENV VITE_API_URL=$VITE_API_URL
#
# COPY package.json .
# COPY pnpm-lock.yaml .
#
# RUN npm install -g pnpm && pnpm install
# COPY . .
#
# RUN pnpm build
#
# EXPOSE 8082
# CMD [ "pnpm", "preview" ]
#

FROM nginx

COPY ./dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8082
