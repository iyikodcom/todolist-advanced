//-- +
//--global değişkenler
let todoLists;
let listID = 0;
//-- -

//-- +
//--modallar
//--todo ekleme işleminin yapılacağı modal
let domAddTodo = document.getElementById('modalAddTodo');
let modalAddTodo = new bootstrap.Modal(domAddTodo);
//-- -

//-- +
//--offcanvaslar
//--todoLists'in mobil versiyonun bulunduğu offcanvas
let domTodoListsMobile = document.getElementById('offcanvasTodoLists')
let offcanvasTodoListsMobile = new bootstrap.Offcanvas(domTodoListsMobile)
//-- -

//-- +
//--şablonlar
//--"createTodoList" ve "todos" alanlarında kullanılan alert şablonu
const tmplAlert = message => {
    return `<div class="alert alert-info mb-0 mt-3" role="alert">
        ${message}
    </div>`;
}
//--"todoLists > header" alanında kullanılan şablonu
const tmplTodoListsHeader = status => {
    return `<div class="d-flex justify-content-between">
        <h2 class="text-secondary mb-0">Todo Lists</h2>
        <div>
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
                        <a class="dropdown-item text-primary ${(status) ? '' : 'disabled'}" href="#">
                            <i class="bi bi-download me-2"></i>Export
                        </a>
                    </li>
                    <li>
                        <a class="btnAllListDelete dropdown-item text-danger ${(status) ? '' : 'disabled'}" href="#">
                            <i class="bi bi-trash-fill me-2"></i>Delete all lists
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>`;
}
//--"todoLists > main" alanına eklenecek eleman placeholder şablonu
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
//--"todoLists > main" alanına eklenecek eleman şablonu
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
//--"todos > header" alanına eklenecek header placeholder şablonu
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
//--"todos > header" alanına eklenecek header şablon
const tmplTodosHeader = (name, status) => {
    return `<div class="d-flex justify-content-between">
        <h2 class="text-secondary mb-0">${name}</h2>
        <div class="dropdown">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button"data-bs-toggle="dropdown">
                <i class="bi bi-gear-fill"></i>
            </button>
            <ul class="dropdown-menu">
                <li>
                    <a id="btnAllTodoDelete" class="dropdown-item text-danger ${(status) ? '' : 'disabled'}" href="#">
                        <i class="bi bi-trash-fill me-2"></i>Delete all todos
                    </a>
                </li>
            </ul>
        </div>
    </div>`;
}
//--"todos > todoAdd" alanına eklenecek placeholder şablonu
const tmplTodosAddTodoPlaceholder = () => {
    return `<div class="placeholder-glow">
        <span class="placeholder col-12 rounded bg-primary" style="min-height:2em;"></span>
    </div>`;
}
//--"todos > todoAdd" alanına eklenecek şablon
const tmplTodosAddTodo = () => {
    return `<button type="button" id="btnAddTodo" class="btn btn-primary w-100">
        <i class="bi bi-plus-lg me-2"></i>Add Todo
    </button>
    <div class="alerts"></div>`;
}
//--"todos > main" alanına eklenecek eleman placeholder şablonu
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
//--"todos > main" alanına eklenecek eleman şablonu
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
//--"offcanvasTodoLists" offcanvas'ını açan butonun şablonu
const tmpltodoListsMobileMenuButton = () => {
    return `<button type="button" class="btn btn-outline-secondary btn-lg border-0 w-100">
        <h2 class="mb-0">
            <i class="bi bi-list me-2"></i>Todo Lists
        </h2>
    </button>`;
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

//--todoList ve todos alanına uygun olan elemanları eklemek için gerekli olan fonksiyon
const targetAddItems = type => {

    if(type === 'todoList'){

        $.each(todoLists, function (id, row) {

            $('.todoLists main .row').prepend(tmplTodoListsItem(id, row.name));
    
        });

    }
    else if(type === 'todos'){

        $.each(todoLists[listID].todos, function(id, row){

            $('#todos main .row').prepend(tmplTodosItem(id, row.value, row.status));
    
        });

    }

}

//--genel render işlemini yapan fonksiyon
const render = () => {

    //--ilk olarak bütün gerekli alanları temizliyoruz
    $('#createTodoList main .alerts').empty();
    $('.todoLists header').empty();
    $('.todoLists main .row').empty();
    $('#todos header').empty();
    $('#todos #addTodo').empty();
    $('#todos main .row').empty();
    $('#todoListsMobileMenuButton').empty();

    //--herhangi bir koşula bağlı olmayan alanları ekliyoruz
    $('#todoListsMobileMenuButton').html(tmpltodoListsMobileMenuButton());

    //--dizinin eleman sayısına göre gerekli alanlarda işlemler yapıyoruz
    //--dizinin içerisinde başlangıçta eleman var ise
    if(arrayGreaterThanZero(todoLists))
    {
        $('.todoLists header').html(tmplTodoListsHeader(true));

        targetAddItems('todoList');

        $('#todos header').html(tmplTodosHeader(todoLists[listID].name, arrayGreaterThanZero(todoLists[listID].todos)));

        $('#todos #addTodo').html(tmplTodosAddTodo());

        (arrayGreaterThanZero(todoLists[listID].todos)) ? true : $('#todos #addTodo .alerts').html(tmplAlert('<b>Hint:</b> Todo not found !!! Please add todo.'));

        (arrayGreaterThanZero(todoLists[listID].todos)) ? targetAddItems('todos') : $('#todos main .row').html(tmplTodosItemPlaceholder(5));
    }
    //--dizinin içerisinde başlangıçta eleman yok ise
    else
    {
        
        $('#createTodoList main .alerts').html(tmplAlert('<b>Hint:</b> Todo list not found !!! Please create a new todo list.'));
        
        $('.todoLists header').html(tmplTodoListsHeader(false));
       
        $('.todoLists main .row').html(tmplTodoListsItemPlaceholder(5));

        $('#todos header').html(tmplTodosHeaderPlaceholder());

        $('#todos #addTodo').html(tmplTodosAddTodoPlaceholder());

        $('#todos main .row').html(tmplTodosItemPlaceholder(5));
    }

}
//-- -

//-- +
//--Sayfa hazır olduğunda yapılacak işlemler
$(document).ready(function () {

    //--localStorage'de todoLists adında bir değişken var mı yoksa dizi değişkene eşitleniyor
    todoLists = JSON.parse(localStorage.getItem('todoLists')) || [];
    //--todoLists dizisinin son elemanının index değeri alınıyor
    listID = arrayLastID(todoLists);
    //--render işlemi gerçekleştiriyor
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

        listID = arrayLastID(todoLists);

        render();

    }

});
//-- -

//-- +
//--"todos" alanındaki "Add Todo" butonuna tıklayınca yapılacak işlemler
$(document).on('click', '#btnAddTodo', function(){
    
    //--modal açılıyor
    modalAddTodo.show();

});
//-- -

//-- +
//--"modalAddTodo" üzerinde bulunan "Add" butonuna tıklayınca yapılacak işlemler
$('#btnModalAddTodo').click(function(){

    //--inputTodo'nun değeri alınıyor
    let getValue = $('#inputTodo').val();
    //--value ve status değerleri todoLists değişkenine ekleniyor
    todoLists[listID].todos.push({value: getValue, status: false});
    //--localStorage'deki todoLists değişkenini güncelliyoruz
    saveTodoList();
    //--render işlemi gerçekleştiriyor
    render();
    //--modal kapanıyor
    modalAddTodo.hide();

});
//-- -

//-- +
//--"modalAddTodo" kapandığında yapılacak işlemler
domAddTodo.addEventListener('hidden.bs.modal', function (event) {
    //--inputTodo'nun içerdiği değer siliniyor
    $('#inputTodo').val('');

});
//-- -

//-- +
//--"todoLists > main" alanında bulunan "list" classına sahip elemanlara tıklayınca yapılacak işlemler
$(document).on('click', '.list', function(){

    //--elemanın data-id attribute'ü listID değişkenine eşitleniyor
    listID = $(this).attr('data-id');
    //--render işlemi gerçekleştiriyor
    render();

})
//-- -

//-- +
//--"todos > main" alanında bulunan "todo" classına sahip elemanlara tıklayınca yapılacak işlemler
$(document).on('click', '.todo', function(){

    //--elemanın data-id attribute'ü todoID değişkenine eşitleniyor
    let todoID = $(this).attr('data-id');
    //--elemanın todoList'deki status değeri true ise false, false ise true yapılıyor
    (todoLists[listID].todos[todoID].status) ? todoLists[listID].todos[todoID].status = false : todoLists[listID].todos[todoID].status = true;
    //--localStorage'deki todoLists değişkenini güncelliyoruz
    saveTodoList();
    //--render işlemi gerçekleştiriyor
    render();

});
//-- -

//-- +
/*--"todos > main" alanında bulunan her elemanın sahip olduğu 
"todoDelete" classına sahip elemanlara tıklayınca yapılacak işlemler--*/
$(document).on('click', '.todoDelete', function(){

    //--elemanın data-id attribute'ü todoID değişkenine eşitleniyor
    let todoID = $(this).attr('data-id');
    //--todoLists'de todoID'si olan eleman siliniyor
    todoLists[listID].todos.splice(todoID, 1);
    //--localStorage'deki todoLists değişkenini güncelliyoruz
    saveTodoList();
    //--render işlemi gerçekleştiriyor
    render();

});
//-- -

//-- +
/*--"todoLists > main" alanında bulunan her elemanın sahip olduğu 
"todoListDelete" classına sahip elemanlara tıklayınca yapılacak işlemler--*/
$(document).on('click', '.todoListDelete', function(){

    //--elemanın data-id attribute'ü todoListID değişkenine eşitleniyor
    let todoListID = $(this).attr('data-id');
    //--todoLists'de todoListID'si olan eleman siliniyor
    todoLists.splice(todoListID, 1);
    //--localStorage'deki todoLists değişkenini güncelliyoruz
    saveTodoList();
    //--todoLists dizisinin son elemanının index değeri alınıyor
    listID = arrayLastID(todoLists);
    //--render işlemi gerçekleştiriyor
    render();

});
//-- -

//-- +
//--"btnAllListDelete" class'ına tıklayınca yapılacak işlemler
$(document).on('click', '.btnAllListDelete', function(e){

    //--yapılacak işlem engelleniyor
    e.preventDefault();
    //--todoLists dizi değişkeni boş dizi değişkene eşitlenerek içerisindeki tüm değerler siliniyor
    todoLists = [];
    //--localStorage'deki todoLists değişkenini güncelliyoruz
    saveTodoList();
    //--render işlemi gerçekleştiriyor
    render();

});
//-- -

//-- +
//--"btnAllTodoDelete" id'sine tıklayınca yapılacak işlemler
$(document).on('click', '#btnAllTodoDelete', function(e){

    //--yapılacak işlem engelleniyor
    e.preventDefault();
    /*--todoLists dizi değişkeninin içersindeki bir elemanın 
    todos dizi değişkeni boş dizi değişkene eşitlenerek içerisindeki tüm değerler siliniyor--*/
    todoLists[listID].todos = [];
    //--localStorage'deki todoLists değişkenini güncelliyoruz
    saveTodoList();
    //--render işlemi gerçekleştiriyor
    render();

});
//-- -

//-- +
//--"todoListsMobileMenuButton" butonuna tıklayınca yapılacak işlemler
$(document).on('click', '#todoListsMobileMenuButton button', function(){

    //--offcanvas açılıyor
    offcanvasTodoListsMobile.show();

});
//-- -

//-- +
//--"offcanvasTodoLists > offcanvas-body > list" class'ına tıklayınca yapılacak işlemler
$(document).on('click', '#offcanvasTodoLists .offcanvas-body .list', function(){

    //--offcanvas kapanıyor
    offcanvasTodoListsMobile.hide();

});
//-- -