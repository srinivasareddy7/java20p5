function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.innerText);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const newElement = document.createElement("div");
    newElement.classList.add("draggable");
    newElement.draggable = true;
    newElement.innerText = data;
    newElement.ondragstart = drag;

    event.target.appendChild(newElement);
}
