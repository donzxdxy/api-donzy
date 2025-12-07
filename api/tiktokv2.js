const axios = require("axios");

async function tiktok(query) {
  const encodedParams = new URLSearchParams();
  encodedParams.set("url", query);
  encodedParams.set("hd", "1");

  const response = await axios({
    method: "POST",
    url: "https://tikwm.com/api/",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Cookie: "current_language=en",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 Chrome Mobile Safari"
    },
    data: encodedParams
  });

  return response.data;
}

exports.handler = async (event) => {
  const url = event.queryStringParameters.url;
  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "url parameter required" })
    };
  }

  try {
    const result = await tiktok(url);
    return {
      statusCode: 200,
      body: JSON.stringify({ status: true, result })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
