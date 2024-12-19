export function getRandomInt(max : number) : number{
    return Math.floor(Math.random() * max);
}

export function getRandomArbitrary(min : number, max : number) : number{
    return Math.random() * (max - min) + min;
}