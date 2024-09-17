const Note = document.getElementById("mainnote")
const save = document.getElementById("save-btn")
const title = document.getElementById("title")
let share = document.getElementById("shareBtn")
let storageData = JSON.parse(localStorage.getItem("shareddata"))

function renderRecent() {
    let reset = []
    if(storageData){
        let shareddata = storageData
        let i =  shareddata.length - 1
        for(let count = i; count >= 0; count--){
            reset[i - count]= shareddata[count]
        } 
    }
    else{
        reset = [" "]
    }
    return  noteContainer.innerHTML = reset.join(`&nbsp`)
}

let comma = []
let displayTitle = document.getElementById("displayTitle")
let Main = document.getElementById("Main")
let display = document.getElementById("timeDisplay")
let backgroundCover = document.getElementById("backgroundcover")
let hide = document.getElementById("hide")
let displaynote = document.getElementById("notedisplay")
let specificNoteTitle = document.getElementById("specificnotetitle")
let specificNote = document.getElementById("specificnote")
let noteContainer = document.getElementById("notecontent")
let note = document.getElementById("note")
let notecover = document.getElementById("notecover")
let heroSection = document.getElementById("herosection")
let notePresenter = document.getElementById("imageoverlay")
noteContainer.innerHTML = renderRecent()
let cancel = document.getElementById("cancel")
let options = document.getElementById("doubleclick-contents")
let deletebtn = document.getElementById("deletebtn")
let takeNote = document.getElementById("takenote")
let addNote = document.getElementById("addnote")
let closeNote = document.getElementById("closenote")
let titleStorage = JSON.parse(localStorage.getItem("title"))
let timeStorage = JSON.parse(localStorage.getItem("time"))
let noteStorage = JSON.parse(localStorage.getItem("note"))
let titleSet = []
let noteSet = []
let timeSet = []
let shareddata = []
let reset = []
let edit = document.getElementById("editBtn")
let divNote 
let divTitle
let reConfigure = document.getElementById("edit")
let date = new Date
let day 
let month
let year 
let hour
let minutes
let seconds
let avoidBrk
let dateFormat 
let period
let prev
function timing() { 
     day = date.getDate().toString().padStart(2, '0')
     month = (date.getMonth()+1).toString().padStart(2, '0')
     year = date.getFullYear().toString().padStart(2, '0')
     hour = date.getHours().toString().padStart(2, '0')
     minutes = date.getMinutes().toString().padStart(2, '0') 
     seconds = date.getSeconds().toString().padStart(2, '0')
     if(Number(hour) >= 12){
        period = "PM"
        prev = Number(hour) % 12 
        if(prev == 0){
            prev = 12
        }
        hour = prev
     }
     else{
        period = "AM"
        if(hour == Number("00")){
            hour = 12
        }
        else{
            hour = hour
        }
     }
     avoidBrk = hour + ":" + minutes + " "+ period
   return  dateFormat = `${(avoidBrk)}
   ${month}/${day}/${year}`
}


save.addEventListener('click', (e) => {
    save.style.display = "block"
    reConfigure.style.display = "none"
    if(noteStorage && timeStorage && titleStorage && storageData){
        noteSet = noteStorage
        titleSet = titleStorage
        timeSet = timeStorage
        comma = storageData
    }
    else{
        noteSet = []
        titleSet = []
        timeSet =[]
        comma = []
    }
     let info = `
        <div class="notecards">
          <div id="${comma.length}" class="notecards-cover-dark notecover">
        <div id="displayTitle" class="display-title">${title.value}</div>
        <div id="timeDisplay" class="time">${timing()}</div>
        <div id="note" class="note">${Note.value}</div>
    </div>
    <div class="notecards-cover-light"></div>
</div>`
    titleSet.push(title.value)
    localStorage.setItem("title", JSON.stringify(titleSet))
    noteSet.push(Note.value)
    localStorage.setItem("note", JSON.stringify(noteSet))
    timeSet.push(dateFormat)
    localStorage.setItem("time", JSON.stringify(timeSet))
    comma.push(info)
    localStorage.setItem("shareddata",  JSON.stringify(comma))
    noteContainer.innerHTML = renderRecent()
    Note.setAttribute("placeholder", "Type your note here")
    title.setAttribute("placeholder", "Type the title of your note here") 
    Note.value = ""
    title.value = ""
  
})


hide.addEventListener("click", () => {
    displaynote.style.display = "none"
})

function reId() {
    shareddata = storageData
    noteSet = noteStorage
    timeSet = timeStorage
    titleSet = titleStorage
    for(let i = 0; i < shareddata.length; i++){
        shareddata[i] = 
        `
        <div class="notecards">
          <div id="${i}" class="notecards-cover-dark notecover">
        <div id="displayTitle" class="display-title">${titleSet[i]}</div>
        <div id="timeDisplay" class="time">${timeSet[i]}</div>
        <div id="note" class="note">${noteSet[i]}</div>
    </div>
    <div class="notecards-cover-light"></div>
</div>`
    }
    localStorage.setItem("shareddata", JSON.stringify(shareddata))
}

//Note cards Displaying their note content
document.addEventListener("click", function (e) {
    if(e.target.classList.contains("notecover")){
         specificNoteTitle.textContent = e.target.childNodes[1].childNodes[0].data
        specificNote.textContent = e.target.childNodes[5].childNodes[0].data
        displaynote.style.height = (Main.offsetHeight - 10) + "px"
     window.addEventListener("resize", () => {
         displaynote.style.height = (Main.offsetHeight - 10)+ "px"
     })
         displaynote.style.display = "flex" 
    }
})


let lastTarget
//Note cards that displays the title and time
document.addEventListener("contextmenu", function (e) {
    e.preventDefault()
    lastTarget = e.target.id
   let rect = e.target.getBoundingClientRect()
    if(e.target.classList.contains("notecover")){
        options.style.right =  (rect.right) + "px"
        options.style.top = (rect.top + 120) + "px"
        options.style.bottom = (rect.bottom) + "px"
        options.style.left = (rect.left) + "px"
         options.style.display = "block"
        console.log(e)
        divNote = e.target.childNodes[5].childNodes[0].data
        divTitle = e.target.childNodes[1].childNodes[0].data
    }
})

//Event Listener to simulate a right-click event on mobile device
let timeOut
document.addEventListener("touchstart", function (e) {
   timeOut = setTimeout(function (){
    lastTarget = e.target.id
   let rect = e.target.getBoundingClientRect()
    if(e.target.classList.contains("notecover")){
        options.style.right =  (rect.right) + "px"
        options.style.top = (rect.top + 120) + "px"
        options.style.bottom = (rect.bottom) + "px"
        options.style.left = (rect.left) + "px"
         options.style.display = "block"
        console.log(e)
        divNote = e.target.childNodes[5].childNodes[0].data
        divTitle = e.target.childNodes[1].childNodes[0].data
    }
    const rightClickEvent = new MouseEvent("contextmenu", {
        cancelable: true,
        bubbles: true,
        view: window
    })
    e.target.dispatchEvent(rightClickEvent)
   }, 500)
    
})

//cancels the long-clicking if the users remove their hand from the div element before 500ms
document.addEventListener("touchend", (e) => {
    clearTimeout(timeOut)
})

//cancels the long-clicking if the users move their hand from the div element during the 500ms interval
document.addEventListener("touchmove", (e) => {
    clearTimeout(timeOut)
})

cancel.addEventListener("click", function (e) {
    options.style.display = "none"
})

 deletebtn.addEventListener("click", function (e) {
    let Time
    let bote
    let Title
    let main
     console.log(e)
      noteSet = noteStorage
      timeSet = timeStorage
      titleSet = titleStorage
      shareddata = storageData
     let num = Number(lastTarget)
       for(let i = 0; i < shareddata.length; i++){
           let start = i
           let target = 1
           if(`${i}` == num){
             main = shareddata.splice(start, target)
             bote = noteSet.splice(start, target)
             Time = timeSet.splice(start, target)
             Title = titleSet.splice(start, target)
       }
      }
console.log("Title:" + Time, "Note:" + bote, "Shareddata:" + main, "Title:" + Title)
localStorage.setItem("shareddata", JSON.stringify(shareddata))
localStorage.setItem("time", JSON.stringify(timeSet))
localStorage.setItem("title", JSON.stringify(titleSet))
localStorage.setItem("note", JSON.stringify(noteSet))
reId()
noteContainer.innerHTML = renderRecent()
options.style.display = "none"
 } )


takeNote.addEventListener("click", () => {
    Note.setAttribute("placeholder", "Type your note here")
    title.setAttribute("placeholder", "Type the title of your note here") 
    Note.value = ""
    title.value = ""
     addNote.style.height = (Main.offsetHeight - 5) + "px"
     window.addEventListener("resize", () => {
         addNote.style.height = (Main.offsetHeight - 5)+ "px"
     })
    addNote.style.display = "block"
} )

closeNote.addEventListener("click", () => {
    addNote.style.display = "none"
})



edit.addEventListener("click", () => {
    Note.value = divNote
    title.value = divTitle
    let idTarget = Number(lastTarget)
    save.style.display = "none"
    reConfigure.style.display = "block"
    addNote.style.display = "block"
    options.style.display = "none"
    reConfigure.addEventListener("click", () => {
    shareddata = storageData
    timeSet = timeStorage
    timeSet[idTarget] = `${timeSet[idTarget]}`
    noteSet = noteStorage
    noteSet[idTarget] = `${Note.value}`
    titleSet = titleStorage
    titleSet[idTarget] = `${title.value}`
        shareddata[idTarget] = 
        `
        <div class="notecards">
          <div id="${idTarget}" class="notecards-cover-dark notecover">
        <div id="displayTitle" class="display-title">${titleSet[idTarget]}</div>
        <div id="timeDisplay" class="time">${timeSet[idTarget]}</div>
        <div id="note" class="note">${noteSet[idTarget]}</div>
    </div>
    <div class="notecards-cover-light"></div>
</div>`
localStorage.setItem("shareddata", JSON.stringify(shareddata))
localStorage.setItem("time", JSON.stringify(timeSet))
localStorage.setItem("note", JSON.stringify(noteSet))
localStorage.setItem("title", JSON.stringify(titleSet))
addNote.style.display = "none"
noteContainer.innerHTML = renderRecent()
Note.setAttribute("placeholder", "Type your note here")
title.setAttribute("placeholder", "Type the title of your note here") 
save.style.display = "block"
reConfigure.style.display = "none"
    })
    console.log(idTarget)
})

share.addEventListener("click", () => {
    if(navigator.share){
        navigator.share({
            Title: divTitle,
            Note: divNote,
            url: window.location.href + divNote
        }).then(() => {
            console.log(" Task Successful")
        }).catch((error) => {
            console.error("An error occured:", error )
        })
    }
    else{
        console.log("The browser is not supported")
    }
})

