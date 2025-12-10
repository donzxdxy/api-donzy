const axios = require("axios");

exports.handler = async (event, context) => {
  const url = event.queryStringParameters.url;

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: false,
        creator: "donzy",
        message: "Masukkan parameter url",
      }),
    };
  }

  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set("url", url);
    encodedParams.set("hd", "1");

    const response = await axios({
      method: "POST",
      url: "https://tikwm.com/api/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0",
        "Cookie": "current_language=en",
      },
      data: encodedParams,
    });

    const data = response.data.data;

    const result = {
      status: true,
      creator: "donzy",
      description: data.title,
      author: {
        name: data.author.nickname,
        unique_id: data.author.unique_id,
      },
      download: {
        hd: "https://www.tikwm.com" + data.play,
        no_watermark: "https://www.tikwm.com" + data.wmplay,
        audio: "https://www.tikwm.com" + data.music,
        cover: "https://www.tikwm.com" + data.cover,
      },
    };

    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: false,
        creator: "donzy",
        message: "Gagal mengambil data",
        error: String(error),
      }),
    };
  }
};
