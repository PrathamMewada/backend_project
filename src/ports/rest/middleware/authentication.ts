import express from 'express';
import jwt from 'jsonwebtoken';

// Generate access token
// Changed expiry from 15 seconds to 1 hour so testing is easier
export const generateAccessToken = (user: any) => {
  return jwt.sign(
    { name: user.userName },
    "12345abc",
    { expiresIn: '1h' }
  );
};

// Generate refresh token
export const generateRefreshToken = (user: any) => {
  return jwt.sign(
    { name: user.userName },
    "12345abc"
  );
};

// Middleware to protect routes
export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader: string | undefined = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (token == null) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }

  jwt.verify(token, "12345abc", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};