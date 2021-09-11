import { getSession } from "next-auth/client";

import dbConnect from "../../../lib/dbConnect";
import Cost from "../../../models/Cost";

export default async function handler(req, res) {
  const session = await getSession({ req: req });

  if (!session)
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated!" });

  if (req.method === "POST") {
    req.body.user = session.user.id;
    try {
      const cost = await postCost(req.body);
      if (!cost) throw new Error();
      return res.status(201).json({ success: true, data: cost });
    } catch (err) {
      return res.status(400).json({ success: false });
    }
  }

  if (req.method === "GET") {
    try {
      const costs = await getAllCosts(session.user.id);
      return res.status(200).json({ success: true, data: costs || [] });
    } catch (err) {
      return res.status(400).json({ success: false, data: [] });
    }
  }
}

export async function getAllCosts(user) {
  try {
    await dbConnect();
    let costs = await Cost.find({ user });
    console.log(costs);
    console.log(user);
    costs = costs.map((cost) => {
      const el = cost.toObject({ getters: true });
      el._id = el._id.toString();
      el.date = JSON.stringify(new Date(el.date));
      el.user = user;
      return el;
    });
    return costs;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function postCost(obj) {
  try {
    await dbConnect();
    const cost = await Cost.create(obj);
    return cost;
  } catch (err) {
    return null;
  }
}
