import { getSession } from "next-auth/client";

import dbConnect from "./../../lib/dbConnect";
import Quote from "./../../models/Quote";

export default async function handler(req, res) {
  const session = await getSession({ req: req });

  if (!session)
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated!" });

  if (req.method === "GET") {
    try {
      const data = await getRandomQuote();
      return res.status(200).json({ success: true, quoteObj: data[0] || null });
    } catch (err) {
      return res.status(400).json({ success: false, quoteObj: null });
    }
  }
}

export async function getRandomQuote() {
  try {
    await dbConnect();
    let quotes = await Quote.aggregate([{ $sample: { size: 1 } }]);
    return quotes;
  } catch (err) {
    console.log(err);
    return null;
  }
}
