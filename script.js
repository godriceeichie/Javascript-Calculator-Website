function addSpace(word){
    return word.split("").join(" ");
}
let output1 = document.querySelector(".output1");
let output2 = document.querySelector("#output2");
let inputBtn = document.querySelectorAll(".input-btn");
output2.value = '';
inputBtn.forEach(box => {
    
    box.addEventListener("click", (e) =>{
        if(!box.classList.contains('delete') && !box.classList.contains('equal')){
            output2.value += box.textContent
            addSpace(output2.value)
        }
        if(e.target.matches(".equal") && output2.value.includes("+")){
            output2.value = add(output2.value)
        }
        
        if(e.target.matches(".delete")){
            output2.value = removeCharacter(output2.value)
        }
        
    })
})

function removeCharacter(word){
    word = word.replace(word.charAt(word.length-1), '')
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
