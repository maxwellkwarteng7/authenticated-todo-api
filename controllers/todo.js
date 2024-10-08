const wrapper = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { User, Todo } = require("../models");

const dashboard = wrapper(async (req, res) => {
  const userId = req.userId;
  //find the user and fetch his/her todos
  const user = await User.findOne({
    where: { id: userId },
    include: [
      {
        model: Todo,
        as: "Tasks",
      },
    ],
    order: [
      [{ 
        model: Todo, 
        as : 'Tasks'
      },
        'createdAt',
        'DESC'
      ]
    ]
  }); 
  res.status(StatusCodes.OK).json(user.Tasks);
});

const createTask = wrapper(async (req, res) => {
  const { todo } = req.body;
  const userId = req.userId;
  if (!todo) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Todo field is required" });
  }
  // create the todo
  try {
    const userTodo = await Todo.create({ todo, userId });
    res.status(StatusCodes.CREATED).json({ userTodo });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: error.message });
  }
});


const deleteTodo = wrapper(async (req, res) => {
    const todoId = req.params.id; 
    //find the todo first 
    try {
        const todo = await Todo.findOne({ where: { id: todoId } });
        if (!todo) {
            res.status(StatusCodes.NOT_FOUND).json({ msg: "No todo with this id found" });  
        }
        await Todo.destroy({
            where: { id: todoId }
        }); 
        res.status(StatusCodes.OK).json({ msg: "todo deleted" }); 
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: error.message }); 
    }
}); 

module.exports = {
  dashboard,
    createTask,
  deleteTodo
};
