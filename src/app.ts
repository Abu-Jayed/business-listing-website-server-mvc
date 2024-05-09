 
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
const app: Application = express();
import cookieParser from 'cookie-parser';
// import globalErrorHandler from './app/middlewares/globalErrorHandler';
 import routes from './app/routes';

app.use(cors());

//parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1',routes)
// root router 
app.get('/',(req:Request,res:Response)=>{
    res.send('Assalamualikum , Bismillah hir Rahmanir Rahim , Wellcome to our project ')
})

// use global error handler
// app.use(globalErrorHandler);
 

// if not found any route or api
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    errorMessage: [
      {
        path: '.',
        message: 'Api Is not found',
      },
    ],
  });
  next();
});

export default app;