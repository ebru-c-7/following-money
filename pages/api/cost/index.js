import { getSession } from "next-auth/client";

import dbConnect from "../../../lib/dbConnect";
import Cost from "../../../models/Cost";

export default async function handler(req, res) {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ success: false, message: "Not authenticated!" });
  }

  await dbConnect();

  req.body.user = session.user.id;

  if (req.method === "POST") {
    try {
      const cost = await Cost.create(req.body);
      res.status(201).json({ success: true, data: cost });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  }
}
