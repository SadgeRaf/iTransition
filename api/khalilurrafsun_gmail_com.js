
export default function handler(req, res) {
    // Only allow GET
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }

    const { x, y } = req.query;

    // Validate: must be present, must be strings of digits only, no decimals, no negatives
    const isNatural = (val) => {
        if (val === undefined || val === null) return false;
        if (!/^\d+$/.test(val)) return false;         // only digits
        const n = parseInt(val, 10);
        return Number.isInteger(n) && n >= 1;          // must be >= 1 (natural number)
    };

    if (!isNatural(x) || !isNatural(y)) {
        res.setHeader('Content-Type', 'text/plain');
        return res.status(200).send('NaN');
    }

    const a = BigInt(x);
    const b = BigInt(y);

    // GCD via Euclidean algorithm
    function gcd(a, b) {
        while (b !== 0n) {
            [a, b] = [b, a % b];
        }
        return a;
    }

    const lcm = (a * b) / gcd(a, b);

    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(lcm.toString());
}