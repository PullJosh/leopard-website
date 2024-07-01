import { NextApiRequest, NextApiResponse } from "next";

import { getUser } from "../../lib/getUser";

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUser(req);
  res.json({ user });
}
