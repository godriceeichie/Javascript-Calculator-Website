function addSpace(word){
    return word.split("").join(" ");
}
let output1 = document.querySelector(".output1");
let output2 = document.querySelector("#output2");
let inputBtn = document.querySelectorAll(".input-btn");
let equalSign = document.querySelector(".equal")
output2.value = '0';
inputBtn.forEach(box => {
    box.addEventListener("click", (e) =>{
        let number = /[0-9]/;
        if(number.test(localStorage.getItem("output"))){
            output2.value = ''
            localStorage.removeItem("output")
        }
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
            //We want to make the output 2 value disappear when the box button is pressed after the equal button is equaled
            // output2.value = ""
            
            output2.value += box.textContent
        }

        if(e.target.matches(".delete")){
            output2.value = removeCharacter(output2.value)
        }

        if(e.target.matches(".clear")){
            output2.value = removeWord(output2.value)
            output1.textContent = '';
        }

        
        let lastChar = output2.value.charAt(output2.value.length-1);

        let signs = /[+]|÷|−|×/;
        if(signs.test(e.target.textContent) && lastChar !== " "){
            output2.value += ` ${e.target.textContent} `
           
        }

        let multipleSigns = /(\d [+] \d)+ (\d ÷ \d)+ (\d − \d)+ (\d × \d)+/;
        if(e.target.matches(".equal")){
            output1.textContent = output2.value + ' ='
            output2.value = calc(output2.value)
            localStorage.setItem("output", output2.value)
        }

        if(e.target.matches(".square")){
            output2.value = square(output2.value)
            output1.textContent = `Answer = ${output2.value}`
        }

        if(e.target.matches('.square-root')){
            output2.value = squareRoot(output2.value)
            output1.textContent = `Answer = ${output2.value}`
        }  
    })
    document.addEventListener("mousedown", (e) =>{
        if(e.target !== box){
            box.classList.remove("clicked")
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

function calc(input){
    // let expression = "3 × 6 ÷ 9 ÷ 6 − 8"
    let array = input.split(" ");
    let answer = calcQuotient(array);
    answer = calcProduct(answer);
    answer = calcSum(answer);
    answer = calcDifference(answer);
    return answer
}

function calcQuotient(array){
    let divideIndex = array.indexOf("÷");
    let sign = /(\d+(?=÷))+/
    let prevChar = array[divideIndex - 1]
    // console.log(prevChar);
    let nextChar = array[divideIndex + 1]
    if(divideIndex === -1){
        return array
    }

    else{
        let result = +prevChar / +nextChar;
        array.splice(array.indexOf(prevChar), 0, result)
        array.splice(divideIndex, 3)
        for(i = divideIndex - 1; i < array.length; i++){
            let item = array[i]
            if(item === "÷"){
                let prevChar = array[i - 1]
                let nextChar = array[i + 1]
                let result;
                result = +prevChar / +nextChar;
                array.splice(array.indexOf(prevChar), 0, result)
                array.splice(i, 3)
                for(j = i - 1; j < array.length; j++){
                    let item = array[j]
                    if(item === "÷"){
                        let prevChar = array[j - 1]
                        let nextChar = array[j + 1]
                        let result;
                        result = +prevChar / +nextChar;
                        array.splice(array.indexOf(prevChar), 0, result)
                        array.splice(j, 3)
                    }
                }
            }
            
        }
        // console.log(array);
        return array
    }
}

function calcProduct(array){
    let addIndex = array.indexOf("+");
    let subIndex = array.indexOf("−")
    let multiplySign = /[×]/;
    let regexResult = multiplySign.test(array)
    
    if(regexResult === false){
        return array
    }

    else if(addIndex === -1 && subIndex === -1){
        let multiplyIndex = array.indexOf("×");
        let result;
        let prevChar = array[multiplyIndex-1]
        let nextChar = array[multiplyIndex+1]
        let prevIndex = array.indexOf(prevChar) - 1
        if(array[prevIndex] === "−"){
            result = (+prevChar * -1) * +nextChar;
            array.splice(array.indexOf(prevChar), 0, result)
            array.splice(multiplyIndex, 3)
        }
        else{
            result = +prevChar * +nextChar
            for(i = multiplyIndex + 1; i < array.length; i++){
                let item = array[i]
                if(item === "×"){
                    let prevChar = array[i-1]
                    let nextChar = array[i+1]
                    let answer = prevChar * nextChar;
                    result *= answer
                    array.splice(array.indexOf(prevChar), 0, result)
                    array.splice(i, 3);
                    
                }

            }
            return result
        }
    }

    else{
        let multiplyIndex = array.indexOf("×")
        let prevChar = array[multiplyIndex - 1];
        let nextChar = array[multiplyIndex + 1];
        let result = +prevChar * +nextChar;
        array.splice(array.indexOf(prevChar), 0, result)
        array.splice(multiplyIndex, 3)
        for(i = multiplyIndex - 1; i < array.length; i++){
            let item = array[i]
            if(item === "×"){
                let prevChar = array[i - 1]
                let nextChar = array[i + 1]
                let result;
                result = +prevChar * +nextChar;
                array.splice(array.indexOf(prevChar), 0, result)
                array.splice(i, 3)
                for(j = i - 1; j < array.length; j++){
                    let item = array[j]
                    if(item === "×"){
                        let prevChar = array[j - 1]
                        let nextChar = array[j + 1]
                        let result;
                        result = +prevChar * +nextChar;
                        array.splice(array.indexOf(prevChar), 0, result)
                        array.splice(j, 3)
                    }
                }
            }
        }
        return array
    }
}

function calcSum(array){
    let subSign = /−/;
    let addSign = /[+]/;
    let regexResult = addSign.test(array);
    if(regexResult === false){
        return array
    }

    else if(subSign.test(array) === false){
        let addIndex = array.indexOf("+");
        let result;
        let prevChar = array[addIndex-1]
        let nextChar = array[addIndex+1]
        let prevIndex = array.indexOf(prevChar) - 1;
        result = +prevChar + +nextChar;
        array.splice(array.indexOf(prevChar), 0, result)
        array.splice(addIndex, 3)
        for(i = addIndex - 1; i < array.length; i++){
            let item = array[i]
            if(item === "+"){
                let prevChar = array[i-1]
                let nextChar = array[i+1]
                let answer = prevChar + nextChar;
                result += answer
                array.splice(array.indexOf(prevChar), 0, result)
                array.splice(i, 3)
            }
            
        }
        return result
        
    }

    else{
        let result;
        let addIndex = array.indexOf("+");
        let prevChar = array[addIndex-1]
        let nextChar = array[addIndex+1]
        let prevIndex = array.indexOf(prevChar) - 1
        if(array[prevIndex] === "−"){
            result = +nextChar - +prevChar;
            if(result < 0){
                result *= -1
            }
            else{
                array.splice(prevIndex, 1, "+")
            }
            array.splice(array.indexOf(prevChar), 0, result)
            array.splice(addIndex, 3)
            
        }
        else{
            result = +prevChar + +nextChar
            array.splice(array.indexOf(prevChar), 0, result)
            array.splice(addIndex, 3)
        }
        
        for(i = addIndex - 1; i < array.length; i++){
            let item = array[i]
            if(item === "+"){
                let prevChar = array[i - 1]
                let nextChar = array[i + 1]
                let result = +prevChar + +nextChar;
                array.splice( i - 1, 0, result)
                array.splice(i, 3)
                for(j = i - 1; j < array.length; j++){
                    let item = array[j]
                    if(item === "+"){
                        let prevChar = array[j - 1]
                        let nextChar = array[j + 1]
                        let result;
                        result = +prevChar + +nextChar;
                        array.splice(array.indexOf(prevChar), 0, result)
                        array.splice(j, 3)
                    }
                }
            }
        }
        let subSign = /−/;
        if(subSign.test(array) === false){
            let addIndex = array.indexOf("+");
            let result;
            let prevChar = array[addIndex-1]
            let nextChar = array[addIndex+1]
            let prevIndex = array.indexOf(prevChar) - 1;
            result = +prevChar + +nextChar;
            array.splice(array.indexOf(prevChar), 0, result)
            array.splice(addIndex, 3)
            for(i = addIndex - 1; i < array.length; i++){
                let item = array[i]
                if(item === "+"){
                    let prevChar = array[i-1]
                    let nextChar = array[i+1]
                    let answer = prevChar + nextChar;
                    result += answer
                    array.splice(array.indexOf(prevChar), 0, result)
                    array.splice(i, 3)
                }
                
            }
            return result
        }
        else{
            return array;
        }
    }
}

function calcDifference(array){
    let subSign = /−/;
    let regexResult = subSign.test(array)

    if(regexResult){
        let signs = /[+÷×]/
        let subIndex = array.indexOf("−");
        let prevChar = array[subIndex-1]
        if(signs.test(array) === false){
            let stringArray = array.join(" ")
            let inputArray = stringArray.split("−")
            let difference;
            for(i = 0; i < inputArray.length; i++){
                let letter = inputArray[i]
                difference = +letter
                for(j = i + 1; j < inputArray.length; j++){
                    let secondLetter = inputArray[j]
                    difference -= +secondLetter;
                }
                if(Number.isInteger(difference)){
                    return parseInt(difference)
                }
                else{
                    return parseFloat(difference).toFixed(6)
                }
            }
            return difference
        }
    }
    else{
        return array
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