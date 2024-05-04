import * as logs from "../Models/log_req_res.js";

// Middleware to log responses with response body
const logRequestAndResponse = async (req, res, next) => {
    next();
    res.on('finish', () => {
        console.log(`${req.method} ${req.url} ${res.statusCode}`);
    });
    // console.log(res)
    // Override res.send to intercept the response body
    // const oldSend = res.send;
    // res.send = async function(data) {

    //     let oBody;
    //     if(req.method === 'POST' || req.method === 'PUT'){
    //         oBody = req.body;
    //     }else{
    //         oBody = req.query;
    //     }

    //     const oLogsData = {
    //         method: req.method,
    //         statusCode: statusCode,
    //         requestBody:JSON.stringify(oBody),  // Log request body
    //         responseBody: JSON.stringify(data).replace(/\\/g, '').slice(1, -1), // to create normal json string  // Log response body
    //         url: req.originalUrl,
    //         iClientID:iClientID,
    //     };
    //     const iLogsID = await logs.logRequestAndResponse(oLogsData);
    //     oldSend.apply(res, arguments);
    // };
};

export {logRequestAndResponse};