FROM gcr.io/distroless/nodejs20-debian12@sha256:a68373cb68a08c63bc5523d06e4c2dcd6cb0d04d1a3f8558cb5ace6fc901d27b


WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static

ENV NODE_ENV=production

EXPOSE 3000

ENV PORT=3000

CMD ["server.js"]
