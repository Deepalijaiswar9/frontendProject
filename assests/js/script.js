const notesContainer = document.querySelector(".row");
const addNotes = document.querySelector(".addNotes");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

addNotes.addEventListener("click", () => {
    let colMd4Div = document.createElement("div");
    colMd4Div.className = "col-md-4";

    // Create delete icon
    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fa fa-trash";
    deleteIcon.style.cursor = "pointer";
    deleteIcon.style.color = "#ff0000";
    deleteIcon.style.position = "absolute"; // Set delete icon position to absolute
    deleteIcon.style.right = "20px"; // Adjust icon position
    deleteIcon.style.top = "30px"; // Adjust icon position
    deleteIcon.addEventListener("click", handleDeleteIconClick);

    colMd4Div.appendChild(deleteIcon); // Append delete icon to colMd4Div

    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.style.position = "relative"; // Set input box position to relative

    colMd4Div.appendChild(inputBox); // Append inputBox to colMd4Div

    notesContainer.appendChild(colMd4Div); // Append colMd4Div to notesContainer

    notes = document.querySelectorAll(".input-box"); // Update notes variable
});

function handleDeleteIconClick(event) {
    if (event.target.tagName === "I") {
        // Remove the parent .col-md-4 element if the clicked element is an icon
        event.target.closest('.col-md-4').remove();
        updateStorage();
    } else if (event.target.tagName === "P") {
        // Handle the case when the clicked element is a <p> element
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.addEventListener("input", updateStorage);
        });
    }
}

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
