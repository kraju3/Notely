FROM alpine:latest as base

RUN apk add --no-cache nodejs-current npm tini

WORKDIR /usr/src/app

ENTRYPOINT ["/sbin/tini","--"]
COPY package.json .

# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production 
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install

# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules
# copy app sources
COPY . .
# expose port and define CMD
EXPOSE 4000
CMD npm start