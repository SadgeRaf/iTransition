// server.js
module.exports = (req, res) => {
    // Parse the URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    
    if (!pathname.endsWith('khalilurrafsun_@_gmail_com')) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Not Found');
    }
    
    // Get query parameters
    const x = url.searchParams.get('x');
    const y = url.searchParams.get('y');
    
    // Helper: Check if value is a natural number (positive integer)
    function isNaturalNumber(value) {
        if (value === null || value === undefined || value === '') return false;
        const num = Number(value);
        return Number.isInteger(num) && num > 0;
    }
    
    // Helper: Calculate GCD using Euclidean algorithm
    function gcd(a, b) {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return Math.abs(a);
    }
    
    // Helper: Calculate LCM
    function lcm(a, b) {
        if (a === 0 || b === 0) return 0;
        return Math.abs(a * b) / gcd(a, b);
    }
    
    // Set response to plain text
    res.setHeader('Content-Type', 'text/plain');
    
    // Validate inputs
    if (x === null || y === null) {
        return res.status(200).send('NaN');
    }
    
    if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
        return res.status(200).send('NaN');
    }
    
    // Calculate LCM
    const numX = Number(x);
    const numY = Number(y);
    const result = lcm(numX, numY);
    
    // Return result as plain text
    res.status(200).send(String(result));
};