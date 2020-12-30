const toTilTi = (tall) => {
    let sum = 0;
    for(let i = 0; i < tall.length; i += 1){
        if(tall[i] === "1"){
            sum += 2**(tall.length - i);
        }
    }
    return sum;
}

console.log("--1000--")
console.log(toTilTi("1000"))
console.log("--10001--")
console.log(toTilTi("10001"));