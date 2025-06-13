FROM node:22.14.0-alpine3.20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG ENV=production

RUN case "$ENV" in \
    production) npm run build ;; \
    staging) npm run build -- --configuration staging ;; \
    *) echo "Unknown environment: $ENV" && exit 1 ;; \
  esac


FROM nginx:alpine
ADD ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/tms/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
