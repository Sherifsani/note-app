const addbox = document.querySelector(".add-box"), 
popupbox = document.querySelector(".popup-box"),
popuptitle = document.querySelector("header p"),
closeicon = document.querySelector("pre"),
addbtn = document.querySelector("button"),
titletag = document.querySelector("input"),
desctag = document.querySelector("textarea");

const months = ["january", "february", "march", "april", "May", "June", "July", "August", "september", "october", "november", "december"];

//getting localstorage notes if exist and parsing them to js object else parsing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isupdate = false, updateid

addbox.addEventListener("click", () => {
    titletag.focus()
    popupbox.classList.add("show")
})
closeicon.addEventListener("click", () => {
    isupdate = false
    titletag.value = ''
    desctag.value =  ''
    addbtn.innerText = "Add Note"
    popuptitle.innerText = "Add a new Note"
    popupbox.classList.remove("show")
})
function shownotes(){
    document.querySelectorAll(".note").forEach(note => note.remove())
    notes.forEach((note, index) => {
        let litag = `
        <li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
                <i class='bx bx-dots-horizontal-rounded' onClick ="showmenu(this)"></i>
                <ul class="menu">
                    <li onClick="updatenote(${index}, '${note.title}', '${note.description}')">Edit</li>
                    <li onClick="deletenote(${index})">Delete</li>
                </ul>
            </div>
        </div>
     </li>`;
     addbox.insertAdjacentHTML("afterend", litag)
    })
}
function showmenu(elem){
    elem.parentElement.classList.add("show")
    document.addEventListener("click", e =>{
        //removing show class from the settings menu on document click
        console.log(77)
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show")
        }
    })
}
function deletenote(noteid){
    let confirmdelete = confirm("do you want to delete")
    if(!confirmdelete)return
    notes.splice(noteid ,1);//removing selected note from array
    //saving updated notes to localstorage
    localStorage.setItem("notes", JSON.stringify(notes))
    // shownotes()
}

function updatenote(noteid, title, desc){
    isupdate = true
    updateid = noteid
    addbox.click()
    titletag.value = title
    desctag.value = desc
    addbtn.innerText = "update note"
    popuptitle.innerText = "update a note"
}

shownotes()
addbtn.addEventListener("click", e => {
    e.preventDefault()
    let notetitle = titletag.value,
    notedesc = desctag.value;

    if(notetitle || notedesc){
        let dateo = new Date(),
        month = months[dateo.getMonth()]
        day = dateo.getDate()
        year = dateo.getFullYear()

        let noteinfo = {
            title: notetitle,
            description: notedesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isupdate){
        notes.push(noteinfo);

        }else{
            isupdate = false
            notes[updateid] = noteinfo
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        console.log(noteinfo)
        closeicon.click();
        shownotes()

    }
})
