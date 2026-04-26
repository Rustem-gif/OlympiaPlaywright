export default class Methods {
  generateRandomEmail(): string {
    return `test_${Date.now()}@mailtest.com`;
  }
}
