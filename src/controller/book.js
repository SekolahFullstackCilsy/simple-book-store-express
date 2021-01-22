const BookModel = require("../model").book;

module.exports = {
  retrieveAllBook: async (req, res) => {
    const books = await BookModel.findAll();
    res.json(books);
  },
  retrieveById: async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(BookModel);
    const book = await BookModel.findByPk(id);

    if (!book) {
      res.status(404).send(`book with id ${id} was not found`);
    } else {
      res.json(book);
    }
  },
  createBook: async (req, res) => {
    const newBook = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    };

    await BookModel.create(newBook);
    res.sendStatus(201); // created
  },
  updateBook: async (req, res) => {
    const payload = req.body;

    const id = parseInt(req.params.id);
    await BookModel.update(payload, { where: { id: id } });

    res.json({ id, ...payload });
  },
  deleteBook: async (req, res) => {
    const id = parseInt(req.params.id);
    await BookModel.destroy({ where: { id } });

    res.sendStatus(204); // no content
  },
};
