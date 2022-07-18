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

//--hangi modal şablonun yükleneceğini belirleyen foksiyon
const modalTmpl = type => {

    return (type === 'add') ? tmplModalAddTodo() :
    (type === 'details') ? tmplModalDetailsTodo(getTodoID, getTodoValue) :
    (type === 'import') ? tmplModalImportTodoLists() :
    (type === 'export') ? tmplModalExportTodoLists() : false;

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
    $('.modal .modal-body').empty();

    //--herhangi bir koşula bağlı olmayan alanları ekliyoruz
    $('#createTodoList').html(tmplCreateTodoList());
    $('#todoListsMobileMenuButton').html(tmpltodoListsMobileMenuButton());
    $('.modal .modal-body').html(modalTmpl(modalType));

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