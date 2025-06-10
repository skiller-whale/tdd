FROM jacoblincool/playwright:chromium

WORKDIR /exercises

RUN apt update && apt install -y bash curl unzip
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="$PATH:/root/.bun/bin"
