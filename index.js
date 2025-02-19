console.log(global);

console.log("File Location : ", __filename); // To print your file location
console.log("Direcoty Location : ", __dirname); // To print your directory location


// function print() {
//     console.log("Hello Jaynesh Sarkar 🤣");
// }

// setTimeout(print,5000)

// setInterval(print, 1000);

let second = 0;
let minutes = 0;
let hour = 0;

const timer = () => {
    second++; // 59

    if (second > 59) { // 59>=59
        second = 0;

        minutes++;
    }

    if (minutes > 59) {
        minutes = 0;
        hour++;
    }

    console.log(`${hour} : ${minutes} : ${second}`);
}

setInterval(timer, 50);