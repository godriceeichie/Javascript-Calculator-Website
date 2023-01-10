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
        // localStorage.setItem('boxText', box.textContent)
        output1.textContent = 'Answer = 0'
        for(i = 0; i < inputBtn.length; i++){
            let item = inputBtn[i];
            if(item.classList.contains("clicked")){
                item.classList.toggle("clicked")
            }
            
        }
        box.classList.add("clicked")
        
        if(!box.classList.contains('delete') && !box.classList.contains('equal') &&!box.classList.contains('clear')){
            let number = '1234567890'
            if(output2.value === '0'){
                output2.value = ''
            }
            
            output2.value += box.textContent
            // console.log(localStorage);
        }
        
        if(e.target.matches(".delete")){
            output2.value = removeCharacter(output2.value)
        }

        if(e.target.matches(".clear")){
            output2.value = removeWord(output2.value)
            output1.textContent = '';
        }

        if(e.target.matches(".equal")){
            output1.textContent = output2.value + ' ='
        }

        if(e.target.matches(".equal") && output2.value.includes("+")){
            output2.value = add(output2.value)
            localStorage.setItem("addKey", output2.value)
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

        // if(!box.classList.contains('delete') && !box.classList.contains('equal') &&!box.classList.contains('clear') && output2.value == localStorage.getItem("addKey")){
        //     output2.value = '';
        //     output2.value += box.textContent
        // }
    })
    document.addEventListener("mousedown", function(e) {
        if (e.target !== box) {
            box.classList.remove("clicked")
        }
    });
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


