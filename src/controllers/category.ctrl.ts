import { Request, Response, NextFunction } from 'express';
import Category from '../models/category.model'
import { validationResult } from 'express-validator';
import { CategoryCreatePayload, CategoryUpdatePayload } from '../interfaces/category.interface';
import { verifyObjectId } from '../utils/verify';
import { ResponseError } from '../utils/custom-error';

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ResponseError("data invalid", false, 400, errors.array());
    }

    const payload:CategoryCreatePayload = req.body

    const CategoryIDExist = await Category.findOne({ cat_id: payload.cat_id })
    const CategoryNameExist = await Category.findOne({ cat_name: payload.cat_name })
    if (CategoryIDExist || CategoryNameExist) {
      throw new ResponseError("CategoryID or CategoryName already exist", false, 409, errors.array());
    }
    const category = await Category.create(payload)
    
    res.status(201).json({ status: true, result: category, message: "created success" });
  } catch (error) {
    next(error)
  }
};

export const getCategorys = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const category = await Category.find();
    
    res.status(200).json({ status: true, result: category, message: "get data success"  });
  } catch (error) {
     next(error)
  }
};

export const getCategoryByID = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const id = req.params.id
    verifyObjectId(id);

    const hasId = await Category.findById(id)
    if (!hasId) {
      throw new ResponseError("data not found.", false, 404);
    }

    const category = await Category.findById(id);
    
    res.status(200).json({ status: true, result: category, message: "get data success" });
  } catch (error) {
     next(error)
  }
};

export const deleteCategoryByID = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const id = req.params.id
    verifyObjectId(id);

    const hasId = await Category.findById(id)
    if (!hasId) {
      throw new ResponseError("data not found.", false, 404);
    }

    await Category.findOneAndDelete({ _id: id });

    res.status(200).json({ status: true, message: "remove success" });
  } catch (error) {
    next(error)
  }
}

export const updateCategoryByID = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ResponseError("data invalid", false, 400, errors.array());
    }

    const payload: CategoryUpdatePayload = req.body
    verifyObjectId(payload.id);
    
    // check id
    const hasId = await Category.findById(payload.id)
    if (!hasId) {
      throw new ResponseError("data not found.", false, 404);
    }

    const CategoryNameExist = await Category.findOne({ cat_name: payload.cat_name })
    if (CategoryNameExist) {
      throw new ResponseError("CategoryName already exist", false, 409);
    }

    const category = await Category.findOneAndUpdate({ _id: payload.id }, payload, {
      new: true
    });
  
    res.status(200).json({ status: true, result: category, message: "updated success" });
  } catch (error) {
    next(error)
  }
}