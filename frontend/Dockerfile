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
COPY ./public /app/public

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY vite.config.js /app/vite.config.js

RUN npm install

COPY ./src /app/src
RUN npm run build

RUN mv /app/dist/* /var/www/

EXPOSE 443 80

ENV OAUTH_URL_1 https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-d0bd53596b0472573a9e8d5e9a0dba82c42e37b87d5616fb8264083eed3548c7&redirect_uri=https%3A%2F%2F
ENV OAUTH_URL_2 %2Fapi%2Foauth&response_type=code

ENTRYPOINT ["/usr/bin/dumb-init", "--", "nginx", "-g", "daemon off;"]

