var idx = 0;
let todoList = [];
const savedLists = 'saved_todos';

function add_todo() {
    var newtodo = document.getElementById("add").value;
    if (newtodo) {
        add_list(newtodo.trim(), 'list1', idx);
        document.getElementById("add").value = null;
    }
    else alert('Please input your to-do!');
}

function add_list(todo, target_list, n) {
    var list = document.getElementById(target_list);
    var newlist = document.createElement('div');
    newlist.className = 'todos';
    list.appendChild(newlist);
    //add remover
    var remover = document.createElement('button');
    remover.className = 'button remover';
    remover.id = 'remover' + n;
    remover.innerHTML = 'Del';
    newlist.appendChild(remover);
    remover.onclick = function(){remove(n); };
    //add checkbox
    var checkbox = document.createElement('button');
    checkbox.className = 'button checkbox';
    checkbox.id = 'checkbox' + n;
    if (target_list === 'list1') checkbox.innerHTML = '✔';
    else checkbox.innerHTML = '✘';
    newlist.appendChild(checkbox);
    checkbox.onclick = function(){check(n); };
    //add new todo list
    var newtodo = document.createElement('span');
    newtodo.innerHTML = todo;
    newtodo.id = 'todo' + n;
    newlist.appendChild(newtodo);
    //Add to todoList
    todoList.push([todo, target_list, n]);
    //Save to localStorage
    localStorage.setItem(savedLists, JSON.stringify(todoList));
    idx++;
}

function remove(n) {
    var removed_todo = document.querySelector('#todo' + n);
    var removed_checkbox = document.querySelector('#checkbox' + n);
    var removed_remover = document.querySelector('#remover' + n);
    var removed_list = removed_todo.parentNode;
    removed_list.removeChild(removed_todo);
    removed_list.removeChild(removed_checkbox);
    removed_list.removeChild(removed_remover);
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
    if (check_value === '✘') list = 'list1';
    add_list(checked_todo.innerHTML, list, idx);
}

function loadToStorage() {
    const loadedLists = localStorage.getItem(savedLists);
    if (loadedLists !== null) {
        const parsedLists = JSON.parse(loadedLists);
        parsedLists.forEach(function(todo) {
            add_list(todo[0], todo[1], todo[2]);
        });
        if (parsedLists.length) idx = parsedLists[parsedLists.length - 1][2] + 1;
    }
}

loadToStorage();