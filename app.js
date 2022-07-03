var cnt = 0;

function add_todo() {
    var newtodo = document.getElementById("add").value;
    if (newtodo) {
        add_list(newtodo, 'list1', cnt);
        cnt++;
    }
    else alert('Please input your to-do!');
}

function add_list(todo, area, n) {
    var newlist = document.createElement('li');
    var list = document.getElementById(area);
    newlist.innerHTML = todo;
    newlist.id = 'todo' + n;
    list.appendChild(newlist);
    add_checkbox(area, n);
}

function remove(n) {
    var removed_list = document.querySelector('#todo' + n);
    var removed_checkbox = document.querySelector('#checkbox' + n);
    removed_list.parentNode.removeChild(removed_list);
    removed_checkbox.parentNode.removeChild(removed_checkbox);
}

function add_checkbox(area, n) {
    var checkbox = document.createElement('button');
    var list = document.getElementById(area);
    checkbox.id = 'checkbox' + n;
    if (area === 'list1') checkbox.innerHTML = 'O';
    else checkbox.innerHTML = 'X';
    list.appendChild(checkbox);
    checkbox.onclick = function(){check(n); };
}

function check(n) {    
    var checked_todo = document.getElementById('todo' + n);
    var check_value = document.getElementById('checkbox' + n).innerHTML;
    remove(n);
    var list = 'list2';
    if (check_value === 'X') list = 'list1';
    add_list(checked_todo.innerHTML, list, n);
}