//-- +
//--şablonlar
//--dil butonlarının şablonları
const tmplLangFlag = (lang, src, currentLang) => {
    return `<button data-lang="${lang}" type="button" class="flag btn btn-link py-0 px-1 ${(lang === currentLang) ? '' : 'passive'}">
        <img src="${src}" class="img-fluid rounded">
    </button>`;
}
//--"createTodoList" ve "todos" alanlarında kullanılan alert şablonu
const tmplAlert = (className, message) => {
    return `<div class="alert ${className} mb-0 mt-3" role="alert">
        ${message}
    </div>`;
}
//--"createTodoList" alanında kullanılan şablon
const tmplCreateTodoList = (title, placeholder, button) => {
    return `<header>
        <h1 class="text-secondary mb-0 text-truncate">${title}</h1>
    </header>
    <hr />
    <main>
        <div class="input-group input-group-lg">
            <input type="text" class="form-control" id="inputTodoListName"
                placeholder="${placeholder}">
            <button type="button" id="btnCreateTodoList" class="btn btn-primary">
                <i class="bi bi-plus-lg me-2"></i>${button}
            </button>
        </div>
        <div class="alerts"></div>
    </main>`;
}
//--"todoLists > header" alanında kullanılan şablonu
const tmplTodoListsHeader = (status, title, drp1, drp2, drp3) => {
    return `<div class="d-flex">
        <div class="flex-grow-1" style="min-width: 0;">
            <h2 class="text-secondary mb-0 text-truncate">${title}</h2>
        </div>
        <div>
            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i class="bi bi-gear-fill"></i>
                </button>
                <ul class="dropdown-menu p-0 overflow-hidden">
                    <li>
                        <a data-type="import" class="btnImportTodoLists dropdown-item text-primary" href="#">
                            <i class="bi bi-upload me-2"></i>${drp1}
                        </a>
                    </li>
                    <li>
                        <a data-type="export" class="btnExportTodoLists dropdown-item text-primary ${(status) ? '' : 'disabled'}" href="#">
                            <i class="bi bi-download me-2"></i>${drp2}
                        </a>
                    </li>
                    <li>
                        <a class="btnAllListDelete dropdown-item text-danger ${(status) ? '' : 'disabled'}" href="#">
                            <i class="bi bi-trash-fill me-2"></i>${drp3}
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
const tmplTodosHeader = (name, status, drp1) => {
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
                        <i class="bi bi-trash-fill me-2"></i>${drp1}
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
const tmplTodosAddTodo = button => {
    return `<button data-type="add" type="button" id="btnAddTodo" class="btn btn-primary w-100">
        <i class="bi bi-plus-lg me-2"></i>${button}
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
            <button data-id="${id}" data-type="details" type="button" class="todoDetails btn btn-success ms-2">
                <i class="bi bi-pencil-square"></i>
            </button>
            <button data-id="${id}" type="button" class="todoDelete btn btn-danger ms-2">
                <i class="bi bi-trash-fill"></i>
            </button>
        </div>
    </div>`;
}
//--"offcanvasTodoLists" offcanvas'ını açan butonun şablonu
const tmpltodoListsMobileMenuButton = button => {
    return `<button type="button" class="btn btn-outline-secondary btn-lg border-0 w-100">
        <h2 class="mb-0 text-truncate">
            <i class="bi bi-list me-2"></i>${button}
        </h2>
    </button>`;
}
//--"modalAddTodo" modal'ının şablonu
const tmplModalAddTodo = (title, placeholder, button1, button2) => {
    return `<div class="d-flex pt-3 px-3">
        <div class="flex-grow-1" style="min-width: 0;">
            <h5 class="text-secondary text-truncate mb-0">${title}</h5>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <hr/>
    <div class="px-3">
        <textarea class="form-control" id="inputAddTodo" rows="10" style="resize:none;"
        placeholder="${placeholder}"></textarea>
        <div class="alerts"></div>
    </div>
    <hr/>
    <div class="d-flex pb-3 px-3 justify-content-end">
        <button type="button" class="btn btn-primary me-2" id="btnModalAddTodo">
            <i class="bi bi-plus-lg me-2"></i>${button1}
        </button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            <i class="bi bi-x-lg me-2"></i>${button2}
        </button>
    </div>`;
}
//--"modalDetailsTodo" modal'ının şablonu
const tmplModalDetailsTodo = (id, value, title, placeholder, button1, button2) => {
    return `<div class="d-flex pt-3 px-3">
        <div class="flex-grow-1" style="min-width: 0;">
            <h5 class="text-secondary text-truncate mb-0">${title}</h5>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <hr/>
    <div class="px-3">
        <textarea class="form-control" id="inputUpdateTodo" rows="10" style="resize:none;"
        placeholder="${placeholder}">${value}</textarea>
        <div class="alerts"></div>
    </div>
    <hr/>
    <div class="d-flex pb-3 px-3 justify-content-end">
        <button data-id="${id}" type="button" class="btn btn-primary me-2" id="btnModalUpdateTodo">
            <i class="bi bi-arrow-repeat me-2"></i>${button1}
        </button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            <i class="bi bi-x-lg me-2"></i>${button2}
        </button>
    </div>`;
}
//--"modalImportTodoLists" modal'ının şablonu
const tmplModalImportTodoLists = (title, placeholder, button1, button2) => {
    return `<div class="d-flex pt-3 px-3">
        <div class="flex-grow-1" style="min-width: 0;">
            <h5 class="text-secondary text-truncate mb-0">${title}</h5>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <hr/>
    <div class="px-3">
        <textarea class="form-control" id="inputImportTodoLists" rows="10" style="resize:none;"
        placeholder="${placeholder}"></textarea>
        <div class="alerts"></div>
    </div>
    <hr/>
    <div class="d-flex pb-3 px-3 justify-content-end">
        <button type="button" class="btn btn-primary me-2" id="btnModalImport">
            <i class="bi bi-upload me-2"></i>${button1}
        </button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            <i class="bi bi-x-lg me-2"></i>${button2}
        </button>
    </div>`;
}
//--"modalExportTodoLists" modal'ının şablonu
const tmplModalExportTodoLists = (title, button1) => {
    return `<div class="d-flex pt-3 px-3">
        <div class="flex-grow-1" style="min-width: 0;">
            <h5 class="text-secondary text-truncate mb-0">${title}</h5>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <hr/>
    <div class="px-3">
        <textarea class="form-control" id="inputExportTodoLists" rows="10" style="resize:none;" readonly></textarea>
        <div class="alerts"></div>
    </div>
    <hr/>
    <div class="d-flex pb-3 px-3 justify-content-end">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            <i class="bi bi-x-lg me-2"></i>${button1}
        </button>
    </div>`;
}
//-- -