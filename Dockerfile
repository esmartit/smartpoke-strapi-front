# get the base node image
FROM node:carbon as builder

# set the working dir for container
WORKDIR /frontend

# copy the json file first
COPY ./package.json /frontend

# install npm dependencies
RUN npm install

# copy other project files
COPY . .

# build the folder
RUN npm run build

# Handle Nginx
FROM nginx
COPY --from=builder /frontend/build /usr/share/nginx/html
COPY --from=builder /frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]