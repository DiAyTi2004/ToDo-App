function toDoApp() {
    handleInput();
    renderToDo();
    handleClearAll();
}
toDoApp();
function handleInput() {
    const inputElement = document.querySelector('.todo__input');
    const addBtn = document.querySelector('.todo__add');
    function handleTypeEnter() {
        inputElement.onkeydown = function (e) {
            if (e.key === 'Enter') {
                handleConfirm();
            }
        }
    }
    function handleClickAdd() {
        addBtn.onclick = function () {
            handleConfirm();
        }
    }
    function handleConfirm() {
        if (inputElement.value.trim()) {
            addToDo(inputElement.value);
            inputElement.value = '';
            inputElement.focus();
        }
        else alert('You have to type something :(');
    }
    handleTypeEnter();
    handleClickAdd();
}
function addToDo(inputValue) {
    let toDo = JSON.parse(localStorage.getItem('toDo'));
    if (!toDo) {
        toDo = [inputValue];
    }
    else {
        toDo.push(inputValue);
    }
    localStorage.setItem('toDo', JSON.stringify(toDo));
    renderToDo();
}
function renderToDo() {
    let toDo = JSON.parse(localStorage.getItem('toDo'));
    const pendingNumb = document.querySelector('.pending__num');
    pendingNumb.innerText = toDo.length;
    let htmls = '';
    toDo.forEach(function (item, index) {
        htmls += `
        <li class="todo__item todo__item-${index}">
            <h3 class="todo__content">
                ${item}
            </h3>
            <div class="todo__delete" onclick="handleDeleteToDo( ${index})">
                <i class="fa-solid fa-trash-can"></i>
            </div>
        </li>
        `;
    });
    document.querySelector('.todo__list').innerHTML = htmls;
}
function handleDeleteToDo(index) {
    const deleteElement = document.querySelector(`.todo__item-${index}`);
    deleteElement.classList.add('deleteAnimate');
    setTimeout(function () {
        deleteToDo(index);
    }, 1400);
}
function deleteToDo(index) {
    let toDo = JSON.parse(localStorage.getItem('toDo'));
    toDo.splice(index, 1);
    localStorage.setItem('toDo', JSON.stringify(toDo));
    renderToDo();
}
function handleClearAll() {
    const clearAllBtn = document.querySelector('.todo__clear');
    clearAllBtn.onclick = function () {
        clearAll();
    }
}
function clearAll() {
    const toDoItems = document.querySelectorAll('.todo__item');
    toDoItems.forEach(function (item, index) {
        item.classList.add('deleteAnimate');
    });
    setTimeout(function () {
        let toDo = JSON.parse(localStorage.getItem('toDo'));
        toDo.splice(0, toDo.length);
        localStorage.setItem('toDo', JSON.stringify(toDo));
        renderToDo();
    }, 1400);
}