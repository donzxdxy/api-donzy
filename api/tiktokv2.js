const axios = require("axios");

exports.handler = async (event) => {
  try {
    const url = event.queryStringParameters.url;
    if (!url) return { statusCode: 400, body: '{"error":"input url"}' };

    const params = new URLSearchParams();
    params.set("url", url);
    params.set("hd", "1");

    const response = await axios.post("https://tikwm.com/api/", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: "current_language=en",
        "User-Agent": "Mozilla/5.0"
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: true,
        result: response.data
      })
    };
  } catch (e) {
    return { statusCode: 500, body: e.toString() };
  }
};