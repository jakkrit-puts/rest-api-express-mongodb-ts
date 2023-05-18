import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import { validationResult } from "express-validator";
import {
  ProductCreatePayload,
  ProductUpdatePayload,
} from "../interfaces/product.interface";
import uploadImageBase64 from "../utils/upload";
import { ResponseError } from "../utils/custom-error";
import { verifyObjectId } from "../utils/verify";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ResponseError("data invalid !", false, 400, errors.array());
    }

    const payload: ProductCreatePayload = req.body;

    const productIDExist = await Product.findOne({ prod_id: payload.prod_id });
    if (productIDExist) {
      throw new ResponseError("ProductID already exist", false, 409);
    }
    const product = await Product.create({
      prod_id: payload.prod_id,
      prod_name: payload.prod_name,
      prod_desc: payload.prod_desc,
      prod_qty: payload.prod_qty,
      prod_image: await uploadImageBase64(payload.prod_image, "product"),
    });

    res
      .status(201)
      .json({ status: true, result: product, message: "created success" });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const product = await Product.find();

    res.status(200).json({ status: true, result: product, message: "get data success" });
  } catch (error) {
    next(error);
  }
};

export const getProductByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    verifyObjectId(id);

    const hasId = await Product.findById(id);
    if (!hasId) {
      throw new ResponseError("data not found", false, 404);
    }

    const product = await Product.findById(id);

    res.status(200).json({ status: true, result: product, message: "get data success" });
  } catch (error) {
    next(error);
  }
};

export const deleteProductByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    verifyObjectId(id);

    const hasId = await Product.findById(id);
    if (!hasId) {
      throw new ResponseError("data not found.", false, 404);
    }

    await Product.findOneAndDelete({ _id: id });

    res.status(200).json({ status: true, message: "remove success" });
  } catch (error) {
    next(error);
  }
};

export const updateProductByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ResponseError("data invalid", false, 400, errors.array());
    }

    const payload: ProductUpdatePayload = req.body;
    verifyObjectId(payload.id);

    // check id
    const hasId = await Product.findById(payload.id);
    if (!hasId) {
      throw new ResponseError("data not found.", false, 404);
    }

    const product = await Product.findOneAndUpdate(
      { _id: payload.id },
      payload,
      {
        new: true,
      }
    );

    res.status(200).json({ status: true, result: product, message: "updated success" });
  } catch (error) {
    next(error);
  }
};
