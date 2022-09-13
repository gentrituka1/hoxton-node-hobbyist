import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const port = 4000;

// users section

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({ include: { hobbies: true } });
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id },
    include: { hobbies: true },
  });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ error: "User not found!" });
  }
});

app.post("/users", async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
    include: { hobbies: true },
  });
  res.send(user);
});

app.delete("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.delete({
    where: { id },
  });
  res.send(user);
});

app.patch("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.update({
    where: { id },
    data: req.body,
    include: { hobbies: true },
  });
  res.send(user);
});

// hobbies section

app.get("/hobbies", async (req, res) => {
  const hobbies = await prisma.hobby.findMany({ include: { user: true } });
  res.send(hobbies);
});

app.get("/hobbies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const hobby = await prisma.hobby.findUnique({
    where: { id },
    include: { user: true },
  });
  if (hobby) {
    res.send(hobby);
  } else {
    res.status(404).send(`Hobby not found!`);
  }
});

app.post("/hobbies", async (req, res) => {
  const hobby = await prisma.hobby.create({
    data: req.body,
    include: { user: true },
  });
  res.send(hobby);
});

app.delete("/hobbies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const hobby = await prisma.hobby.delete({
    where: { id },
  });

  res.send(hobby);
});

app.patch("/hobbies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const hobby = await prisma.hobby.update({
    where: { id },
    data: req.body,
    include: { user: true },
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})