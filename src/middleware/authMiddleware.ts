import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET as string || "SECRET";

type AuthRequest = {
  user?: { id: string };
};

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string, exp: number };

    if (Date.now() >= decoded.exp * 1000) {
      res.status(401).json({ error: 'Token expired' });
      return;
    }

    (req as AuthRequest).user = decoded;
    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};