import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.DB_URL);
    const db = client.db();


    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
