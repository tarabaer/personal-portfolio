/* Variables - containers that store values */

var name // a declared variable but not initialized

let person // declared variable that can be changed

const bar // declared variabl that cannot be changed, not used very much

const ANSWER = 42 // const is declared and initialized with value of 42

// string

let string1 = 'Hello World!' 

let string2 = 'Hello Utah!'

let string3 = new String('Hello World') // in javascript the = sign is known as the assignment operator. It reads as "is the assigned value of"

// Numbers

let myNum = 2084590348

let myNum = 75.43

'1' == 1 // this statement is true because of type coercion and loose equality checking

'1' === 1 // this statement is false due to STRICT equality checking

// Boolean

let myBool = true

// Array

let myArray = [] // this is an empty array

let myArray2 = [42, "hoe", ANSWER, true, myBool]

let secondElement = myArray2[1] // lets secondElement = hoe

myArray2.push("Tara") // .push adds to the end

myArray2.unshift('Hello') // .unshift adds to the beginning


let myLongString = 'laskdjfolk23redlsofijwoelfmsdifmo' // just an array of characters

myLongString.length // tells you the length of array

// Object

let minObject = {}

const myCar = {
    Make: 'Chevy',
    color: 'red',
    year: '1955',
    vin: '13lk34wkl23'
}

// Functions

function myFunction() {
    return "hello ma'am"; // return gives back what you put
}

function sumTwoThings(one, two) {
    return one + two; //you have to put in numbers like sumTwoThings(2, 2)
}

// Arrow functions
    // a higher order function that accepts another function as a parameter

const theFunction = () => { // multiple lines use curly braces and return
    return "I am awesome"
}

// Filter method example. Filter returns an array of all elements that 'pass the test'
const pilots = [
    {
        id: 2,
        name: 'Wedge Antilles',
        faction: 'Rebels'
    },
    {
        id: 8,
        name: 'Ciena Ree',
        faction: 'Empire'
    },
    {
        id: 40,
        name: 'Iden Versio',
        faction: 'Empire'
    },
    {
        id: 66,
        name: 'Thane Kyrell'
    }
]

const rebels = pilots.filter(pilot => pilot.faction === 'Rebels');
const empire = pilots.filter((pilot) => {
    return pilot.faction === 'Empire';
})

// Array Helper Method 'map'

let filmsURLs = [
    'https://swapi.co/api/films/',
    'https://swapi.co/api/films/5/',
    'https://swapi.co/api/films/4/this one is longer... even longer',
    'https://swapi.co/api/films/6/',
    'https: ',
    'https://swapi.co/api/films/1/'
]

const filmLengths = filmURLs.map((filmURL) => filmURL.length);

const filmPlusMore = filmURLs.map((filmURL) => {
    let filmObj = {
        index: filmURL,
        okay: 'wowie'
    }
    return filmObj
})