function drag(event) {
    event.dataTransfer.setData("text", event.target.src);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    var img_src = event.dataTransfer.getData("text");
    event.target.style.backgroundImage = "url('" + img_src + "')";
}