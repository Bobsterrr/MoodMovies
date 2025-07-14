class ListCreating extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const openList = document.createElement('button');
    openList.setAttribute('id', 'openList');

    const tableList = document.createElement('ul');
    tableList.setAttribute('id', 'tableList');

    const dialog = document.createElement('dialog');
    dialog.setAttribute;
  }
}

customElements.define('list-creating', ListCreating);
