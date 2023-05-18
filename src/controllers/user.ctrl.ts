import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model'
import { validationResult } from 'express-validator';
import { LoginPayload, RegisterPayload, UserUpdatePayload } from '../interfaces/user.interface';
import { hashPassword } from '../utils/hash';
import { ResponseError } from '../utils/custom-error';
import { verifyObjectId } from '../utils/verify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../configs';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ResponseError("data invalid !", false, 400, errors.array());
    }

    const payload: LoginPayload = req.body

    const user = await User.findOne({ username: payload.username }); 
    if(!user){
      throw new ResponseError("user is not correct", false, 400);
    }   
    
    const isPasswordMatch = bcrypt.compareSync(payload.password, user.password);
    if(!isPasswordMatch){
      throw new ResponseError("password is not correct", false, 400);
    }  

    const token = jwt.sign({
      id: user._id,
      role: user.role
    }, config.JWT_SECRET, { expiresIn: config.JWT_EXP })
    
    res.status(200).json({ 
      status: true, 
      result: { 
        access_token: token,
      }, 
      message: "login success" 
    });

  } catch (error) {
    next(error)
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ResponseError("data invalid !", false, 400, errors.array());
    }

    const payload:RegisterPayload = req.body

    const userExist = await User.findOne({ username: payload.username })
    if (userExist) {
      throw new ResponseError("Username already exist", false, 409);
    }
    
    let user = new User();
    user.username = payload.username;
    user.password = await hashPassword(payload.password)
    user.firstname = payload.firstname
    user.lastname = payload.lastname

    await user.save()

    
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

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const id: string = res.locals.user.id
    verifyObjectId(id);

    const hasId = await User.findById(id)
    if (!hasId) {
      throw new ResponseError("data not found", false, 404);
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
    verifyObjectId(id);

    const hasId = await User.findById(id)
    if (!hasId) {
      throw new ResponseError("data not found", false, 404);
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

    if (!errors.isEmpty()) {
      throw new ResponseError("data invalid !", false, 400, errors.array());
    }

    const payload: UserUpdatePayload = req.body;
    verifyObjectId(payload.id);
    
    // check id
    const hasId = await User.findById(payload.id);
    if (!hasId) {
      throw new ResponseError("data not found", false, 404);
    }

    const user = await User.findOneAndUpdate({ _id: payload.id }, payload, {
      new: true
    });
  
    res.status(200).json({ status: true, result: user, message: "updated success" });
  } catch (error) {
    next(error)
  }
};
