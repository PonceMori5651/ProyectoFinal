const {fakerES:faker} = require('@faker-js/faker')

const generateProduct = ()=>{
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int(),
        id: faker.database.mongodbObjectId(),
        status: true,
        category: faker.commerce.productMaterial(),
        code: faker.string.uuid()
    }
}

module.exports = generateProduct
