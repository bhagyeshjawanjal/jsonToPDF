'use strict';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as clientModel from "../Models/client_configuration_model.js";
import * as logs from '../Services/log_req_res.js';

const aIgnoredRoutes = [
    "/register-client",
    "/get-access-token"
];
// Middleware to handle request
const handle = async (req, res, next) => {
    var sAuthorizationHeader = req.headers.authorization;

    const requestedUrl = req.originalUrl;
    if(aIgnoredRoutes.includes(requestedUrl)){
        return next();
    }

    if (!sAuthorizationHeader) {
        return res.status(403).send({
            'StatusCode':403,
            'Error':"A token is required for authentication"});
    }
    const token = sAuthorizationHeader.split(" ")[1];

    if (!token) {
        return res.status(403).send({
            'StatusCode':403,
            'Error':"A token is required for authentication"});
    }

    const [header, payload, signature] = token.split('.');
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
    const oTokenPayload = JSON.parse(decodedPayload);
    const sClientKey = oTokenPayload.client_key;
    const aClientDetails = await clientModel.getClientByClientKey(sClientKey);
    const sClientSecret = aClientDetails.client_secret;
    const iClientID = aClientDetails.client_id;
    req.iClientID = iClientID;

    try {
        const decoded = jwt.verify(token, sClientSecret, { algorithm: 'HS256' });
    } catch (err) {
        return res.status(401).send({
            'StatusCode':401,
            'Error':"Invalid Token"});
    }
    return next();
};

const logRequestAndResponse = async (req, res, next) => {
    next();
    res.on('finish', () => {
        console.log(res.responseBody);
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

export {handle, logRequestAndResponse};