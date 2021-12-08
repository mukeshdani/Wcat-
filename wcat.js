
let fs = require("fs");
// First of all we want to take input 

let inputArr = process.argv.slice(2);
 //console.log(inputArr);

 let Getoptions = [];
let Getfiles = [];
//yha se pta lgaya hamne kya send kia hai 
for (let i = 0; i < inputArr.length; i++) {
    let firstChar = inputArr[i].charAt(0);
    if (firstChar == "-") {
        Getoptions.push(inputArr[i]);
    } else {
        Getfiles.push(inputArr[i]);
    }
} 


// ab check krunga ki option kya hai hmare pass if we get wrong option the we return error 
let isBothP = Getoptions.includes("-b") && Getoptions.includes("-n");
if (isBothP==true) {
    console.log("ERROR :: EITHER ENTER -n OR -b OPTION ");
    return;
}


// check kia ki file exist krti hai ya nhi jse option dek rhe the
for (let i = 0; i < Getfiles.length; i++) {
    //ab hm file module use krenge toh phle usse require kr lo
    // ye buffer
    let isP = fs.existsSync(Getfiles[i]);
    if (isP == false) {
        console.log(`YOUR FILE ${Getfiles[i]} IS NOT PERSENT `);// yha pe concat wala vi use kr skte hai 
        return;
    }
}