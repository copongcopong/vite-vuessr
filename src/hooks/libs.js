export { waitFor };

const waitFor = delay => new Promise(resolve => {
  if (!delay) delay = 20;
  setTimeout(resolve, delay)
});
