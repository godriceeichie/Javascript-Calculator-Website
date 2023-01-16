let signs = /[+]|÷|−|×/
let operators = "+÷−×";
let expression = "89 − 6 + 47 × 8 + 23"
let array = expression.split(" ");
let result = Number(array[0]);
let answer = calcQuotient(array)
answer = calcProduct(answer)
answer = calcSum(answer);
answer = calcDifference(answer);
console.log(answer);

function calcQuotient(array){
    let divideIndex = array.indexOf("÷");
    let multiplyIndex = array.indexOf("×");
    let prevChar = array[divideIndex - 1]
    let nextChar = array[divideIndex + 1]
    let prevIndex = array.indexOf(prevChar) - 1
    if(divideIndex === -1){
        return array
    }

    // else if(multiplyIndex !== -1){
    //     calcProduct(array)
    // }

    else{
        let result
        if(array[prevIndex] === '−'){
            result = (+prevChar * -1) / +nextChar
        }
        else{
            result = +prevChar / +nextChar;
        }
        array.splice(array.indexOf(prevChar), 0, result)
        array.splice(divideIndex, 3)
        for(i = divideIndex + 1; i < array.length; i++){
            let item = array[i]
            if(item === "÷"){
                let prevChar = array[i - 1]
                let nextChar = array[i + 1]
                let result;
                let prevIndex = array.indexOf(prevChar) - 1;
                if(prevIndex === '−'){
                    result = (-1 * +prevChar) / +nextChar
                }
                else {result = +prevChar / +nextChar}
                array.splice(i-1, 0, result)
                array.splice(i, 3)
                
            }
        }
        return array
    }
}

function calcProduct(array){
    let addIndex = array.indexOf("+");
    let multiplySign = /[×]/;
    let regexResult = multiplySign.test(array)
    
    if(regexResult === false){
        return array
    }

    // else if(addIndex !== -1){
    //     calcSum(array)
    // }

    else if(addIndex === -1){
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
                if(item === "+"){
                    let prevChar = array[i-1]
                    let nextChar = array[i+1]
                    let answer = prevChar * nextChar;
                    result *= answer
                    array.splice(array.indexOf(prevChar), 0, result)
                    array.splice(i, 3)
                }
            }
            return result
        }
    }

    else{
        let multiplyIndex = array.indexOf("×")
        let prevChar = array[multiplyIndex - 1];
        let nextChar = array[multiplyIndex + 1];
        let prevIndex = array.indexOf(prevChar) - 1;
        let result;
        if(array[prevIndex] === '−'){
            result = (+prevChar * -1) * +nextChar;
        }
        else{
            result = +prevChar * +nextChar;
        }
        array.splice(array.indexOf(prevChar), 0, result)
        array.splice(multiplyIndex, 3)
        for(i = multiplyIndex + 1; i < array.length; i++){
            let item = array[i]
            if(item === "×"){
                let nextSign = array[i - 2]
                let prevChar = array[i - 1]
                let nextChar = array[i + 1]
                let prevIndex = array.indexOf(prevChar) - 1
                let result;
                if(array[prevIndex] === "−"){
                    result = (+prevChar * -1) * +nextChar
                }
                else{result = +prevChar * +nextChar};
                array.splice(array.indexOf(prevChar), 0, result)
                array.splice(i, 3)
                
            }
        }
        return array
    }
}

function calcSum(array, result){
    let subIndex = array.indexOf("−");
    let addSign = /[+]/;
    let regexResult = addSign.test(array);
    if(regexResult === false){
        return array
    }

    else if(subIndex === -1){
        let addIndex = array.indexOf("+");
        let result;
        let prevChar = array[addIndex-1]
        let nextChar = array[addIndex+1]
        let prevIndex = array.indexOf(prevChar) - 1
        if(array[prevIndex] === "−"){
            result = (+prevChar * -1) + +nextChar;
            array.splice(array.indexOf(prevChar), 0, result)
            array.splice(addIndex, 3)
        }
        else{
            result = +prevChar + +nextChar
            for(i = addIndex + 1; i < array.length; i++){
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
    }

    else{
        let result;
        let addIndex = array.indexOf("+");
        let prevChar = array[addIndex-1]
        let nextChar = array[addIndex+1]
        let prevIndex = array.indexOf(prevChar) - 1
        if(array[prevIndex] === "−"){
            result = (+prevChar * -1) + +nextChar;
        }
        else{result = +prevChar + +nextChar};
        array.splice(array.indexOf(prevChar), 0, result)
        array.splice(addIndex, 3)
        for(i = addIndex + 1; i < array.length; i++){
            let item = array[i]
            if(item === "+"){
                let prevChar = array[i - 1]
                let nextChar = array[i + 1]
                let prevIndex = array.indexOf(prevChar) - 1;
                let result;
                if(array[prevIndex] === "−"){
                    result = (+prevChar * -1) + +nextChar
                }
                else{result = +prevChar + +nextChar}
                array.splice(array.indexOf(prevChar), 0, result)
                array.splice(i, 3)
            }
        }
        return array
    }
}

function calcDifference(array){
    let result;
    let subSign = /−/;
    // let arrayString = array.join(" ")
    let regexResult = subSign.test(array)

    if(regexResult){
        let subIndex = array.indexOf("−");
        let prevChar = array[subIndex-1]
        let nextChar = array[subIndex+1]
        let prevIndex = array.indexOf(prevChar) - 1
        if(array[prevIndex] === "−"){
            result = (+prevChar * -1) - +nextChar;
        }
        else{
            result = +prevChar - +nextChar
            for(i = subIndex + 1; i < array.length; i++){
                let item = array[i]
                if(item === "−"){
                    let prevChar = array[i-1]
                    let nextChar = array[i+1]
                    let answer = prevChar - nextChar;
                    result -= answer
                }
            }
            return result
        }
    }
}
