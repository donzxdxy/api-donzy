const axios = require("axios");
const cheerio = require("cheerio");

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
    const headers = {
      "authority": "ttsave.app",
      "accept": "application/json, text/plain, */*",
      "origin": "https://ttsave.app",
      "referer": "https://ttsave.app/en",
      "user-agent": "Mozilla/5.0",
    };

    const data = { query: url, language_id: "1" };
    const response = await axios.post("https://ttsave.app/download", data, { headers });

    const $ = cheerio.load(response.data);
    const description = $("p.text-gray-600").text().trim();

    const result = {
      status: true,
      creator: "donzy",
      description,
      download: {
        nowm: $('a.w-full.text-white.font-bold').first().attr("href"),
        audio: $('a[type="audio"]').attr("href"),
        slides: $("a[type='slide']")
          .map((i, el) => ({
            number: i + 1,
            url: $(el).attr("href"),
          }))
          .get(),
      },
    };

    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: false,
        creator: "donzy",
        message: "Gagal mengambil data",
        error: String(err),
      }),
    };
  }
};
