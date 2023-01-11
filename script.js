function addSpace(word){
    return word.split("").join(" ");
}
let output1 = document.querySelector(".output1");
let output2 = document.querySelector("#output2");
let inputBtn = document.querySelectorAll(".input-btn");
let equalSign = document.querySelector(".equal")
output2.value = '0';
output2.addEventListener("focus", () => {
    output2.value = ''
})
inputBtn.forEach(box => {
    box.addEventListener("click", (e) =>{
        output1.textContent = 'Answer = 0'
        for(i = 0; i < inputBtn.length; i++){
            let item = inputBtn[i];
            if(item.classList.contains("clicked")){
                item.classList.toggle("clicked")
            }
            
        }
        box.classList.add("clicked")
        
        if(!box.classList.contains('delete') && !box.classList.contains('equal') && !box.classList.contains('main-sign') && !box.classList.contains('clear') && !box.classList.contains('square') && !box.classList.contains("square-root")){
            let number = '1234567890'
            if(output2.value === '0'){
                output2.value = ''
            }
            
            output2.value += box.textContent
        }
        
        if(e.target.matches(".delete")){
            output2.value = removeCharacter(output2.value)
        }

        if(e.target.matches(".clear")){
            output2.value = removeWord(output2.value)
            output1.textContent = '';
        }

        let equalClicked = false
        if(e.target.matches(".equal")){
            output1.textContent = output2.value + ' ='
            equalClicked = true
        }
        // console.log(e.target.className);
        // if(e.target.className.includes("equal")){
        //     console.log("hello there");
        // }

        // if(equalClicked === true && e.target === box){
        //     output2.value = ''
        // }
        let signs = /[+]|÷|−|×/;
        if(signs.test(e.target.textContent)){
            output2.value += ` ${e.target.textContent} `
        }

        if(e.target.matches(".equal") && output2.value.includes("+")){
            output2.value = add(output2.value)
            // localStorage.setItem("addKey", output2.value)
        }
        
        if(e.target.matches(".equal") && output2.value.includes("−")){
            output2.value = subtract(output2.value)
        }

        if(e.target.matches(".equal") && output2.value.includes("×")){
            output2.value = multiply(output2.value)
        }

        if(e.target.matches(".equal") && output2.value.includes("÷")){
            output2.value = divide(output2.value)
        }

        if(e.target.matches(".square")){
            output2.value = square(output2.value)
            output1.textContent = `Answer = ${output2.value}`
        }

        if(e.target.matches('.square-root')){
            output2.value = squareRoot(output2.value)
            output1.textContent = `Answer = ${output2.value}`
        }
    
        let secondToLastChar = output2.value.charAt(output2.value.length-2);
        let lastChar = output2.value.charAt(output2.value.length-1);
        // console.log(secondToLastChar, lastChar);
        if(signs.test(secondToLastChar) && signs.test(lastChar)){
            // console.log("lol");
            output2.value = output2.value.replace(lastChar, '')
            // console.log(lastChar);
        }
    })
})

function removeCharacter(character){
    character = character.replace(character.charAt(character.length-1), '')
    return character
}

function removeWord(word){
    word = word.replace(word, '')
    return word
}

// function calc(input){
//     let signs = '+'
// }

function add(input){
    let inputArray = input.split("+")
    for(i = 0; i < inputArray.length; i++){
        let letter = inputArray[i]
        let sum = Number(letter)
        for(j = i + 1; j < inputArray.length; j++){
            let secondLetter = inputArray[j]
            sum += Number(secondLetter)
        }
        if(Number.isInteger(sum)){
            return parseInt(sum)
        }
        else{
            return parseFloat(sum)
        }
    }
}

function subtract(input){
    let inputArray = input.split("−")
    for(i = 0; i < inputArray.length; i++){
        let letter = inputArray[i]
        let difference = Number(letter)
        for(j = i + 1; j < inputArray.length; j++){
            let secondLetter = inputArray[j]
            difference -= Number(secondLetter)
        }
        if(Number.isInteger(difference)){
            return parseInt(difference)
        }
        else{
            return parseFloat(difference).toFixed(6)
        }
    }
}

function multiply(input){
    let inputArray = input.split("×")
    for(i = 0; i < inputArray.length; i++){
        let letter = inputArray[i]
        let product = Number(letter)
        for(j = i + 1; j < inputArray.length; j++){
            let secondLetter = inputArray[j]
            product *= Number(secondLetter)
        }
        if(Number.isInteger(product)){
            return parseInt(product)
        }
        else{
            return parseFloat(product).toFixed(6)
        }
    }
}

function divide(input){
    let inputArray = input.split("÷")
    for(i = 0; i < inputArray.length; i++){
        let letter = inputArray[i]
        let quotient = Number(letter)
        for(j = i + 1; j < inputArray.length; j++){
            let secondLetter = inputArray[j]
            quotient /= Number(secondLetter)
        }
        if(Number.isInteger(quotient)){
            return parseInt(quotient)
        }
        else{
            return parseFloat(quotient).toFixed(6)
        }
    }
}

function square(input){
    let square = Number(input * input)
    return square
}

function squareRoot(input){
    let squareRoot = Math.sqrt(Number(input))
    return squareRoot
}