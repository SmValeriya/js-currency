class UI {
  constructor(resultEl) {
    this.resultEl = resultEl;
  }

  createOptionElement([value, text, imgCode], selected) {
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = text;
    optionElement.selected = selected === value;
    optionElement.dataset.image = `https://flagcdn.com/24x18/${imgCode}.png`;
    return optionElement;
  }

  populateSelectElement(selectElement, optionList, defaultSelected) {
    const fragmentList = new DocumentFragment();

    optionList.forEach((option) => {
      fragmentList.appendChild(this.createOptionElement(option, defaultSelected));
    });

    selectElement.appendChild(fragmentList);
  };

  updateResult(text) {
    this.resultEl.textContent = text;
  }
}