const bookmarkname = document.getElementById("bookmark-name");
const bookmarkurl = document.getElementById("bookmark-url");
const add_btn = document.getElementById("add-bookmark");
const bookmarklist = document.getElementById("bookmark-list");
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
add_btn.addEventListener('click',addBookmark);
function addBookmark(e){
    // e.preventDefault() ;
    const bookmark_name = bookmarkname.value.trim() ;
    const bookmark_url = bookmarkurl.value.trim() ;
    if(!bookmark_name || !bookmark_url){
        alert("Please enter both name and URL");
        return;
    }
    else{
        if(!bookmark_url.startsWith("http://") && !bookmark_url.startsWith("https://")){
            alert("Please enter a valid URL");
            return;
        }
    }
    const id = Date.now();
    bookmarks.push({
        id,
        bookmark_name,
        bookmark_url,
    });
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    updateList();
    bookmarkname.value = "";
    bookmarkurl.value = "" ;

}
function updateList(){
    bookmarklist.innerHTML="";
    const sortedbookmarklist = [...bookmarks].reverse();
    sortedbookmarklist.forEach(e => {
        const li = create(e) ;
        bookmarklist.appendChild(li);
    });
}

function create(e){
    const li = document.createElement("li") ;
    const link = document.createElement("a") ;
    link.href = e.bookmark_url;
    link.textContent = e.bookmark_name;
    link.target = "_blank";
    const removeButton = document.createElement("button");
    removeButton.addEventListener("onclick",removebookmark(e.id));
    removeButton.textContent = "Remove";
    // e.bookmark_name and e.bookmark_url and e.id 
    // li.innerHTML=`
    //     <span>${link}</span>
    //     <button onclick="removebookmark(${e.id})">Remove</button>
    // `;
    li.appendChild(link);
    li.appendChild(removeButton);
    return li ;
}
function removebookmark(id){
    bookmarks = bookmarks.filter((e)=> e.id !== id) ;
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks)) ;
    updateList() ;
}
updateList() ;
// console.log("hello");
// console.log(bookmarks);