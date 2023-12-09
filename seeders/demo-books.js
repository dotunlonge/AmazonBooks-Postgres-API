// demo-books.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const booksData = Array.from({ length: 1000 }, (_, index) => ({
      title: `A Book Title ${index + 1}`,
      writer: `An Author ${index + 1}`,
      cover_image: `https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg`,
      point: Math.floor(Math.random() * 200) + 50, // Random points between 50 and 250
      tags: ['fiction', 'fantasy', 'thriller'].slice(Math.floor(Math.random() * 3)), // Random tags
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Bulk insert books into the database
    await queryInterface.bulkInsert('books', booksData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all records seeded by this file
    await queryInterface.bulkDelete('books', null, {});
  },
};
