// DOM EVENTS //
// Performance wise, for selecting elements the best is then to have an id
// 1. addEventListener allows us to make the js listen to a determined element event
var userInputSource = document.querySelector("#userInput");
var ulSource = document.querySelector("ul");
var enterSource = document.querySelector("#enterButton");
var highlightSoruce = document.querySelector("#highlightButton");
var doneSource = document.querySelector("#doneButton");
var deleteSource = document.querySelector("#deleteButton");
var listItems;
var listModifier;

function updateListItems(list) {
  listItems = list.querySelectorAll("li");
}

function modifyEntireList(listModifier, listItems) {
  listItems.forEach(element => {
    if (listModifier === "delete") {
      element.parentNode.removeChild(element);
    } else {
      element.children.namedItem("span").classList.add(listModifier);
      if (
        element.children
          .namedItem(listModifier)
          .classList.contains(listModifier + "Active")
      ) {
        element.children
          .namedItem(listModifier)
          .classList.toggle(listModifier + "Active");
      }
    }
  });
}

function inputLenght() {
  return userInputSource.value.length;
}

function createListElement() {
  var newLi = document.createElement("li"); // with this method we create a new html element that we want to insert somewhere
  // here we could have also done newLi.innerHTML = userInputSource.value
  ulSource.appendChild(newLi); // to end we attach a new child to the list, the li we have created in the two steps before
  var liSpan = document.createElement("span");
  liSpan.appendChild(document.createTextNode(userInputSource.value));
  liSpan.setAttribute("name", "span");
  newLi.appendChild(liSpan);
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&#x267B";
  deleteButton.classList.add("ilButton");
  deleteButton.setAttribute("name", "delete");
  newLi.appendChild(deleteButton);
  var doneButton = document.createElement("button");
  doneButton.innerHTML = "";
  doneButton.classList.add("ilButton", "doneButton", "doneActive");
  doneButton.setAttribute("name", "done");
  newLi.appendChild(doneButton);
  var highlightButton = document.createElement("button");
  highlightButton.innerHTML = "";
  highlightButton.classList.add("highlightButton", "highlightActive");
  highlightButton.setAttribute("name", "highlight");
  newLi.appendChild(highlightButton);
  userInputSource.value = "";
  listModifier = "";
}

function changeElementProperty(listItems) {
  listItems.forEach(element => {
    element.children.namedItem("delete").onclick = () => {
      element.parentNode.removeChild(element);
    };
    element.children.namedItem("done").onclick = () => {
      element.children.namedItem("span").classList.toggle("done");
      element.children.namedItem("done").classList.toggle("doneActive");
    };
    element.children.namedItem("highlight").onclick = () => {
      element.children.namedItem("span").classList.toggle("highlight");
      element.children
        .namedItem("highlight")
        .classList.toggle("highlightActive");
    };
  });
}

// add items
enterSource.addEventListener("click", () => {
  // the () => is the same as function() but remember that arrow functions always will be called with the context in which it was defined and cannot be rebind this to a new context | bind still has value for function arguments: .bind(undefined, arg1, arg2, arg3) | undefined would be the new this context, which cannot be changed and thats why the paraementer is undefined
  if (inputLenght() > 0) {
    // we check if there a user entry in the text input before adding an element to the list
    createListElement();
  } else {
    alert("New list item is empty, please enter a new task first");
  }
});

userInputSource.addEventListener("keypress", event => {
  // event is a parameter of the arrow function
  if (inputLenght() > 0 && event.keyCode === 13) {
    // we check if there a user entry in the text input before adding an element to the list
    createListElement();
  } else if (inputLenght() === 0 && event.keyCode === 13) {
    alert("New list item is empty, please enter a new task first");
  }
});

// Modify list items
ulSource.addEventListener("mouseenter", () => {
  updateListItems(ulSource);
  changeElementProperty(listItems);
}); // changeElementProperty does not have () because we are just declaring that this function has to be executed once the event triggers but not just by being written in this line, thats a callback function

// Modify entire list
highlightSoruce.addEventListener("click", () => {
  listModifier = "highlight";
  updateListItems(ulSource);
  modifyEntireList(listModifier, listItems);
});
doneSource.addEventListener("click", () => {
  listModifier = "done";
  updateListItems(ulSource);

  modifyEntireList(listModifier, listItems);
});
deleteSource.addEventListener("click", () => {
  listModifier = "delete";
  updateListItems(ulSource);

  modifyEntireList(listModifier, listItems);
});
