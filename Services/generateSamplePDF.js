
import fs from 'fs';
import { randomBytes } from "crypto";
import { Base64 } from 'js-base64';
import path from 'path';
import puppeteer from 'puppeteer';

function getPDFName(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}_${month}_${day}`;
    const tempString = Base64.encodeURL(randomBytes(16));
    const pdfName = formattedDate + "_" + tempString + "_dummy_pdf.pdf";
    return pdfName;
}

const generatePDFFromHTML = async (htmlContent, header, footer, outputPath, fileName) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({
        path: outputPath + fileName,
        format: 'A4',
        headerTemplate: header,
        footerTemplate: footer,
        displayHeaderFooter: true,
        margin: {
            top: '40px', // Adjust the top margin to create a gap between content and header
            bottom: '40px', // Adjust the bottom margin to create a gap between content and footer
            left: '20px',
            right: '20px',
        }
    });
    await browser.close();
};


async function generatePDFDocumewnt(aRequestBody){
    // return aRequestBody;
    const pdfName = getPDFName();
    const directoryPath = 'documents/pdf/';
    // Ensure that the directory exists, create it if it doesn't
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    const aHeaderRequest = aRequestBody.header;
    const header = generateHeader(aHeaderRequest);
    return header;
    const footer = '<div style="font-size: 10px; text-align: center; width:100%">Page <span class="pageNumber">1</span> of <span class="totalPages"></span></div>';
    const htmlContent = `
        <html>
        <head>
            <title>My PDF</title>
        </head>
        <body>
            <h1>Hello, PDF!</h1>
            <p>Hello my name is bhagyesh.</p>
            <p>Welcome to my first project in nodejs lets make it  <b>Lets go brother....</b> text.</p>
        </body>
        </html>
    `;

    await generatePDFFromHTML(htmlContent, header, footer, directoryPath, pdfName)
        .then(() => console.log('PDF generated successfully.'))
        .catch(error => console.error('Error generating PDF:', error));

    const sFilePath = directoryPath+pdfName;
    const data = fs.readFileSync(sFilePath);
    
    const base64Data = data.toString('base64');

    return {
        'pdf_document':base64Data
    };
}

function generateHeader(aHeaderRequest){
    // return typeof aHeaderRequest;
    let section = aHeaderRequest.section;
    let sHeaderString = '<header>';
    let imgString

    var i = 0;
    for (const key in section) {
        let type = section[i].type;
        if(type == 'image'){
            let imgSource =section[i].source;
            imgString = '<img src="'+imgSource+'" alt="Header Image" width="100" height="100" style="float: left;">';
            console.log(imgString)
        }
        i++;
    }
    sHeaderString += imgString;
    sHeaderString += '</header>';
    return sHeaderString;
    // aHeaderRequest.forEach(element => {
    //     console.log(element);
    // });
}

export{generatePDFDocumewnt};