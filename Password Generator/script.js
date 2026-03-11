const btn = document.querySelector(".btn");
const ip = document.querySelector("#password")
const length = document.getElementById("length");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols") ;
const len = document.getElementById("len");
const txt = document.getElementById("txt");
const bar = document.querySelector(".meter");
const copy = document.getElementById("copy-btn");

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

// 
length.addEventListener("input",(e)=>{
    len.innerHTML = length.value;
    console.log(len);
});
// len.innerHTML = length.value;



btn.addEventListener('click',addclick);

function addclick(e){
    e.preventDefault() ;
    let password = "" ;
    console.log(uppercase) ;
    console.log(uppercase.checked) ;
    // write the logic for password 
    let L =  length.value;// need to get the input 
    if(uppercase.checked) password += uppercaseLetters;
    if(lowercase.checked) password += lowercaseLetters;
    if(numbers.checked) password += numberCharacters;
    if(symbols.checked) password += symbolCharacters;

    if(password.length === 0){
        return;
    }
    let ans = "";
    const sz = password.length;
    // console.log(sz) ;
    for(let i=0;i<L;i++){
        ans += password[Math.floor((Math.random()*sz))];
    }
    ip.value=ans;
    updatebar(ans);
    
}
copy.addEventListener('click',()=>{
        console.log("its clicked");
        if(!ip.value){
            console.log("ip has no value");
            return;
        }
        navigator.clipboard.writeText(ip.value)
        .then(()=>show())
        .catch((er)=> console.log(er));
    });
function updatebar(password){   
    const passwordLength = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

    let strengthScore = 0;
    strengthScore += Math.min(passwordLength * 2, 40);

  if (hasUppercase) strengthScore += 15;
  if (hasLowercase) strengthScore += 15;
  if (hasNumbers) strengthScore += 15;
  if (hasSymbols) strengthScore += 15;

  // enforce minimum score for every short password
  if (passwordLength < 8) {
    strengthScore = Math.min(strengthScore, 40);
  }

  // ensure the width of the strength bar is a valid percentage
  const safeScore = Math.max(5, Math.min(105, strengthScore));
  bar.style.width = safeScore + "%";
//   console.log(safeScore);

  let strengthLabelText = "";
  let barColor = "";

    if (strengthScore < 40) {
        // weak password
        barColor = "#fc8181";
        strengthLabelText = "Weak";
    } else if (strengthScore < 70) {
        // Medium password
        barColor = "#fbd38d"; // Yellow
        strengthLabelText = "Medium";
    } else {
        // Strong password
        barColor = "#68d391"; // Green
        strengthLabelText = "Strong";
    }
    bar.style.backgroundColor=barColor;
    txt.textContent = strengthLabelText;

}
function show(){
    copy.classList.remove("far","fa-copy");
    copy.classList.add("fas","fa-check");
    copy.style.color = "#48bb78";
    setTimeout(() => {
        copy.classList.remove("fas", "fa-check");
        copy.classList.add("far", "fa-copy");
        copy.style.color = "";
    }, 1500);
}