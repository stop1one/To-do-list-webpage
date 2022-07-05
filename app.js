var idx = 0;
let todoList = [];
const savedLists = 'saved_todos';

function add_todo() {
    var newtodo = document.getElementById("add").value;
    if (newtodo) {
        add_list(newtodo, 'list1', idx);
        document.getElementById("add").value = null;
    }
    else alert('Please input your to-do!');
}

function add_list(todo, target_list, n) {
    console.log(todo, target_list, n);
    var list = document.getElementById(target_list);
    var newlist = document.createElement('li');
    newlist.innerHTML = todo;
    newlist.id = 'todo' + n;
    console.log(target_list);
    list.appendChild(newlist);
    //add checkbox
    var checkbox = document.createElement('button');
    checkbox.id = 'checkbox' + n;
    if (target_list === 'list1') checkbox.innerHTML = 'O';
    else checkbox.innerHTML = 'Cancel';
    list.appendChild(checkbox);
    checkbox.onclick = function(){check(n); };
    //Add to todoList
    todoList.push([todo, target_list, n]);
    //Save to localStorage
    localStorage.setItem(savedLists, JSON.stringify(todoList));
    idx++;
}

function remove(n) {
    var removed_list = document.querySelector('#todo' + n);
    var removed_checkbox = document.querySelector('#checkbox' + n);
    removed_list.parentNode.removeChild(removed_list);
    removed_checkbox.parentNode.removeChild(removed_checkbox);
    //remove todo in localStorage
    for (var i = 0; i < todoList.length; i++) {
        if (todoList[i][2] === n) todoList.splice(i, 1);
    }
    localStorage.setItem(savedLists, JSON.stringify(todoList));
}

function check(n) {
    var checked_todo = document.getElementById('todo' + n);
    var check_value = document.getElementById('checkbox' + n).innerHTML;
    remove(n);
    var list = 'list2';
    if (check_value === 'Cancel') list = 'list1';
    add_list(checked_todo.innerHTML, list, idx);
}

function loadToStorage() {
    const loadedLists = localStorage.getItem(savedLists);
    if (loadedLists !== null) {
        const parsedLists = JSON.parse(loadedLists);
        parsedLists.forEach(function(todo) {
            add_list(todo[0], todo[1], todo[2]);
        });
        idx = parsedLists[parsedLists.length - 1][2] + 1;
    }
}

loadToStorage();