let waldoIsHiding = "Somewhere Waldo is hiding in this fish."
let waldoRegex = /dog|fish|bird|cat/
let result = waldoRegex.test(waldoIsHiding)
console.log(result);