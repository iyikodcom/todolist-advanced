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
$(document).on('click', '#btnCreateTodoList', function () {

    //--yapılacaklar listesinin adının bulunacağı input seçiliyor
    let input = $('#inputTodoListName');
    //--isim değeri alınıyor
    let getName = input.val();
    //--render işlemi gerçekleştiriyor
    render();
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
        $('#inputTodoListName').val('');
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
    
    //--"data-type" attribute'ndeki değer modalType değişkenine eşitleniyor
    modalType = $(this).attr('data-type');
    //--render işlemi gerçekleştiriyor
    //--burada render işlemi yapıyoruz ki modal'ın içersine modalType değerini aktarabilelim
    render();
    //--modal açılıyor
    modal.show();

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
    $('.modal .alerts').empty();
    //--input'un boş olup olmadığı kontrol ediliyor
    //--boş ise
    if (getValue.length === 0) {

        //--input'a "border-danger" class'ı ekliyoruz
        input.addClass('border-danger');
        //--"alerts" alanına alert ekliyoruz
        $('.modal .alerts').prepend(tmplAlert('alert-danger', '<b>Alert:</b> Enter todo !!!'));

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
        modal.hide();

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
$(document).on('hidden.bs.modal', '.modal', function () {
    //--render işlemi gerçekleştiriyor
    render();
})
//-- -

//-- +
/*--"todos > main" alanında bulunan her elemanın sahip olduğu 
"todoDetails" classına sahip elemanlara tıklayınca yapılacak işlemler--*/
$(document).on('click', '.todoDetails', function(){

    //--"data-type" attribute'ndeki değer modalType değişkenine eşitleniyor
    modalType = $(this).attr('data-type');
    //--elemanın data-id attribute'ü getTodoID değişkenine eşitleniyor
    getTodoID = $(this).attr('data-id');
    //--todoLists'in içersinde todos'lardan id'si bilinen todo'nun değeri alınıyor
    getTodoValue = todoLists[listID].todos[getTodoID].value;
    //--render işlemi gerçekleştiriyor
    //--burada render işlemi yapıyoruz ki modal'ın içersine modalType, getTodoID ve getTodoValue değerlerini aktarabilelim
    render();
    //--modal açılıyor
    modal.show();

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
    $('.modal .alerts').empty();
    //--input'un boş olup olmadığı kontrol ediliyor
    //--boş ise
    if (getValue.length === 0) {

        //--input'a "border-danger" class'ı ekliyoruz
        input.addClass('border-danger');
        //--"alerts" alanına alert ekliyoruz
        $('.modal .alerts').prepend(tmplAlert('alert-danger', '<b>Alert:</b> Enter todo !!!'));

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
        modal.hide();

    }

});
//-- -

//-- +
//--"btnImportTodoLists" classına tıklayınca yapılacak işlemler
$(document).on('click', '.btnImportTodoLists', function(e){

    //--yapılacak işlem engelleniyor
    e.preventDefault();
    //--"data-type" attribute'ndeki değer modalType değişkenine eşitleniyor
    modalType = $(this).attr('data-type');
    //--render işlemi gerçekleştiriyor
    //--burada render işlemi yapıyoruz ki modal'ın içersine modalType değerini aktarabilelim
    render();
    //--modal açılıyor
    modal.show();

});
//-- -

//-- +
//--"btnModalImport" id'sine tıklandığında yapılacak işlemler
$(document).on('click', '#btnModalImport', function(){

    //--JSON formatında içeriğin ekleneceği inputu seçiyoruz
    let input = $('#inputImportTodoLists');
    //--değeri alıyoruz
    let getValue = input.val();
    //--"alerts" alanını temizliyoruz, her bu butona tıkladığımızda hata mesajı basabilir
    $('.modal .alerts').empty();
    //--input'un boş olup olmadığı kontrol ediliyor
    //--boş ise
    if (getValue.length === 0) {

        //--input'a "border-danger" class'ı ekliyoruz
        input.addClass('border-danger');
        //--"alerts" alanına alert ekliyoruz
        $('.modal .alerts').prepend(tmplAlert('alert-danger', '<b>Alert:</b> Enter JSON !!!'));

    }
    //--dolu ise
    else 
    {
        try {

            //--input'tan alınan değeri JSON formatına çeviriyoruz
            let JSON = $.parseJSON(getValue);
            //--input'a eklenmiş "border-danger" class'ı var ise onu siliyoruz
            input.removeClass('border-danger');
            //--import edilen todolist'deki elemanları döngü yardımı ile todoLists değişkenine aktarıyoruz
            $.each(JSON, function(index, row){
                //--her elemanı tektek todolist'e ekliyoruz
                todoLists.push(row);

            });
            //--todoLists dizisinin son elemanının index değeri alınıyor
            listID = arrayLastID(todoLists);
            //--localStorage'deki todoLists değişkenini güncelliyoruz
            saveTodoList();
            //--render işlemi gerçekleştiriyor
            render();
            //--modal kapanıyor
            modal.hide();

        }
        catch (err) 
        {
            //--input'a "border-danger" class'ı ekliyoruz
            input.addClass('border-danger');
            //--"alerts" alanına alert ekliyoruz
            $('.modal .alerts').prepend(tmplAlert('alert-danger', '<b>Alert:</b> JSON format is incorrect !!!'));

        }

    }

});
//-- -

//-- +
//--"btnExportTodoLists" classına tıklayınca yapılacak işlemler
$(document).on('click', '.btnExportTodoLists', function(e){

    //--yapılacak işlem engelleniyor
    e.preventDefault();
    //--"data-type" attribute'ndeki değer modalType değişkenine eşitleniyor
    modalType = $(this).attr('data-type');    
    //--render işlemi gerçekleştiriyor
    //--burada render işlemi yapıyoruz ki modal'ın içersine modalType değerini aktarabilelim
    render();
    //--JSON formatındaki todoLists değişkenini düz metine çevirerek dışarıya çıktı veriyoruz
    $('#inputExportTodoLists').html(JSON.stringify(todoLists));
    //--modal açılıyor
    modal.show();

});
//-- -