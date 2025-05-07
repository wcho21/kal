FROM ubuntu:24.10

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC
RUN apt-get update && apt-get --yes install git vim gnupg2 curl unzip && apt-get clean

SHELL ["/bin/bash", "-c"]

ARG BUN_VERSION=1.2.12
RUN curl -fsSL https://bun.sh/install | bash -s "bun-v${BUN_VERSION}"