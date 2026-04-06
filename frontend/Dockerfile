# Install deps without the host's package-lock: locks pin optional Rollup binaries to the OS that ran
# `npm install` (e.g. darwin). Inside Linux/ARM we need a fresh `npm install` so @rollup/rollup-linux-arm64-gnu is pulled.
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ARG VITE_API_BASE=http://localhost:8080
ENV VITE_API_BASE=$VITE_API_BASE
RUN npm run build

FROM nginx:1.27-alpine
ARG NGINX_CONF=nginx.conf
COPY ${NGINX_CONF} /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
