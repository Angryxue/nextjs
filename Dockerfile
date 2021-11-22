FROM harbortest.66123123.com/library/node:14.17.1
MAINTAINER liyang@66123123.net
COPY ./ ./leading-new-mainsite-frontend 
WORKDIR leading-new-mainsite-frontend 
RUN yarn && yarn build
CMD ["yarn", "start"]
