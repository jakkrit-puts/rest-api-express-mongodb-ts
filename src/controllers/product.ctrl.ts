import { Request, Response, NextFunction } from 'express';
import Product from '../models/product.model'
import { validationResult } from 'express-validator';
import { ProductCreatePayload, ProductUpdatePayload } from '../interfaces/product.interface';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array(),
      });
    }

    const payload:ProductCreatePayload = req.body

    const productIDExist = await Product.findOne({ prod_id: payload.prod_id })
    if (productIDExist) {
      return res.status(400).json({
        status: false,
        message: "ProductID already exist",
      });
    }
    const product = await Product.create(payload)
    
    res.status(201).json({ status: true, result: product, message: "created success" });
  } catch (error) {
    next(error)
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const product = await Product.find();
    
    res.status(200).json({ status: true, result: product, message: "get data success"  });
  } catch (error) {
     next(error)
  }
};

export const getProductByID = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const id = req.params.id

    const hasId = await Product.findById(id)
    if (!hasId) {
      return res.status(400).json({
        status: false,
        message: "data not found",
      });
    }

    const product = await Product.findById(id);
    
    res.status(200).json({ status: true, result: product, message: "get data success" });
  } catch (error) {
     next(error)
  }
};

export const deleteProductByID = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const id = req.params.id

    const hasId = await Product.findById(id)
    if (!hasId) {
      return res.status(400).json({
        status: false,
        message: "data not found",
      });
    }

    await Product.findOneAndDelete({ _id: id });

    res.status(200).json({ status: true, message: "remove success" });
  } catch (error) {
    next(error)
  }
}

export const updateProductByID = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array(),
      });
    }

    const payload: ProductUpdatePayload = req.body
    
    // check id
    const hasId = await Product.findById(payload.id)
    if (!hasId) {
      return res.status(400).json({
        status: false,
        message: "data not found",
      });
    }

    const product = await Product.findOneAndUpdate({ _id: payload.id }, payload, {
      new: true
    });
  
    res.status(200).json({ status: true, result: product, message: "updated success" });
  } catch (error) {
    next(error)
  }
}