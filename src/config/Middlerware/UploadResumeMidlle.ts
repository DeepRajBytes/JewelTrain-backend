import multer from "multer";
import { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.single("resumefile")(req, res, (err: any) => {
    if (err) {
      console.log("err", err);
      return res.status(400).json({
        success: 0,
        message: "Error uploading file",
        error: err.message,
      });
    }
    next();
  });
};
