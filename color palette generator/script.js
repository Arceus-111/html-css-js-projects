const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");
generateBtn.addEventListener('click',generatePalette);
// try copying to clipboard
paletteContainer.addEventListener('click',function(e){
    //it will have nodes (5)
    // each node will have color-info
    // first extract the color-info
    // also make sure it clicks the copy button 
    if(e.target.classList.contains("copy-btn")){
        const hexvalue = e.target.previousElementSibling.textContent;
        navigator.clipboard.writeText(hexvalue)
        .then(()=>showCopySuccess(e.target))
        .catch((err)=> console.log(err));
    }
    else if(e.target.classList.contains("color")){
        const hexvalue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        navigator.clipboard.writeText(hexvalue)
        .then(()=>showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch((err)=>console.log(err));
    }
});
function showCopySuccess(e){
    e.classList.remove("far","fa-copy");
    e.classList.add("fas","fa-check");
    e.style.color="#48bb78";
    setTimeout(()=>{
        e.classList.remove("fas","fa-check");
        e.classList.add("far","fa-copy");
        e.style.color="";
    },1500);
}
function generatePalette(){
    const colors=[];
    for(let i=0;i<5;i++){
        colors.push(generateRandomColor());
    }
    updatePaletteDisplay(colors);
}
function generateRandomColor(){
    let color = "#";
    const letters="0123456789ABCDEF";
    for(let i=0;i<6;i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}
function updatePaletteDisplay(colors){
    // for updating the display 
    // we have the palette container 
    // it will have child nodes
    // color-box (5) color box as child nodes
    // delve into the child nodes and change the content 
    const colorBoxes = document.querySelectorAll(".color-box");
    colorBoxes.forEach((box,index)=>{
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hex = box.querySelector(".hex-value");
        colorDiv.style.backgroundColor = color;
        hex.textContent = color;
    });

}