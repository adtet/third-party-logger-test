import { Request, Response } from "express";
import AppError from "../utils/appError";
import { validationResult } from "express-validator";
import { writeLogToFile, createLogFile } from "../utils/logger";
let currentLogFileName = createLogFile("order");

const logFormat = {
  message: "",
  status: 0,
  data: {},
};



export async function postLogging(req:Request,res:Response,next:any){
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          logFormat.message = "Error post order";
          logFormat.status = 400;
          logFormat.data = errors.array();
          const data_log = JSON.stringify(logFormat);
          writeLogToFile(data_log, currentLogFileName);
          return res.status(400).json({
            message: false,
            errors: errors.array(),
          });
        }

        // const remark = req.body.remark
        // const data = req.body.data

        // const data_post = {
        //     remark:remark,
        //     data:data,
        // }

        logFormat.message = "Success post order";
        logFormat.status = 200;
        logFormat.data = req.body;

        const data_log = JSON.stringify(logFormat);

        writeLogToFile(data_log, currentLogFileName);

        res.status(200).json({
          message: "Success post order",
        });

    } catch (err) {
     logFormat.message = "Error post order";
     logFormat.status = 500;
     logFormat.data = err!;
     const data_log = JSON.stringify(logFormat);

     writeLogToFile(data_log, currentLogFileName);
     return next(new AppError(err, 500));   
    }
}