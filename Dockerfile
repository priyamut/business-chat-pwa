# DockerFile

# docker build -t partner-ui --build-arg PARTNER_API_URL=http://demo-internal-load-balancer-90339770.us-east-2.elb.amazonaws.com --build-arg PARTNER_CHATBOT_URL=http://ec2-18-217-87-79.us-east-2.compute.amazonaws.com:5000 . // to build
# docker images // get the REPOSITORY or IMAGE ID
# docker run --name partner-ui -d -p 9000:9000 partner-ui // to run on port 8090
# docker ps -a // get the container runninng status

FROM node:8.10.0

ARG profiles
ARG branch
ARG version

# Set up environmental variable
# Use bundler cache, Set up working directory, Profiles and Branch for Config
ENV NPM_CONFIG=/node_modules \
  APP_HOME=/business-chat-pwa \
  profiles=$profiles \
  branch=$branch \
  version=$version

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN npm install -g \
  node-gyp

COPY package.json .

RUN npm install

ADD . $APP_HOME

RUN npm run build

CMD ["npm", "run", "start"]
