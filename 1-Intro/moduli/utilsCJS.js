function sum(a,b) {
    return a+b
}

function subtraction(a,b) {
    return a-b
}

function multiplication(a,b) {
    return a*b
}

function division(a,b) {
    if (b === 0) {
        throw new Error("Divisione per zero")
    }
    return a/b
}


module.exports = {sum, subtraction, multiplication, division}