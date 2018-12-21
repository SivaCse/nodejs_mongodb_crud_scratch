import { Router } from "express";

import Todo from "../models/todo.js";

const todoRouter = new Router();

todoRouter.get("/", async (req, res) => {
  try {
    const found = await Todo.find({});
    res.send(found);
  } catch (e) {
    res.send(e);
  }
});

todoRouter.post("/", async (req, res) => {
  try {
    const created = await Todo.create(req.body);
    res.send(created);
  } catch (e) {
    res.send(e);
  }
});

todoRouter.put("/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    const updated = await Todo.findByIdAndUpdate(todoId, req.body);
    res.send(updated);
  } catch (e) {
    res.send(e);
  }
});

todoRouter.delete("/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    const deleted = await Todo.findByIdAndRemove(todoId, {});
    res.send(deleted);
  } catch (e) {
    res.send(e);
  }
});

module.exports = todoRouter;
