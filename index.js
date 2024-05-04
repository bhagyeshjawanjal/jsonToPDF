import express from "express";
import * as clientService from './Services/client_configuration.js';
import * as samplePDF from './Services/generateSamplePDF.js';
import * as middleWare  from './Middleware/middleware.js';

const app = express();

app.use(express.json());

// app.use(middleWare.handle);

// app.use(middleWare.logRequestAndResponse);

var port = 3000;

// Client related endpoints
app.post("/register-client", async (req, res)=>{
    var myObj = await clientService.addClient(req.body);
    res.send(myObj);
});

app.get("/get-client", async (req, res)=>{
    var aClientData = await clientService.getClientDetails();
    res.send(aClientData);
});

app.get("/get-access-token", (req, res)=>{
    var aTokenData = clientService.generateUserJWTAccessToken(req.body);
    res.send(aTokenData);
});

app.post("/export-pdf", async (req, res)=>{
    let response = await samplePDF.generatePDFDocumewnt(req.body);
    res.responseBody = response;
    res.send(response);
});

//User related endpoints
 app.listen(port,()=>{
    console.log(`App is running on ${port}`)
 });