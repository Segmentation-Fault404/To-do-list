const todolist = JSON.parse(localStorage.getItem("stuff")) || [];
todo = [];
let count = 0;
let task;
window.onload = function(){
    for(let i = 0; i < todolist.length; i++){
        if(todolist[i]){
            task = todolist[i];
            todo[count] = todolist[i];
            createButton();
            count++;
        }
    }
    getDate();
}
function getDate(){
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let year = date.getFullYear();
    if(dd < 10){
        dd = '0' + dd;
    }
    if(mm < 10){
        mm = '0' + mm;
    } 
    let total = `${year}-${mm}-${dd}`;
    document.getElementById("tododate").setAttribute("min",total);
    document.getElementById("tododate").setAttribute("placeholder",`${mm}/${dd}/${year}`);
    document.getElementById("tododate").value = total;
}
function insertList(){
    todolist.mytask = document.getElementById("todo").value;
    todolist.mytaskdate = document.getElementById("tododate").value;
    if(todolist.mytask == "" || todolist.mytaskdate == ""){
        alert("Enter a task");
        return;
    }
    const styleDate = document.createElement("h3");
    styleDate.textContent = todolist.mytaskdate;
    styleDate.style.position = "absolute";
    styleDate.style.left = "300px";
    task = todolist.mytask + " " + styleDate.textContent;
    todo[count] = task;
    createButton();
    document.getElementById("todo").value = "";
    document.getElementById("tododate").value = "";
    count++;
}
function clearScreen(){  
    document.getElementById("printtodo").innerHTML = "";
    localStorage.removeItem("stuff");
    let elements = document.getElementsByClassName("delete");
    let totalElements = Array.from(elements);
    totalElements.forEach(element => {
        element.remove();
    });
    task = "";
    todo = [];
    count = 0;
}
function createButton(){
    let newButton = document.createElement("button");
    newButton.textContent = "Delete";
    newButton.className = "delete";
    let container = document.createElement("div")
    container.append(task);
    container.append(newButton);
    container.setAttribute("id", count);
    for(let i = 0; i < 3; i++){
        container.append(document.createElement("br"));
    }
    newButton.addEventListener('click', () => {removeElement(container);});
    document.getElementById("printtodo").appendChild(container);
    localStorage.setItem("stuff", JSON.stringify(todo));
}
function removeElement(container){
    let num = container.getAttribute("id");
    document.getElementById("printtodo").removeChild(document.getElementById(num));
    todo[Number(num)] = null;
    localStorage.setItem("stuff", JSON.stringify(todo));
}
