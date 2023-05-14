import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model'
import { validationResult } from 'express-validator';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const errors = validationResult(req);

    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const user = req.body
    
    res.status(200).json({data: user});
  } catch (error) {
    next(error)
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const user = req.body
    
    res.status(200).json({data: user});
  } catch (error) {
    
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const user = await User.find();
    
    res.status(200).json({data: user});
  } catch (error) {
    
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({data: "delete user"});
  } catch (error) {
    
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({data: "update user"});
  } catch (error) {
    
  }
}