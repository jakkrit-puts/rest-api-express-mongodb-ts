import express from 'express';

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    
    return res.status(200).json({data: "login"});
  } catch (error) {
    
  }
};

export const register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    
    return res.status(200).json({data: "register"});
  } catch (error) {
    
  }
};

export const getUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    
    return res.status(200).json({data: "get users"});
  } catch (error) {
    
  }
};

export const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    return res.status(200).json({data: "delete user"});
  } catch (error) {
    
  }
}

export const updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    return res.status(200).json({data: "update user"});
  } catch (error) {
    
  }
}