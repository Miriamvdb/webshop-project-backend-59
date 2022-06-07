"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Tarek Ben Yakoub",
          email: "tarek@benyakoub.com",
          password: "0000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Miriam van den Bosch",
          email: "miriam@vandenbosch.com",
          password: "1234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
