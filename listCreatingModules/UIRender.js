export class UIRender {
  renderComponent() {
    return `
                <button id="openList" data-open-modal>Создать подборку</button>
            <ul id="tableList"></ul>
            <dialog data-modal>
                <div class="list_container">
                    <input id="listCreator" type="text" placeholder="Название Подборки">
                    <input id="movieSearch" type="text" placeholder="Фильм для Подборки">
                    <ul id="result"></ul>
                    <button id="createButton" type="submit">Создать Подборку</button>
                    <button id="closeDialog" data-close-modal>Выйти</button>
                </div>
`;
  }

  renderResult(results) {
    resultList.innerHTML = '';
    results.forEach((movie) => {
      const li = document.createElement('li');
      const choiceButton = document.createElement('button');
      choiceButton.textContent = `${movie.title} (${movie.rating})`;
      choiceButton.addEventListener('click', () => {
        const listName = listCreator.value;
        if (localStorage.getItem(`${listName}`)) {
          const choose = JSON.parse(localStorage.getItem(`${listName}`));
          choose.push(movie.title);
          localStorage.setItem(`${listName}`, JSON.stringify(choose));
        }
      });
      resultList.appendChild(li);
      li.appendChild(choiceButton);
    });
  }
}
