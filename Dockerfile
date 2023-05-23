FROM registry.access.redhat.com/ubi8/nodejs-18

WORKDIR /app

USER root
RUN dnf update -y && dnf upgrade -y
RUN chown -R 1001 /app
USER 1001

COPY ./ ./

RUN npm ci

RUN npm run build

CMD ["npm", "start"]
