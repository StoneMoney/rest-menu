const faker = require('faker');
const { Item } = require('../../../src/models');

describe('Item model', () => {
  describe('Item validation', () => {
    let newItem;
    beforeEach(() => {
      newItem = {
        name: faker.name.findName(),
        description: faker.lorem.paragraph(),
        price: faker.commerce.price(),
        calories: faker.random.numeric(),
      };
    });

    test('should correctly validate a valid item', async () => {
      await expect(new Item(newItem).validate()).resolves.toBeUndefined();
    });
  });
});
