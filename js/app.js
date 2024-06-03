const converter = new Converter();
const ui = new UI(document.querySelector('.exchange__result'));
const formElement = document.querySelector('.exchange__form');
const reverseBtn = document.querySelector('.exchange__reverse');

formElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  const baseCurrency = formElement.elements.base.value;
  const targetCurrency = formElement.elements.target.value;
  const amountValue = Number(formElement.elements.amount.value);

  try {
    const rate = await converter.getCurrencyRate(
      baseCurrency,
      targetCurrency
    );

    const conversionResult = Number(amountValue * rate).toFixed(2);

    ui.updateResult(`${amountValue} ${baseCurrency} = ${conversionResult} ${targetCurrency}`);
  } catch (error) {
    ui.updateResult('Something went wrong. Please, try again later');
  }
});

reverseBtn.addEventListener('click', () => {
  [
    formElement.elements.base.value,
    formElement.elements.target.value
  ] = [
      formElement.elements.target.value,
      formElement.elements.base.value
    ];
  formElement.elements.base.dispatchEvent(new Event('change'));
  formElement.elements.target.dispatchEvent(new Event('change'));
});

const setupCurrencies = async () => {
  const baseSelect = document.querySelector('#base');
  const targetSelect = document.querySelector('#target');

  const currencyOptions = await converter.getCurrencyOptions();
  const currencyOptionsWithImgCode = currencyOptions.map(item => {
    const code = countryList[item[0]]?.toLowerCase() || '';
    item.push(code)
    return item
  });
  setupCurrency(baseSelect, currencyOptionsWithImgCode, 'USD');
  setupCurrency(targetSelect, currencyOptionsWithImgCode, 'EUR');
};

const setupCurrency = (el, options, defaultCurrency) => {
  ui.populateSelectElement(el, options, defaultCurrency);
  const dropdown = new Dropdown(el);
  dropdown.init();
}

setupCurrencies();
