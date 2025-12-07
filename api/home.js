exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: true,
      message: "Welcome to TikTok API",
      endpoints: {
        tiktok: "/.netlify/functions/tiktok?url=",
        tiktokv2: "/.netlify/functions/tiktokv2?url="
      }
    })
  };
};