const cookie =
  "AccessToken=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI4ODhhZDY3Ni0zNDFhLTQ4YzQtOWQxMi0wMTE5M2Q3ZDJlZDAiLCJpYXQiOjE2NTEwNzIzNzgsImV4cCI6MjU5MjAwMDAwMH0.dCxtBjl1hIfrl34-OXhcd2v87TLaOdDOitg0WKo7YmI; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Strict";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader("set-cookie", cookie);
  res.status(200).json({ name: "John Doe" });
}
