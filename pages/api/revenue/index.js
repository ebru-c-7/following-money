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
      const record = await postRevenue(req.body);
      if (!record) throw new Error();
      return res.status(201).json({ success: true, data: record });
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
    let revenues = await Revenue.find({ user }).sort({ date: "asc" });
    console.log(revenues);
    console.log(user);
    revenues = revenues.map((revenue) => {
      const el = revenue.toObject({ getters: true });
      el._id = el._id.toString();
      el.date = JSON.stringify(new Date(el.date));
      el.user = user;
      delete el.links; //work on that
      return el;
    });
    return revenues;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function postRevenue(obj) {
  const isInstallment = obj.installment != 1;
  const isRepeat = obj.repeat != 0;

  try {
    await dbConnect();

    if (!isInstallment && !isRepeat) {
      const revenue = await Revenue.create(obj);
      return revenue;
    } else {
      let newRevenue, loop;
      if (isInstallment) {
        newRevenue = { ...obj, amount: +obj.amount / +obj.installment };
        loop = +obj.installment;
      } else if (isRepeat) {
        newRevenue = { ...obj };
        loop = +obj.repeat;
      }

      const revenues = [];
      const links = [];
      for (let i = 0; i < loop; i += 1) {
        const date = new Date(obj.date);
        newRevenue.date = date.setMonth(date.getMonth() + i);
        const revenue = new Revenue(newRevenue);
        links.push(revenue._id);
        revenues.push(revenue);
      }

      for (const item of revenues) {
        item.links = links;
        item.save();
      }

      return revenues;
    }
  } catch (err) {
    return null;
  }
}