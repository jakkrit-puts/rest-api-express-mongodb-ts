import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model'
import { validationResult } from 'express-validator';
import { LoginPayload, RegisterPayload, UserUpdatePayload } from '../interfaces/user.interface';

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

    const payload: LoginPayload = req.body
    
    res.status(200).json({ status: true, result: payload, message: "login success" });
  } catch (error) {
    next(error)
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const errors = validationResult(req);

    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array(),
      });
    }

    const payload:RegisterPayload = req.body

    const userExist = await User.findOne({ username: payload.username })
    if (userExist) {
      return res.status(400).json({
        status: false,
        message: "Username already exist",
      });
    }
    
    const user = await User.create(payload)
    
    res.status(201).json({ status: true, result: user, message: "created success" });
  } catch (error) {
    next(error)
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const user = await User.find();
    
    res.status(200).json({ status: true, result: user, message: "get data success"  });
  } catch (error) {
     next(error)
  }
};

export const getUserByID = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const id = req.params.id

    const hasId = await User.findById(id)
    if (!hasId) {
      return res.status(400).json({
        status: false,
        message: "data not found",
      });
    }

    const user = await User.findById(id);
    
    res.status(200).json({ status: true, result: user, message: "get data success" });
  } catch (error) {
     next(error)
  }
};

export const deleteUserByID = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const id = req.params.id

    const hasId = await User.findById(id)
    if (!hasId) {
      return res.status(400).json({
        status: false,
        message: "data not found",
      });
    }

    await User.findOneAndDelete({ _id: id });

    res.status(200).json({ status: true, message: "remove success" });
  } catch (error) {
    next(error)
  }
}

export const updateUserByID = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const errors = validationResult(req);

    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array(),
      });
    }

    const payload: UserUpdatePayload = req.body
    
    // check id
    const hasId = await User.findById(payload.id)
    if (!hasId) {
      return res.status(400).json({
        status: false,
        message: "data not found",
      });
    }

    const user = await User.findOneAndUpdate({ _id: payload.id }, payload, {
      new: true
    });
  
    res.status(200).json({ status: true, result: user, message: "updated success" });
  } catch (error) {
    next(error)
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