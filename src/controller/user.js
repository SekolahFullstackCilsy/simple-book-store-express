const UserModel = require("../model").user;

module.exports = {
  retrieveAllUser: async (req, res) => {
    const allUser = await UserModel.findAll();
    res.json(allUser);
  },
  retrieveById: async (req, res) => {
    const id = parseInt(req.params.id);
    const selectedUser = await UserModel.findByPk(id);

    if (!selectedUser) {
      res.status(404).send(`user with id ${id} was not found`);
    } else {
      res.json(selectedUser);
    }
  },
  createUser: async (req, res) => {
    const newUser = {
      name: req.body.name,
      age: req.body.age,
    };
    await UserModel.create(newUser);
    res.sendStatus(201); // created
  },
  updateUser: async (req, res) => {
    const payload = req.body;

    const id = parseInt(req.params.id);
    await UserModel.update(payload, { where: { id: id } });

    res.json({ id, ...payload });
  },
  deleteUser: async (req, res) => {
    const id = parseInt(req.params.id);
    await UserModel.destroy({ where: { id: id } });

    res.sendStatus(204); // no content
  },
};
