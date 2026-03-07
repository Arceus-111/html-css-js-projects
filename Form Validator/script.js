const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const form = document.getElementById("registration-form");
form.addEventListener("submit",submitForm);
function submitForm(e){
    e.preventDefault();
    const userName = username.value.trim();
    const email_ = email.value.trim() ;
    const password_ = password.value.trim();
    const confirmPassword_ = confirmPassword.value.trim();
    let isValid = checkRequired([username ,email ,password ,confirmPassword]);
    // const isUsernameValid = checklength(username,3,15);
    // const isEmailValid = checkEmail(email);
    // const ispasswordValid = checkPassword(password);
    if(isValid){
        const isUsernameValid = checklength(username,3,15);
        const isEmailValid = checkEmail(email);
        const ispasswordValid = checkPassword(password);
        const isPasswordMatch = checkPasswordMatch(password,confirmPassword);
        isValid = isUsernameValid && ispasswordValid && isPasswordMatch && isEmailValid;
        
    }
    if(isValid){
            // alert("Registration Successfull");
            // form.reset();
            // document.querySelectorAll(".form-group").forEach((e)=>{
            //     e.className = "form-group";
            // });
            setTimeout(() => {
                alert("Registration Successfull");
                form.reset();
                document.querySelectorAll(".form-group").forEach((e)=>{
                    e.className = "form-group";
                });
            }, 100);
    }
    else{
        if(userName !== "") checklength(username,3,15);
        if(email_ !== "") checkEmail(email);
        if(password_ !== "") checkPassword(password);
        if(confirmPassword_ !== "") checkPasswordMatch(password,confirmPassword);
    }
    
    // if(!userName){
    //     // username is empty 
    //     // make small under username visible 
    //     showError(username,"Username is empty");
    // }
    // if(!email){

    // }
}
function checkPasswordMatch(p,e){
    if(p.value.trim() === ""){
        showError(e,"Password is required");
        return false;
    }
    if(p.value.trim() === e.value.trim()){
        showSuccess(e);
        return true;
    }
    showError(e,"Password did not match");
    return false;
}
function checkPassword(e){
    return checklength(e,6,25);
}
function checkEmail(e){
    const str = e.value.trim() ;
    // @gmail.com
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(str)){
        showSuccess(e);
        return true;
    }
    else showError(e,"Email is not valid");
    return false;
}
function checklength(e,min,max){
    // e is a plain text 
    const str = e.value.trim() ;
    if(str.length < min){
        showError(e,`${fieldname(e)} must be atleast ${min} characters`);
        return false;
    }
    else if(str.length > max){
        showError(e,`${fieldname(e)} must be atmax ${max} characters`);
        return false;
    }
    else{
        // ok
        showSuccess(e) ;
        return true;
    }
}
function checkRequired(inputArray){
   let isValid = true;
    inputArray.forEach((e)=>{
        if(e.value.trim() === ""){
            isValid = false;
            // take the content from the label 
            showError(e,`${fieldname(e)} is required`);
        }
        else{
            showSuccess(e);
        }
        
    });
    return isValid;
}
function fieldname(e){
    const form = e.parentElement;
    // form is the div 
    const label = form.querySelector("label").innerText;
    return label;
}
function showError(element,msg){
    const form = element.parentElement;
    // form.classList.add("error");
    form.className = "form-group error";
    // form.className="form-group error";
    const small = form.querySelector("small");
    small.innerHTML = msg;
}
function showSuccess(e){
    const form = e.parentElement;
    // form.classList.add("success");
    // form..remove("error");
    form.className = "form-group success";
}