import { getSession } from "next-auth/client";

import dbConnect from "../../../lib/dbConnect";
import Revenue from "../../../models/Revenue";

export default async function handler(req, res) {
  const session = await getSession({ req: req });

  if (!session)
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated!" });

  if (req.method === "POST") {
    req.body.user = session.user.id;
    try {
      const revenue = await postRevenue(req.body);
      if (!revenue) throw new Error();
      return res.status(201).json({ success: true, data: revenue });
    } catch (err) {
      return res.status(400).json({ success: false });
    }
  }

  if (req.method === "GET") {
    try {
      const revenues = await getAllRevenues(session.user.id);
      return res.status(200).json({ success: true, data: revenues || [] });
    } catch (err) {
      return res.status(400).json({ success: false, data: [] });
    }
  }
}

export async function getAllRevenues(user) {
  try {
    await dbConnect();
    let revenues = await Revenue.find({ user });
    console.log(revenues);
    console.log(user);
    revenues = revenues.map((revenue) => {
      const el = revenue.toObject({ getters: true });
      el._id = el._id.toString();
      el.date = JSON.stringify(new Date(el.date));
      el.user = user;
      return el;
    });
    return revenues;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function postRevenue(obj) {
  try {
    await dbConnect();
    const revenue = await Revenue.create(obj);
    return revenue;
  } catch (err) {
    return null;
  }
}
