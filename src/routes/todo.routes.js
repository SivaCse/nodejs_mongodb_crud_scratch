import { Router } from "express";

import Todo from "../models/todo.js";

const todoRouter = new Router();

const pageSize = 5;

todoRouter.get("/:order/:pageNum", async (req, res) => {
  const order = req.params.order === 'asc' ? 1 : -1;
  const pageNumber = req.params.pageNum || 1;
  try {
    const found = await Todo.find({})
    .skip((pageNumber -1 ) * pageSize)
    .limit(pageSize)
    .sort({title: order});
    res.send(found);
  } catch (e) {
    res.sendStatus(e);
  }
});

todoRouter.get("/count", async (req, res) => {
  try {
    const count = await Todo.count({});
    res.send({total: count, pages: Math.ceil(count/pageSize) });
  } catch (e) {
    res.sendStatus(e);
  }
});

todoRouter.post("/", async (req, res) => {
  try {
    const created = await Todo.create(req.body);
    res.send(created);
  } catch (e) {
    res.sendStatus(e);
  }
});

todoRouter.put("/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    const updated = await Todo.findByIdAndUpdate(todoId, req.body);
    res.send(updated);
  } catch (e) {
    res.sendStatus(e);
  }
});

todoRouter.delete("/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    const deleted = await Todo.findByIdAndRemove(todoId, {});
    res.send(deleted);
  } catch (e) {
    res.sendStatus(e);
  }
});

module.exports = todoRouter;
