FROM gcr.io/distroless/nodejs20-debian12@sha256:ed97002dbdba5209ae6cf33e2ec3a64a7a9f21f69e0cf52bfad99b89a68d3395


WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static

ENV NODE_ENV=production

EXPOSE 3000

ENV PORT=3000

CMD ["server.js"]
