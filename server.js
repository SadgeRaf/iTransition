module.exports = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const x = url.searchParams.get('x');
    const y = url.searchParams.get('y');
    
    function isNaturalNumber(value) {
        if (value === null || value === undefined || value === '') return false;
        const num = Number(value);
        return Number.isInteger(num) && num > 0;
    }
    
    function gcd(a, b) {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return Math.abs(a);
    }
    
    function lcm(a, b) {
        if (a === 0 || b === 0) return 0;
        return Math.abs(a * b) / gcd(a, b);
    }
    
    res.setHeader('Content-Type', 'text/plain');
    
    if (x === null || y === null) {
        return res.status(200).send('NaN');
    }
    
    if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
        return res.status(200).send('NaN');
    }
    
    const numX = Number(x);
    const numY = Number(y);
    const result = lcm(numX, numY);
    
    res.status(200).send(String(result));
};