export const sleep = (duration = 500) =>
  new Promise((done) => setTimeout(done, duration));
