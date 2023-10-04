FROM node:18.17.1-alpine
WORKDIR /app
COPY package*.json yarn.lock ./
RUN npm install
COPY . .
RUN npx esbuild-wasm src/main.jsx --bundle --outfile=dist/bundle.js
CMD [ "yarn","dev" ]