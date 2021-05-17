FROM node
WORKDIR /app
COPY package.json ./
# RUN if [ "$NODE_ENV" = "development" ]; \
#     then yarn install; \
#     else yarn install --production; \
#     fi
RUN yarn
COPY ./ ./
ENV PORT 3000
EXPOSE ${PORT}
CMD ["node", "index.js"]