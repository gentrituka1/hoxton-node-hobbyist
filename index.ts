import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const port = 4000;

// get, post, put, delete, patch

// users section
app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany({include: {hobbies: true}});
    res.send(users);
})

app.get("/users/:id", async (req, res) => {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({where: {id}, include: {hobbies: true}});
    res.send(user);
})

app.post("/users", async (req, res) => {
    const newUser
})


// hobbies section


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})