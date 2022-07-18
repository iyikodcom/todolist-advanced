//-- +
//--global değişkenler
let todoLists;
let listID = 0;
let getTodoValue, getTodoID;
//-- -

//-- +
//--modallar
//--todo ekleme işleminin yapılacağı modal
let modalAddTodo = new bootstrap.Modal(document.getElementById('modalAddTodo'));
let modalDetailsTodo = new bootstrap.Modal(document.getElementById('modalDetailsTodo'));
let modalImportTodoLists = new bootstrap.Modal(document.getElementById('modalImportTodoLists'));
let modalExportTodoLists = new bootstrap.Modal(document.getElementById('modalExportTodoLists'));
//-- -

//-- +
//--offcanvaslar
//--todoLists'in mobil versiyonun bulunduğu offcanvas
let offcanvasTodoListsMobile = new bootstrap.Offcanvas(document.getElementById('offcanvasTodoLists'));
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
    
    $('#modalAddTodo .modal-body').empty();
    $('#modalDetailsTodo .modal-body').empty();
    $('#modalImportTodoLists .modal-body').empty();
    $('#modalImportTodoLists .modal-body').empty();

    //--herhangi bir koşula bağlı olmayan alanları ekliyoruz
    $('#todoListsMobileMenuButton').html(tmpltodoListsMobileMenuButton());
    $('#modalAddTodo .modal-body').html(tmplModalAddTodo());
    $('#modalDetailsTodo .modal-body').html(tmplModalDetailsTodo(getTodoID, getTodoValue));
    $('#modalImportTodoLists .modal-body').html(tmplModalImportTodoLists());

    //--dizinin eleman sayısına göre gerekli alanlarda işlemler yapıyoruz
    //--dizinin içerisinde başlangıçta eleman var ise
    if(arrayGreaterThanZero(todoLists))
    {
        $('.todoLists header').html(tmplTodoListsHeader(true));

        targetAddItems('todoList');

        $('#todos header').html(tmplTodosHeader(todoLists[listID].name, arrayGreaterThanZero(todoLists[listID].todos)));

        $('#todos #addTodo').html(tmplTodosAddTodo());

        (arrayGreaterThanZero(todoLists[listID].todos)) ? true : $('#todos #addTodo .alerts').html(tmplAlert('alert-info', '<b>Hint:</b> Todo not found !!! Please add todo.'));

        (arrayGreaterThanZero(todoLists[listID].todos)) ? targetAddItems('todos') : $('#todos main .row').html(tmplTodosItemPlaceholder(5));
    }
    //--dizinin içerisinde başlangıçta eleman yok ise
    else
    {
        
        $('#createTodoList main .alerts').html(tmplAlert('alert-info', '<b>Hint:</b> Todo list not found !!! Please create a new todo list.'));
        
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
//--yapılacaklar listesi oluştur butonuna tıklandığında yapılacak işlemler
$('#btnCreateTodoList').click(function () {

    //--yapılacaklar listesinin adının bulunacağı input seçiliyor
    let todoListName = $('#inputTodoListName');
    //--isim değeri alınıyor
    let getName = todoListName.val();
    //--input'un boş olup olmadığı kontrol ediliyor
    //--boş ise
    if (getName.length === 0) {

        //--input'a "border-danger" class'ı ekliyoruz
        $('#inputTodoListName').addClass('border-danger');
        //--"alerts" alanına alert ekliyoruz
        $('#createTodoList main .alerts').prepend(tmplAlert('alert-danger', '<b>Alert:</b> You need to enter todolist\'s name !!!'));

    }
    //--dolu ise
    else 
    {
        //--input'a eklenmiş "border-danger" class'ı var ise onu siliyoruz
        $('#inputTodoListName').removeClass('border-danger');
        //--input'u temizliyoruz
        todoListName.val('');
        /*--Yapılacak listelerine yeni bir liste ekliyoruz, bunun için isim değerini kullanıyoruz ve 
        yapılacak maddelerin bulunacağı boş diziyi ekliyoruz*/
        todoLists.push({ name: getName, todos: [] });
        //--localStorage'deki todoLists değişkenini güncelliyoruz
        saveTodoList();
        //--todoLists dizisinin son elemanının index değeri alınıyor
        listID = arrayLastID(todoLists);
        //--render işlemi gerçekleştiriyor
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
$(document).on('click', '#btnModalAddTodo', function(){

    //--yapılacak maddesinin değerinin bulunduğu inputu seçiyoruz
    let input = $('#inputAddTodo');
    //--değeri alıyoruz
    let getValue = input.val();
    //--"alerts" alanını temizliyoruz, her bu butona tıkladığımızda hata mesajı basabilir
    $('#modalAddTodo .modal-body .alerts').empty();
    //--input'un boş olup olmadığı kontrol ediliyor
    //--boş ise
    if (getValue.length === 0) {

        //--input'a "border-danger" class'ı ekliyoruz
        input.addClass('border-danger');
        //--"alerts" alanına alert ekliyoruz
        $('#modalAddTodo .modal-body .alerts').prepend(tmplAlert('alert-danger', '<b>Alert:</b> Enter todo !!!'));

    }
    //--dolu ise
    else 
    {
        //--input'a eklenmiş "border-danger" class'ı var ise onu siliyoruz
        input.removeClass('border-danger');
        //--value ve status değerleri todoLists değişkenine ekleniyor
        todoLists[listID].todos.push({value: getValue, status: false});
        //--localStorage'deki todoLists değişkenini güncelliyoruz
        saveTodoList();
        //--render işlemi gerçekleştiriyor
        render();
        //--modal kapanıyor
        modalAddTodo.hide();

    }

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

//-- +
//--".list", ".todo", ".lang" classlarında mouseover ve mouseout olayları gerçekleştiğinde yapılacak işlemler
$(document).on('mouseover', '.list, .todo', function(){

    $(this).addClass('bg-light');

}).on('mouseout', '.list, .todo', function(){

    $(this).removeClass('bg-light');

});
//-- -

//-- +
//--"modalAddTodo" modalları kapandığında yapılacak olan işlemler
$(document).on('hidden.bs.modal', '#modalAddTodo, #modalDetailsTodo, #modalImportTodoLists', function () {
    //--render işlemi gerçekleştiriyor
    render();
})
//-- -

//-- +
/*--"todos > main" alanında bulunan her elemanın sahip olduğu 
"todoDetails" classına sahip elemanlara tıklayınca yapılacak işlemler--*/
$(document).on('click', '.todoDetails', function(){

    //--elemanın data-id attribute'ü getTodoID değişkenine eşitleniyor
    getTodoID = $(this).attr('data-id');
    //--todoLists'in içersinde todos'lardan id'si bilinen todo'nun değeri alınıyor
    getTodoValue = todoLists[listID].todos[getTodoID].value;
    //--render işlemi gerçekleştiriyor
    //--burada render işlemi yapıyoruz ki modal'ın içersine getTodoID ve getTodoValue değerlerini aktarabilelim
    render();
    //--modal açılıyor
    modalDetailsTodo.show();

});
//-- -

//-- +
//--"modalDetailsTodo" üzerinde bulunan "Update" butonuna tıklayınca yapılacak işlemler
$(document).on('click', '#btnModalUpdateTodo', function(){

    //--yapılacak maddesinin değerinin bulunduğu inputu seçiyoruz
    let input = $('#inputUpdateTodo');
    //--değeri alıyoruz
    let getValue = input.val();
    //--"alerts" alanını temizliyoruz, her bu butona tıkladığımızda hata mesajı basabilir
    $('#modalDetailsTodo .modal-body .alerts').empty();
    //--input'un boş olup olmadığı kontrol ediliyor
    //--boş ise
    if (getValue.length === 0) {

        //--input'a "border-danger" class'ı ekliyoruz
        input.addClass('border-danger');
        //--"alerts" alanına alert ekliyoruz
        $('#modalDetailsTodo .modal-body .alerts').prepend(tmplAlert('alert-danger', '<b>Alert:</b> Enter todo !!!'));

    }
    //--dolu ise
    else 
    {
        //--input'a eklenmiş "border-danger" class'ı var ise onu siliyoruz
        input.removeClass('border-danger');
        //--input'daki değeri "todoList > todos > value" doğru konumdaki value'nin değerini güncelliyoruz
        todoLists[listID].todos[getTodoID].value = getValue;
        //--localStorage'deki todoLists değişkenini güncelliyoruz
        saveTodoList();
        //--render işlemi gerçekleştiriyor
        render();
        //--modal kapanıyor
        modalDetailsTodo.hide();

    }

});
//-- -

//-- +
//--"btnImportTodoLists" id'sine tıklayınca yapılacak işlemler
$(document).on('click', '.btnImportTodoLists', function(e){

    //--yapılacak işlem engelleniyor
    e.preventDefault();
    //--modal açılıyor
    modalImportTodoLists.show();

});
//-- -

//-- +
//--
$(document).on('click', '.btnExportTodoLists', function(e){

    //--yapılacak işlem engelleniyor
    e.preventDefault();
    //--modal açılıyor
    modalExportTodoLists.show();

});
//-- -