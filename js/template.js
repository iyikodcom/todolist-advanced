//-- +
//--şablonlar
//--"createTodoList" ve "todos" alanlarında kullanılan alert şablonu
const tmplAlert = (className, message) => {
    return `<div class="alert ${className} mb-0 mt-3" role="alert">
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
                <ul class="dropdown-menu p-0 overflow-hidden">
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
    return `<div class="d-flex">
        <div class="flex-grow-1" style="min-width: 0;">
            <h2 class="text-secondary mb-0 text-truncate">${name}</h2>
        </div>
        <div class="dropdown">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button"data-bs-toggle="dropdown">
                <i class="bi bi-gear-fill"></i>
            </button>
            <ul class="dropdown-menu p-0 overflow-hidden">
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
//--"modalAddTodo" modal'ının şablonu
const tmplModalAddTodo = () => {
    return `<div class="d-flex pt-3 px-3">
        <h5 class="text-secondary flex-grow-1 mb-0">Add Todo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <hr/>
    <div class="px-3">
        <textarea class="form-control" id="inputTodo" rows="10" style="resize:none;"
        placeholder="Enter todo..."></textarea>
        <div class="alerts"></div>
    </div>
    <hr/>
    <div class="d-flex pb-3 px-3 justify-content-end">
        <button type="button" class="btn btn-primary me-2" id="btnModalAddTodo">
            <i class="bi bi-plus-lg me-2"></i>Add
        </button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            <i class="bi bi-x-lg me-2"></i>Close
        </button>
    </div>`;
}
//-- -