class Dropdown {
  constructor(element) {
    this.element = element;
    this.dropdown = null;
  }

  init() {
    this.createCustomDropdown();
    this.setupHandlers();
  }

  createCustomDropdown() {
    const dropdown = document.createElement('div');
    const dropdownList = document.createElement('ul');
    const dropdownValue = document.createElement('div');
    const selectedOption = this.element.options[this.element.selectedIndex];

    dropdown.classList.add('dropdown');
    dropdownValue.classList.add('dropdown__value');
    dropdownList.classList.add('dropdown__list');

    dropdownValue.append(this.createDropdownItem(selectedOption));

    dropdownList.appendChild(this.populateDropdownList(this.element.options));

    dropdown.append(dropdownValue, dropdownList);
    this.element.insertAdjacentElement('afterend', dropdown);
    this.dropdown = dropdown;
  }

  createDropdownItem({ value, text, dataset: { image } }) {
    const el = document.createElement('div');
    el.classList.add('dropdown__option-content');
    el.dataset.value = value;
    const img = document.createElement('img');
    const span = document.createElement('span');

    span.textContent = value;
    img.src = image;
    el.append(img, span, ` ${text}`);
    return el;
  }

  populateDropdownList(list) {
    const fragmentList = new DocumentFragment();

    for (let option of list) {
      const li = document.createElement('li');
      li.classList.add('dropdown__list-item');
      li.appendChild(this.createDropdownItem(option));

      fragmentList.appendChild(li);
    }

    return fragmentList;
  }

  setupHandlers() {
    this.dropdown.addEventListener('click', (e) => {
      if (e.target.closest('.dropdown__value')) {
        this.dropdown.classList.toggle('open');
      }

      if (e.target.closest('.dropdown__list-item')) {
        const target = e.target.closest('.dropdown__list-item')
          .querySelector('.dropdown__option-content');
        if (!target.dataset?.value) return;
        const clone = target.cloneNode(true);
        this.dropdown.querySelector('.dropdown__value .dropdown__option-content').replaceWith(clone);
        this.element.value = target.dataset.value;
        this.dropdown.classList.remove('open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        this.dropdown.classList.remove('open');
      }
    });

    this.element.addEventListener('change', (e) => {
      const selectedOption = this.element.options[this.element.selectedIndex];
      this.dropdown.querySelector('.dropdown__value .dropdown__option-content').replaceWith(this.createDropdownItem(selectedOption));
    });
  }
}