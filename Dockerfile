# Stage 1, React Build (& Testing)
FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY ./ /app/

LABEL maintainer="tom@altobyte.io"
LABEL version="0.1"
## Build time env vars & container Version
# ARG VERSION
# ENV VERSION ${VERSION}
# ARG ENV_NAME
# ENV ENV_NAME ${ENV_NAME:-Dev}
##
RUN npm run-script build 


# Stage 2, Production Nginx
FROM nginx:latest
LABEL maintainer="tom@altobyte.io"
LABEL version="0.1"
RUN rm /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY project.conf /etc/nginx/conf.d/project.conf


