function add(a, b) {
    return a + b; // 10 + 20 = 30
}

function sub(a, b) {
    return a - b;
}

// module.exports = add;
// module.exports = sub;

module.exports = {
    addFun: add, subFun: sub
}

// exports.add = (a, b) => a + b;
// exports.sub = (a, b) => a - b;