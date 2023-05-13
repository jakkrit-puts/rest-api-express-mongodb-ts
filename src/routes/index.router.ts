import { NextFunction } from 'connect';
import express from 'express'

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response, next: NextFunction) => {
  return res.status(200).json({ data: "Rest API Express (TypeScript) V.1.0.0" });
})

export default router