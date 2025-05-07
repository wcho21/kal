FROM ubuntu:24.10

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC
RUN apt-get update && apt-get --yes install git vim gnupg2 curl unzip && apt-get clean

SHELL ["/bin/bash", "-c"]

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash;
ENV NVM_DIR=/root/.nvm
ARG NODE_VERSION=22.15.0
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION"