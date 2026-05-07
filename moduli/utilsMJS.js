export function sum(a,b) {
    return a+b
}

export function subtraction(a,b) {
    return a-b
}

export function multiplication(a,b) {
    return a*b
}

export function division(a,b) {
    if (b === 0) {
        throw new Error("Divisione per zero")
    }
    return a/b
}

// export default { sum, subtraction, multiplication, division}