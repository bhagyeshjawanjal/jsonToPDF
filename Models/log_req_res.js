import connectionPromise from "../DBConnection/db_connection.js"

async function logRequestAndResponse(oLogsData) {

    const dAddedOn = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
        const connection = await connectionPromise;
        const [result] = await connection.execute(
            'INSERT INTO `request_logs` (method, status_code, request, response, url, client_id, added_on, added_by, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                oLogsData.method,
                oLogsData.statusCode,
                oLogsData.requestBody,
                oLogsData.responseBody,
                oLogsData.url,
                oLogsData.iClientID,
                dAddedOn,
                0,
                1
            ]
        );
        return result.insertId;
    } catch (error) {
        // Handle error
        console.error('Error executing query:', error);
        return false;
    }
}

export{logRequestAndResponse};