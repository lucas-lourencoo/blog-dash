import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import nc from "next-connect";
import upload from "../../utils/upload";

interface RequestInterface extends NextApiRequest {
  file: Express.Multer.File;
}

const handler = nc();

handler.use(upload.single("file"));

handler.post(async (req: RequestInterface, res: NextApiResponse) => {
  try {
    const file = req.file as any;

    return res.status(201).json({ file: file.location });
  } catch (err) {
    return res.status(500).json(err);
  }
});

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default handler;
