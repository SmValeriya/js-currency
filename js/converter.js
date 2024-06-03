class Converter {
  constructor() {
    this.API_KEY = 'f34c7108d52373d7033d805a';
    this.URI = 'https://v6.exchangerate-api.com/v6';
  }

  async getCurrencyOptions() {
    const url = `${this.URI}/${this.API_KEY}/codes`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      return data.supported_codes;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCurrencyRate(base, target) {
    const url = `${this.URI}/${this.API_KEY}/pair/${base}/${target}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      return data.conversion_rate;
    } catch (error) {
      throw new Error(error);
    }
  }
}