FROM node:22-alpine3.19
COPY ./frontend /movie/frontend
WORKDIR /movie/frontend
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]