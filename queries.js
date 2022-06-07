const User = require("./models").user;

async function getAllUsers() {
  const allUsers = await User.findAll({ raw: true });
  return allUsers;
}

getAllUsers().then((users) => console.log(users));
