import fs from 'fs';


function logger(req, res, next) {
    // Log file directory
    const logDirectory = process.cwd()+'/logs';
    // Ensure log directory exists
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }
    // Extract the URL path
    const urlPath = req.originalUrl.replace(/\//g, '_'); // Replace slashes with underscores to create valid file names
    // Create a write stream for URL-specific logs
    const urlLogStream = fs.createWriteStream(logDirectory +`/${urlPath}.log`, { flags: 'a' });

    // Log request details
    const requestLog = `${new Date().toISOString()} - [REQUEST] ${req.method} ${req.originalUrl}\nHeaders: ${JSON.stringify(req.headers)} \nBody: ${JSON.stringify(req.body)}\n\n`;
    urlLogStream.write(requestLog);

    // Store the original end method
    const originalEnd = res.end;

    // Capture response data
    const chunks = [];
    res.end = function (chunk) {
        if (chunk) chunks.push(chunk);
        const body = Buffer.concat(chunks).toString('utf8');

        // Log response details
        const responseLog = `${new Date().toISOString()} - [RESPONSE] ${req.method} ${req.originalUrl} ${res.statusCode}\n${body}\n\n`;
        urlLogStream.write(responseLog);

        // Call the original end method
        originalEnd.apply(res, arguments);
    };

    next();
}

export default logger