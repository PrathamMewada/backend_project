import express, { NextFunction, Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { authenticateToken, generateAccessToken, generateRefreshToken } from '../middleware/authentication';

const router = express.Router();

const userDb: any = []; // mock database
let refreshTokenDb: any = [];

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userName = req.body.userName;
        const userPassword = req.body.userPassword;
    
        const salt = await bcrypt.genSalt(); 
        const hashedPassword = await bcrypt.hash(userPassword, salt);
    
        const createUser = {
            userName: userName,
            userPassword: hashedPassword
        };
    
        userDb.push(createUser);

        res.status(200).json(createUser);


    } catch (error) {
        console.log(`Error in retrieving shopping cart: ${JSON.stringify((error as Error).message)}`);
        res.status(500).json({
          message: `Error in retrieving shopping cart: ${JSON.stringify((error as Error).message)}`
        });
      }
})

router.post("/loginJwt", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: any = userDb.find((savedUser: any) => {
            if(savedUser.userName === req.body.userName){
                return savedUser;
            }
            return null;
        });

        if(!user){
            throw new Error("Error logging in, unable to find username!!");
        }

        const compareResult = await bcrypt.compare(req.body.userPassword, user.userPassword);

        if(!compareResult){
            throw new Error("Error logging in, invalid password!");
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokenDb.push(refreshToken);
        res.json({
            accessToken,
            refreshToken
        })

    } catch (error) {
        console.log(`Error in retrieving shopping cart: ${JSON.stringify((error as Error).message)}`);
        res.status(500).json({
            message: `Error in retrieving shopping cart: ${JSON.stringify((error as Error).message)}`
        });
    }
})

router.post("/checkUserAuthenticated", authenticateToken, async (req: any, res: any, next: any) => {
    try {
        const user = req.user;
        console.log(user);
        res.json({
            // Will also contain an IAT which is the time when the token was issued
            message: "user has access",
            user,
        })

    } catch (error) {
        console.log(`Error in retrieving shopping cart: ${JSON.stringify((error as Error).message)}`);
        res.status(500).json({
            message: `Error in retrieving shopping cart: ${JSON.stringify((error as Error).message)}`
        });
    }
})

router.post("/token", async (req: any, res: any, next: any) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) {
        return res.sendStatus(401);
    }
    if(!refreshTokenDb.includes(refreshToken)) {
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, "12345abc", (err: any, user: any) => {
        if(err) {
            return res.sendStatus(403);
        }
        const accessToken = generateAccessToken(user);
        res.json({accessToken: accessToken})
    })
})

router.delete("/logout", authenticateToken, async (req: any, res: any, next: any) => {
    refreshTokenDb = refreshTokenDb.filter((token: any) => token !== req.body.token);
    res.sendStatus(204);
})

export = router;


