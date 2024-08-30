import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";
const app = express();

app.use(express.json());

app.get("/users", async (request, response) => {
  const users = await User.find();

  return response.status(200).json(users);
});

app.post("/users", async (request, response) => {
  const user = request.body;

  const newUser = await User.create(user);
  return response.status(201).json(newUser);
});


app.put("/users/:cpf", async (request, response) => {
  const { cpf } = request.params;
  const updates = request.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ cpf }, updates, {
      new: true,
    });

    return response.status(200).json(updatedUser);
  } catch (error) {
    return response.status(500).json({ message: "Erro ao atualizar usuário" });
  }
});


app.delete("/users/:cpf", async (request, response) => {
  const { cpf } = request.params;

  try {
    const deletedUser = await User.findOneAndDelete({ cpf });

    return response.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return response.status(500).json({ message: "Erro ao deletar usuário" });
  }
});

mongoose
  .connect(
    "mongodb+srv://gabrielvictor:gabrielvictor@bancodedados.cmtvy.mongodb.net/?retryWrites=true&w=majority&appName=BancoDeDados"
  )
  .then(() => console.log("Funcionando"))
  .catch(() => console.log("Nao ta funcionando"));

app.listen(3000);
