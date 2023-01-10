function addSpace(word){
    return word.split("").join(" ");
}
let output1 = document.querySelector(".output1");
let output2 = document.querySelector("#output2");
let inputBtn = document.querySelectorAll(".input-btn");
output2.value = '0';
inputBtn.forEach(box => {
    box.addEventListener("click", (e) =>{
        output1.textContent = 'Answer = 0'
        for(i = 0; i < inputBtn.length; i++){
            let item = inputBtn[i]
            if(item.classList.contains("clicked")){
                item.classList.toggle("clicked")
            }
            
            if(!e.target.matches(".input-btn")){
                box.classList.remove("clicked")
            }
        }
        box.classList.add("clicked")

        for(i = 0; i < inputBtn.length; i++){
            if(!e.target.matches(".input-btn")){
                box.classList.remove("clicked")
            }
        }
        
        if(!box.classList.contains('delete') && !box.classList.contains('equal') &&!box.classList.contains('clear')){
            if(output2.value === '0'){
                output2.value = '';
            }
            output2.value += box.textContent
            addSpace(output2.value)
        }
        
        if(e.target.matches(".delete")){
            output2.value = removeCharacter(output2.value)
        }

        if(e.target.matches(".clear")){
            output2.value = removeWord(output2.value)
            output1.textContent = ''
        }

        if(e.target.matches(".equal")){
            output1.textContent = output2.value + ' ='
        }

        if(e.target.matches(".equal") && output2.value.includes("+")){
            output2.value = add(output2.value)
        }
        
        if(e.target.matches(".equal") && output2.value.includes("−")){
            output2.value = subtract(output2.value)
        }
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

