export class ListCreating extends HTMLElement {
    constructor() {
        super();
        this.create = this.getElementById('openList');
        this.search = this.getElementById('movieSearch');
        this.listName = this.getElementById('listCreator');
        this.create.addEventListener('click',() => {ElementById('movieSearch');
            this.listName.value = '';
            this.search.value = '';
            dialog.showModal()        })
    }
}

customElements.define('list-creating', ListCreating)