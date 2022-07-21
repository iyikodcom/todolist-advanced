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
const modalTmpl = () => {

    return (modalType === 'add') ? tmplModalAddTodo(languages[9][lang], languages[11][lang], languages[9][lang], languages[10][lang]) :
    (modalType === 'details') ? tmplModalDetailsTodo(getTodoID, getTodoValue, languages[12][lang], languages[11][lang], languages[13][lang], languages[10][lang]) :
    (modalType === 'import') ? tmplModalImportTodoLists(languages[4][lang], languages[14][lang], languages[4][lang], languages[10][lang]) :
    (modalType === 'export') ? tmplModalExportTodoLists(languages[5][lang], languages[10][lang]) : false;

}

//--sistemdeki dilleri ekrana basmak için gerekli olan fonksiyon
const targetAddFlags = () => {

    $.each(languageFlags, function(index, row){

        $('#languageFlags').append(tmplLangFlag(row.lang, row.src, lang));

    });

}

//--genel render işlemini yapan fonksiyon
const render = () => {

    //--ilk olarak bütün gerekli alanları temizliyoruz
    $('#languageFlags').empty();
    $('#createTodoList main .alerts').empty();
    $('.todoLists header').empty();
    $('.todoLists main .row').empty();
    $('#todos header').empty();
    $('#todos #addTodo').empty();
    $('#todos main .row').empty();
    $('#todoListsMobileMenuButton').empty();
    $('.modal .modal-body').empty();
    $('.offcanvas .offcanvas-header').empty();

    //--herhangi bir koşula bağlı olmayan alanları ekliyoruz
    targetAddFlags();
    $('#createTodoList').html(tmplCreateTodoList(languages[0][lang], languages[1][lang], languages[2][lang]));
    $('#todoListsMobileMenuButton').html(tmpltodoListsMobileMenuButton(languages[3][lang]));
    $('.modal .modal-body').html(modalTmpl());
    $('.offcanvas .offcanvas-header').html(tmpltodoListsMobileMenuCloseButton(languages[10][lang]));

    //--dizinin eleman sayısına göre gerekli alanlarda işlemler yapıyoruz
    //--dizinin içerisinde başlangıçta eleman var ise
    if(arrayGreaterThanZero(todoLists))
    {
        $('.todoLists header').html(tmplTodoListsHeader(true, languages[3][lang], languages[4][lang], languages[5][lang], languages[6][lang]));

        targetAddItems('todoList');

        $('#todos header').html(tmplTodosHeader(todoLists[listID].name, arrayGreaterThanZero(todoLists[listID].todos), languages[7][lang]));

        $('#todos #addTodo').html(tmplTodosAddTodo(languages[8][lang]));

        (arrayGreaterThanZero(todoLists[listID].todos)) ? true : $('#todos #addTodo .alerts').html(tmplAlert('alert-info', languages[16][lang]));

        (arrayGreaterThanZero(todoLists[listID].todos)) ? targetAddItems('todos') : $('#todos main .row').html(tmplTodosItemPlaceholder(5));
    }
    //--dizinin içerisinde başlangıçta eleman yok ise
    else
    {
        
        $('#createTodoList main .alerts').html(tmplAlert('alert-info', languages[15][lang]));
        
        $('.todoLists header').html(tmplTodoListsHeader(false, languages[3][lang], languages[4][lang], languages[5][lang], languages[6][lang]));
       
        $('.todoLists main .row').html(tmplTodoListsItemPlaceholder(5));

        $('#todos header').html(tmplTodosHeaderPlaceholder());

        $('#todos #addTodo').html(tmplTodosAddTodoPlaceholder());

        $('#todos main .row').html(tmplTodosItemPlaceholder(5));
    }

}
//-- -