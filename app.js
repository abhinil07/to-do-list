var textWrapper = document.querySelector(".ml9 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);
anime
  .timeline({ loop: true })
  .add({
    targets: ".ml9 .letter",
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
    delay: (el, i) => 45 * (i + 1),
  })
  .add({
    targets: ".ml9",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });
const inputValue = document.getElementById("inputValue");
const addButton = document.getElementById("addButton");
const form = document.getElementById("formAdd");
const items = document.getElementById("items");
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = handleLocal.getLocalItems();
  savedTasks.forEach((task) => {
    addItemToHTML(task);
  });
});
inputValue.addEventListener("keydown", (e) => {
  e.key === "Enter" && addtask();
});
addButton.addEventListener("click", addtask);
function addtask() {
  if (inputValue.value === "" || inputValue.value.trim() === "") {
    alert("Please write your task, It is empty!!!");
  } else {
    addItemToHTML(inputValue.value);
    handleLocal.setLocalItem(inputValue.value);
    inputValue.value = "";
  }
}
const addItemToHTML = (task) => {
  let li = document.createElement("li");
  li.className =
    "list-group-item  mt-3 mr-5 w-50 mr-5  mx-auto align-items-center justify-content-center text-left";
  let deleteButton = document.createElement("button");
  deleteButton.appendChild(document.createTextNode("Delete"));
  deleteButton.className =
    "btn-danger btn btn-sm float-right text-right delete";
  deleteButton.addEventListener("click", removeListItem);
  li.appendChild(document.createTextNode(task));
  li.appendChild(deleteButton);
  items.appendChild(li);
};
const removeListItem = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    let li = e.target.parentNode;
    items.removeChild(li);
  }
  let temp = [];
  const tasks = Array.from(items.children);
  tasks.forEach((item) => {
    temp.push(item.firstChild.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(temp));
};
const handleLocal = {
  setLocalItem: (item) => {
    if (localStorage.getItem("tasks") === null) {
      let tasks = [];
      tasks.push(item);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks.push(item);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    console.log("%c Succesfull saved on local storage", "color:green");
  },
  getLocalItems: () => {
    return JSON.parse(localStorage.getItem("tasks"));
  },
};
