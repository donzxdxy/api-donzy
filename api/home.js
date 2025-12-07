exports.handler = async () => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "API Donzy aktif!",
      endpoints: {
        tiktok: "/api/tiktok?url=",
        tiktokv2: "/api/tiktokv2?url="
      }
    })
  };
};
