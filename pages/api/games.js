import axios from "axios";

let accessToken = "";
let tokenExpiry = 0;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  if (Date.now() >= tokenExpiry) {
    const authRes = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: "client_credentials",
        },
      }
    );
    accessToken = authRes.data.access_token;
    tokenExpiry = Date.now() + authRes.data.expires_in * 1000;
  }

  try {
    const igdbRes = await axios.post(
      "https://api.igdb.com/v4/games",
      req.body.query,
      {
        headers: {
          "Client-ID": process.env.CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json(igdbRes.data);
  } catch (err) {
    res.status(500).json({ error: "IGDB fetch failed" });
  }
}
