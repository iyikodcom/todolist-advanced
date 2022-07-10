//-- +
//--global değişkenler
let todolists;
//-- -

//-- +
//--şablonlar
const tmplTodoListElement = (id, name) => {
    return `<a href="#" data-id="${id}" class="todolistElement list-group-item list-group-item-action text-secondary p-3">
        <i class="bi bi-caret-right-fill me-2"></i>${name}
    </a>`;
}

const tmplTodoListAlert = message => {
    return `<li class="list-group-item list-group-item-warning p-3">${message}</li>`;
}
//-- -

//-- +
//--Sayfa hazır olduğunda yapılacak işlemler
$(document).ready(function () {

    todolists = JSON.parse(localStorage.getItem('todolists')) || [];

    if (todolists.length > 0) {
        $.each(todolists, function (id, row) {

            $('.todolists').prepend(tmplTodoListElement(id, row.name));

        });
    }
    else
    {
        $('.todolists').append(tmplTodoListAlert('Todo list not found !!!'));
    }

});
//-- -

//-- +
//--Yapılacaklar listesi oluştur butonuna tıklandığında yapılacak işlemler
$('#createTodoList').click(function () {

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
        todolists.push({ name: getName, todos: [] });

        //--localStorage'deki todolists değişkenini güncelliyoruz
        localStorage.setItem('todolists', JSON.stringify(todolists));

        //--Yapılacak listelerinin bulunduğu alanı temizliyoruz
        $('.todolists').empty();

        //--Yapılacak listelerini tekrardan ekranda bulunması gereken yere sıralıyoruz
        $.each(todolists, function (id, row) {

            $('.todolists').prepend(tmplTodoListElement(id, row.name));

        });

    }

});
//-- -

//-- +
//--
$(document).on('click', '.todo', function(){

    let id = $(this).attr('data-id');
    let status = ($(this).attr('data-status') === 'true');

    (status) ? $(this).attr('data-status','false').find('i').removeClass('bi-check-circle-fill text-success').addClass('bi-circle') : $(this).attr('data-status','true').find('i').removeClass('bi-circle').addClass('bi-check-circle-fill text-success');

});
//-- -