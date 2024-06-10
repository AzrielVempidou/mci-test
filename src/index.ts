import app from './app';

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});