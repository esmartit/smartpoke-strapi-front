# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:alpine AS builder

RUN apk add --no-cache python3 py3-pip g++ make

# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN yarn install && yarn build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
#COPY --from=builder /app/nginx/upstream.conf /etc/nginx/conf.d/upstream.conf
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=builder /app/nginx/strapi.conf /etc/nginx/sites-available/strapi.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]