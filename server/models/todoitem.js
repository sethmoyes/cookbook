module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  TodoItem.associate = (models) => {
    TodoItem.belongsTo(models.Todo, {
      foreignKey: 'todoId',
      onDelete: 'CASCADE',
    });
  };

  return TodoItem;
update(req, res) {
  return TodoItem
    .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId,
        },
      })
    .then(todoItem => {
      if (!todoItem) {
        return res.status(404).send({
          message: 'TodoItem Not Found',
        });
      }

      return todoItem
        .update({
          content: req.body.content || todoItem.content,
          complete: req.body.complete || todoItem.complete,
        })
        .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},

destroy(req, res) {
  return TodoItem
    .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId,
        },
      })
    .then(todoItem => {
      if (!todoItem) {
        return res.status(404).send({
          message: 'TodoItem Not Found',
        });
      }

      return todoItem
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};
