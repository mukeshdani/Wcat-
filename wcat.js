
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


// yhe pe hm read dkr rhe hai ki file mai kya data hai 
let data = "";
for (let i = 0; i < Getfiles.length; i++) {
    //buffer milega wse directly concat vi kr skte the kissi string ke sath krke 
    let bufferData = fs.readFileSync(Getfiles[i]);
    data += bufferData + "\r\n";
}
//console.log(data)


let GetContent = data.split("\r\n");
//console.log(GetContent);


// now work on my first  -s cammand 
let isSPreset = Getoptions.includes("-s");
if (isSPreset == true) {
    for (let i = 1; i <GetContent.length; i++) {
        if (GetContent[i] == "" && GetContent[i - 1] == "") {
            GetContent[i] = null;
        } else if (GetContent[i] == "" && GetContent[i - 1] == null) {
            GetContent[i] = null;
        }
    }
    let tempArr = [];
    for (let i = 0; i < GetContent.length; i++) {
        if (GetContent[i] != null) {
            tempArr.push(GetContent[i])
        }
    }
    GetContent= tempArr;
}
console.log("`````````````````````")

//console.log(GetContent.join("\n"));

// now second -n cammand 
let isNPresent = Getoptions.includes("-n");
if (isNPresent == true) {
    for (let i = 0; i < GetContent.length; i++) {
        GetContent[i] = `${i + 1} ${GetContent[i]} `;
    }
}

//console.log(GetContent.join("\n"));

// now -b cammand 
let isBPresent = Getoptions.includes("-b");
if (isBPresent == true) {

    let counter = 1
    
    for (let i = 0; i < GetContent.length; i++) {
        if (GetContent[i] != "") {

            GetContent[i] = `${counter} ${GetContent[i]}`;
            counter++;

        }
    }
}
console.log(GetContent.join("\n"));
