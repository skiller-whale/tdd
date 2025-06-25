FROM jacoblincool/playwright:chromium

WORKDIR /exercises

# install chromium for playwright tests
RUN npx playwright install chromium

# install bun
RUN apt update && apt install -y bash curl unzip
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="$PATH:/root/.bun/bin"
