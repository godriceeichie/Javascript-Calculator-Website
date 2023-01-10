function addSpace(word){
    return word.split("").join(" ")
}
let output1 = document.querySelector(".output1");
let output2 = document.querySelector("#output2");
let inputBtn = document.querySelectorAll(".input-btn");
output2.value = '';
addSpace(output2.value)
inputBtn.forEach(box => {
    
    box.addEventListener("click", (e) =>{
        if(!box.classList.contains('delete') && !box.classList.contains('equal')){
            output2.value += box.textContent
        }
        if(e.target.matches(".equal")){
            calc()
        }
        
        if(e.target.matches(".delete")){
            output2.value = removeCharacter(output2.value)
        }
        // console.log(e);
    })
})

function removeCharacter(word){
    word = word.replace(word.charAt(word.length-1), '')
    return word
}

function calc(){
    let number = "1234567890"
    let outputItem = output2.value.split("");
    // for(i = 0; i < outputItem.length; i++){
    //     let firstItem = outputItem[i];
    //     for(j = i + 1; outputItem.length; j++){
    //         let secondItem = outputItem[j]
    //         if(number.includes(firstItem) && number.includes(secondItem)){
    //             let firstNumber = Number(firstItem)
    //             let secondNumber = Number(secondItem)
    //             output2.value = firstNumber + secondNumber;
    //             console.log(typeof firstNumber);
    //         }
    //     }
        
        
    // }
    
}
