const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async (event) => {
  try {
    const url = event.queryStringParameters.url;
    if (!url) return { statusCode: 400, body: '{"error":"input url"}' };

    const headers = {
      "authority": "ttsave.app",
      "accept": "application/json, text/plain, */*",
      "origin": "https://ttsave.app",
      "referer": "https://ttsave.app/en",
      "user-agent": "Mozilla/5.0"
    };

    const data = { query: url, language_id: "1" };
    const post = await axios.post("https://ttsave.app/download", data, { headers });

    const $ = cheerio.load(post.data);

    const description = $('p.text-gray-600').text().trim();
    const nowm = $('a.w-full.text-white.font-bold').first().attr('href');
    const audio = $('a[type="audio"]').attr('href');

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: true,
        description,
        video_nowm: nowm,
        audio_url: audio
      })
    };
  } catch (e) {
    return { statusCode: 500, body: e.toString() };
  }
};
