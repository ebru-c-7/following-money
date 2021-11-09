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
      const record = await postCost(req.body);
      if (!record) throw new Error();
      return res.status(201).json({ success: true, data: record });
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

  if (req.method === "DELETE") {
    try {
      const deleted = await deleteCost(req.body.id);
      console.log(req.body);
      return res.status(200).json({ success: true, data: deleted });
    } catch (err) {
      return res.status(400).json({ success: false, data: [] });
    }
  }
}

export async function getAllCosts(user) {
  try {
    await dbConnect();
    let costs = await Cost.find({ user }).sort({ date: "asc" });
    console.log(costs);
    console.log(user);
    costs = costs.map((cost) => {
      const el = cost.toObject({ getters: true });
      el.links = el.links.map((id) => id.toString());
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
  const isInstallment = obj.installment != 1;
  const isRepeat = obj.repeat != 0;

  try {
    await dbConnect();
    if (!isInstallment && !isRepeat) {
      const cost = await Cost.create(obj);
      return cost;
    } else {
      let newCost, loop;
      if (isInstallment) {
        newCost = { ...obj, amount: +obj.amount / +obj.installment };
        loop = +obj.installment;
      } else if (isRepeat) {
        newCost = { ...obj };
        loop = +obj.repeat;
      }

      const costs = [];
      const links = [];
      for (let i = 0; i < loop; i += 1) {
        const date = new Date(obj.date);
        newCost.date = date.setMonth(date.getMonth() + i);
        const cost = new Cost(newCost);
        links.push(cost._id);
        costs.push(cost);
      }

      for (const item of costs) {
        item.links = links;
        item.save();
      }

      return costs;
    }
  } catch (err) {
    return null;
  }
}

export async function deleteCost(id) {
  try {
    await dbConnect();
    const cost = await Cost.findById(id);
    console.log(cost);
    if (cost.links && cost.links.length > 0) {
      const response = await Cost.deleteMany({ _id: { $in: cost.links } });
      return response;
    } else {
      const response = await Cost.findByIdAndDelete(id);
      return response;
    }
  } catch (err) {
    return null;
  }
}
