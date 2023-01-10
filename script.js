function addSpace(word){
    return word.split("").join(" ");
}
let output1 = document.querySelector(".output1");
let output2 = document.querySelector("#output2");
let inputBtn = document.querySelectorAll(".input-btn");
output2.value = '';
inputBtn.forEach(box => {
    box.addEventListener("click", (e) =>{
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
            output2.value += box.textContent
            addSpace(output2.value)
        }
        if(e.target.matches(".equal") && output2.value.includes("+")){
            output2.value = add(output2.value)
        }
        
        if(e.target.matches(".delete")){
            output2.value = removeCharacter(output2.value)
        }

        if(e.target.matches(".clear")){
            output2.value = removeWord(output2.value)
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
        let sum = parseInt(letter)
        for(j = i + 1; j < inputArray.length; j++){
            let secondLetter = inputArray[j]
            sum += parseInt(secondLetter)
        }
        return sum
    }
}
