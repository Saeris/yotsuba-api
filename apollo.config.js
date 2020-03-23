module.exports = {
  service: {
    endpoint: {
      name: `yotsuba`,
      url: `http://localhost:1337/${
        process.env.NETLIFY ? `.netlify/functions/yotsuba-api/` : `dev`
      }`
    }
  }
};
