FROM oven/bun:1.1-alpine

WORKDIR /exercises
EXPOSE 3500

CMD tail -f /dev/null # Keep the container open
