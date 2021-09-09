import { getSession } from "next-auth/client";

import dbConnect from "../../../lib/dbConnect";
import Revenue from "../../../models/Revenue";

export default async function handler(req, res) {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ success: false, message: "Not authenticated!" });
  }

  await dbConnect();

  req.body.user = session.user.id;

  if (req.method === "POST") {
    try {
      const revenue = await Revenue.create(req.body);
      res.status(201).json({ success: true, data: revenue });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  }
}
