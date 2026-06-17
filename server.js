const express = require("express");

const app = express();

function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

app.get("/khalilurrafsun_gmail_com", (req, res) => {
    const { x, y } = req.query;

    const numX = Number(x);
    const numY = Number(y);

    const isNatural =
        Number.isInteger(numX) &&
        Number.isInteger(numY) &&
        numX > 0 &&
        numY > 0;

    res.type("text/plain");

    if (!isNatural) {
        return res.send("NaN");
    }

    return res.send(String(lcm(numX, numY)));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});