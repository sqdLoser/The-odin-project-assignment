const myLibrary = [];
function loadLocal(){
    const number=localStorage.getItem("n");
    if(number==='null'){
        return;
    }
    for(let i=0; i<number; i++){
        let element=JSON.parse(localStorage.getItem(`${i}`));
        myLibrary.push(element);
        addBookToScreen(element);
    }
}
function saveLocal(){
    localStorage.clear()
    localStorage.setItem("n",`${myLibrary.length}`)
    myLibrary.forEach(element=>{
        localStorage.setItem(`${myLibrary.indexOf(element)}`,JSON.stringify(element))
    })
}
const elements = {
    addBookBtn:document.getElementById("addBook"),
    bookName:document.getElementById("bookName"),
    bookAuthor:document.getElementById("bookAuthor"),
    pageNumber:document.getElementById("pageNumber"),
    readCheckbox:document.getElementById("readCheckbox"),
    books:document.getElementById("books"),
    submitBook:document.getElementById("submitBook"),
    dialog:document.getElementById("favDialog"),
    body:document.querySelector("body"),
    form:document.getElementById("myForm")
}
function createElement(tag, options = {}) {
    const el = document.createElement(tag);
    if (options.text) el.innerText = options.text;
    if (options.classes) el.classList.add(...options.classes);
    if (options.onClick) el.addEventListener("click", options.onClick);
    return el;
}

function addBookToScreen(obj) {
    const book = createElement("div", { classes: ["book"] });

    book.appendChild(createElement("h3", { text: obj.name }));
    book.appendChild(createElement("p", { text: obj.author }));
    book.appendChild(createElement("p", { text: "Pages: " + obj.pages }));
    book.appendChild(createElement("button", { 
        text: obj.read, 
        classes: ["readButton"],
        onClick:(e)=>{
            obj.read=obj.read==="read" ? "not read" : "read";
            e.target.innerText=obj.read;
            saveLocal()
        } 
    }));
    book.appendChild(createElement("button", { 
        text: "Remove", 
        classes: ["removeButton"], 
        onClick: (e) => {
            myLibrary.splice(myLibrary.findIndex(b => b.id === obj.id),1);
            e.target.parentElement.remove()
            saveLocal();}
    }));

    elements.books.appendChild(book);
}
function getFormData(e) {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.read = data.read ? "read" : "not read";
    data.id=window.crypto.randomUUID();
    return data;
}

function closeDialog() {
    elements.dialog.close();
    elements.body.style.opacity = "1";
    elements.form.reset();
}

function addBookToLibrary(e) {
    const data = getFormData(e);
    myLibrary.push(data);
    addBookToScreen(data);
    closeDialog();
    saveLocal();
}
function openingDialog(){
    elements.dialog.showModal();
    elements.body.style.opacity="0.1"
}
elements.form.addEventListener("submit", function(e) {
    e.preventDefault();
    addBookToLibrary(e);
});
loadLocal();