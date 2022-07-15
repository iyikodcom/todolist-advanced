//-- +
//--global değişkenler
let todoLists;
let lastID = 0;
//-- -

//-- +
//--modallar
let modalAddTodo = new bootstrap.Modal(document.getElementById('modalAddTodo'));
//-- -

//-- +
//--şablonlar
const tmplAlert = message => {
    return `<div class="alert alert-info mb-0 mt-3" role="alert">
        ${message}
    </div>`;
}

const tmplTodoListsHeader = status => {
    return `<div class="d-flex justify-content-between">
        <h2 class="text-secondary mb-0">Todo Lists</h2>
        <div id="dropdownTodoLists">
            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i class="bi bi-gear-fill"></i>
                </button>
                <ul class="dropdown-menu">
                    <li>
                        <a class="dropdown-item text-primary" href="#">
                            <i class="bi bi-upload me-2"></i>Import
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item text-primary ${(status) ? true : 'disabled'}" href="#">
                            <i class="bi bi-download me-2"></i>Export
                        </a>
                    </li>
                    <li>
                        <a id="btnAllListDelete" class="dropdown-item text-danger ${(status) ? true : 'disabled'}" href="#">
                            <i class="bi bi-trash-fill me-2"></i>Delete all lists
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>`;
}

const tmplTodoListsItemPlaceholder = repeat => {
    let tmpl = `<div class="col-12">
        <div class="row g-2">
            <div class="col-9">
                <div class="placeholder-glow">
                    <span class="placeholder col-12 rounded bg-secondary" style="min-height:1.5em;"></span>
                </div>
            </div>
            <div class="col">
                <div class="placeholder-glow">
                    <span class="placeholder col-12 rounded bg-danger" style="min-height:1.5em;"></span>
                </div>
            </div>
        </div>
    </div>`;

    return tmpl.repeat(repeat);
}

const tmplTodoListsItem = (id, name) => {
    return `<div class="col-12">
        <div class="d-flex">
            <div class="flex-grow-1" style="min-width: 0;">
                <div data-id="${id}" class="list text-secondary border rounded d-flex align-items-center px-2 h-100">
                    <i class="bi bi-caret-right-fill me-2"></i>
                    <p class="mb-0 text-truncate">${name}</p>
                </div>
            </div>
            <button data-id="${id}" type="button" class="todoListDelete btn btn-danger ms-2">
                <i class="bi bi-trash-fill"></i>
            </button>
        </div>
    </div>`;
}

const tmplTodosHeaderPlaceholder = () => {
    return `<div class="row">
        <div class="col-6">
            <div class="placeholder-glow">
                <span class="placeholder col-12 rounded bg-secondary" style="min-height:2em;"></span>
            </div>
        </div>
        <div class="col-3 offset-3">
            <div class="placeholder-glow">
                <span class="placeholder col-12 rounded bg-secondary" style="min-height:2em;"></span>
            </div>
        </div>
    </div>`;
}

const tmplTodosHeader = (name, status) => {
    return `<div class="d-flex justify-content-between">
        <h2 class="text-secondary mb-0">${name}</h2>
        <div class="dropdown">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button"data-bs-toggle="dropdown">
                <i class="bi bi-gear-fill"></i>
            </button>
            <ul class="dropdown-menu">
                <li>
                    <a id="btnAllTodoDelete" class="dropdown-item text-danger ${(status) ? true : 'disabled'}" href="#">
                        <i class="bi bi-trash-fill me-2"></i>Delete all todos
                    </a>
                </li>
            </ul>
        </div>
    </div>`;
}

const tmplTodosAddTodoPlaceholder = () => {
    return `<div class="placeholder-glow">
        <span class="placeholder col-12 rounded bg-primary" style="min-height:2em;"></span>
    </div>`;
}

const tmplTodosAddTodo = () => {
    return `<button type="button" id="btnAddTodo" class="btn btn-primary w-100">
        <i class="bi bi-plus-lg me-2"></i>Add Todo
    </button>
    <div class="alerts"></div>`;
}

const tmplTodosItemPlaceholder = repeat => {
    let tmpl = `<div class="col-12">
        <div class="row g-2">
            <div class="col-9">
                <div class="placeholder-glow">
                    <span class="placeholder col-12 rounded bg-secondary" style="min-height:1.5em;"></span>
                </div>
            </div>
            <div class="col">
                <div class="placeholder-glow">
                    <span class="placeholder col-12 rounded bg-success" style="min-height:1.5em;"></span>
                </div>
            </div>
            <div class="col">
                <div class="placeholder-glow">
                    <span class="placeholder col-12 rounded bg-danger" style="min-height:1.5em;"></span>
                </div>
            </div>
        </div>
    </div>`;

    return tmpl.repeat(repeat);
}

const tmplTodosItem = (id, value, status) => {
    return `<div class="col-12">
        <div class="d-flex">
            <div class="flex-grow-1" style="min-width: 0;">
                <div data-id="${id}" class="todo text-secondary border rounded d-flex align-items-center px-2 h-100">
                    ${(status) ? '<i class="bi bi-check-circle-fill me-2 text-success"></i>' : '<i class="bi bi-circle me-2"></i>'}
                    <p class="mb-0 text-truncate">${value}</p>
                </div>
            </div>
            <button data-id="${id}" type="button" class="todoEdit btn btn-success ms-2">
                <i class="bi bi-pencil-square"></i>
            </button>
            <button data-id="${id}" type="button" class="todoDelete btn btn-danger ms-2">
                <i class="bi bi-trash-fill"></i>
            </button>
        </div>
    </div>`;
}
//-- -

//-- +
//--fonksiyonlar
//--dizinin eleman sayısının sıfırdan büyük olup olmadığının kontrolü
const arrayGreaterThanZero = array => (array.length > 0) ? true : false;

//--dizinin son elemanının index değerini alıyoruz
const arrayLastID = array => array.length - 1;

//--todoList dizisini localStorage'e kaydediyoruz
const saveTodoList = () => localStorage.setItem('todoLists', JSON.stringify(todoLists));

//--
const element = target => {

    $.each(todoLists[lastID].todos, function(id, row){

        $(target).prepend(tmplTodosItem(id, row.value, row.status));

    });

}

//--genel render işlemini yapan fonksiyon
const render = () => {

    //--ilk olarak bütün gerekli alanları temizliyoruz
    $('#createTodoList main .alerts').empty();
    $('#todoLists header').empty();
    $('#todoLists main .row').empty();
    $('#todos header').empty();
    $('#todos #addTodo').empty();
    $('#todos main .row').empty();

    //--dizinin eleman sayısına göre gerekli alanlarda işlemler yapıyoruz
    if(arrayGreaterThanZero(todoLists))
    {
        //--dizinin içerisinde başlangıçta eleman var ise
        $('#todoLists header').html(tmplTodoListsHeader(true));

        $.each(todoLists, function (id, row) {

            $('#todoLists main .row').prepend(tmplTodoListsItem(id, row.name));
    
        });

        $('#todos header').html(tmplTodosHeader(todoLists[lastID].name, arrayGreaterThanZero(todoLists[lastID].todos)));

        $('#todos #addTodo').html(tmplTodosAddTodo());

        (arrayGreaterThanZero(todoLists[lastID].todos)) ? true : $('#todos #addTodo .alerts').html(tmplAlert('<b>Hint:</b> Todo not found !!! Please add todo.'));

        (arrayGreaterThanZero(todoLists[lastID].todos)) ? element('#todos main .row') : $('#todos main .row').html(tmplTodosItemPlaceholder(5));
    }
    else
    {
        //--dizinin içerisinde başlangıçta eleman yok ise
        $('#createTodoList main .alerts').html(tmplAlert('<b>Hint:</b> Todo list not found !!! Please create a new todo list.'));
        
        $('#todoLists header').html(tmplTodoListsHeader(false));
       
        $('#todoLists main .row').html(tmplTodoListsItemPlaceholder(5));

        $('#todos header').html(tmplTodosHeaderPlaceholder());

        $('#todos #addTodo').html(tmplTodosAddTodoPlaceholder());

        $('#todos main .row').html(tmplTodosItemPlaceholder(5));
    }

}
//-- -

//-- +
//--Sayfa hazır olduğunda yapılacak işlemler
$(document).ready(function () {

    todoLists = JSON.parse(localStorage.getItem('todoLists')) || [];

    lastID = arrayLastID(todoLists);

    render();

});
//-- -

//-- +
//--Yapılacaklar listesi oluştur butonuna tıklandığında yapılacak işlemler
$('#btnCreateTodoList').click(function () {

    //--Yapılacaklar listesinin adının bulunacağı input seçiliyor
    let todoListName = $('#todoListName');

    //--İsim değeri alınıyor
    let getName = todoListName.val();

    //--İnput'un boş olup olmadığı kontrol ediliyor
    if (getName.length === 0) {

        //--boş ise

        alert('You need to enter name !!!');

    }
    else 
    {

        //--boş değil ise

        //--Yukarda input'un değerini daha öncesinde değişkene aktardığımız için input'u temizliyoruz
        todoListName.val('');

        /*--Yapılacak listelerine yeni bir liste ekliyoruz, bunun için isim değerini kullanıyoruz ve 
        yapılacak maddelerin bulunacağı boş diziyi ekliyoruz*/
        todoLists.push({ name: getName, todos: [] });

        //--localStorage'deki todoLists değişkenini güncelliyoruz
        saveTodoList();

        lastID = arrayLastID(todoLists);

        render();

    }

});
//-- -

//-- +
//--
$(document).on('click', '#btnAddTodo', function(){

    modalAddTodo.show();

});
//-- -

//-- +
//--
$('#btnModalAddTodo').click(function(){

    let getValue = $('#inputTodo').val();

    todoLists[lastID].todos.push({value: getValue, status: false});

    saveTodoList();

    render();

    modalAddTodo.hide();

});
//-- -

//-- +
//--
document.getElementById('modalAddTodo').addEventListener('hidden.bs.modal', function (event) {
    
    $('#inputTodo').val('');

});
//-- -

//-- +
//--
$(document).on('click', '.list', function(){

    lastID = $(this).attr('data-id');

    render();

})
//-- -

//-- +
//--
$(document).on('click', '.todo', function(){

    let ID = $(this).attr('data-id');

    (todoLists[lastID].todos[ID].status) ? todoLists[lastID].todos[ID].status = false : todoLists[lastID].todos[ID].status = true;

    saveTodoList();
    
    render();

});
//-- -

//-- +
//--
$(document).on('click', '.todoDelete', function(){

    let ID = $(this).attr('data-id');

    todoLists[lastID].todos.splice(ID, 1);

    saveTodoList();
    
    render();

});
//-- -

//-- +
//--
$(document).on('click', '.todoListDelete', function(){

    let ID = $(this).attr('data-id');

    todoLists.splice(ID, 1);

    saveTodoList();

    lastID = arrayLastID(todoLists);
    
    render();

});
//-- -

//-- +
//--
$(document).on('click', '#btnAllListDelete', function(e){

    e.preventDefault();

    todoLists = [];

    saveTodoList();

    render();

});
//-- -

//-- +
//--
$(document).on('click', '#btnAllTodoDelete', function(e){

    e.preventDefault();

    todoLists[lastID].todos = [];

    saveTodoList();

    render();

});
//-- -