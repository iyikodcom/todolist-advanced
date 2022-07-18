//-- +
//--global değişkenler
let todoLists;
let listID = 0;
let modalType;
let getTodoValue, getTodoID;
let lang = localStorage.getItem('lang') || 'tr';
//-- -

//-- +
//--modallar
//--todo ekleme işleminin yapılacağı modal
//let modalAddTodo = new bootstrap.Modal(document.getElementById('modalAddTodo'));
let modal = new bootstrap.Modal(document.querySelector('.modal'));
//-- -

//-- +
//--offcanvaslar
//--todoLists'in mobil versiyonun bulunduğu offcanvas
let offcanvasTodoListsMobile = new bootstrap.Offcanvas(document.querySelector('.offcanvas'));
//-- -