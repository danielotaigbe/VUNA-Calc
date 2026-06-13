FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run lint
RUN npm test

FROM nginx:alpine AS serve
COPY --from=build /app/index.html /usr/share/nginx/html/
COPY --from=build /app/assets/ /usr/share/nginx/html/assets/
COPY --from=build /app/*.png /usr/share/nginx/html/
COPY --from=build /app/*.jpg /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
