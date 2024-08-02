FROM node:18.17.0-alpine as build
ARG REACT_APP_UI_ENV=development
ENV REACT_APP_UI_ENV ${REACT_APP_UI_ENV}
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci  --unsafe-perm
#RUN npm ci && npm cache clean --force
COPY . ./
# EXPOSE 80
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

