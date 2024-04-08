FROM alpine:3.19

RUN apk update && apk add --no-cache dumb-init nginx openssl nodejs npm

WORKDIR /certs

RUN openssl req -newkey rsa:4096 -x509 -sha256 -days 365 -nodes \
    -out nginx.crt \
    -keyout nginx.key \
    -subj "/C=KR/ST=Seoul/L=Seoul/O=42Seoul/OU=student/CN=transcendence/"

COPY ./nginx.conf /etc/nginx/http.d/default.conf

WORKDIR /app

COPY index.html /app/index.html
COPY ./src /app/src
COPY ./public /app/public

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY vite.config.js /app/vite.config.js

RUN npm install && npm run build

RUN mv /app/dist/* /var/www/

EXPOSE 443 80

ENTRYPOINT ["/usr/bin/dumb-init", "--", "nginx", "-g", "daemon off;"]

