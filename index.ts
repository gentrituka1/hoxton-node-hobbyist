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
    const newUser = {
        fullName: req.body.fullName,
        image: req.body.image,
        email: req.body.email,
        hobbies: req.body.hobbies ? req.body.hobbies : []
    }

    const newUsers = await prisma.user.create({
        data: {
            fullName: newUser.fullName,
            image: newUser.image,
            email: newUser.email,
            hobbies: {
                connectOrCreate: newUser.hobbies.map((hobby: string) => ({
                    where: {name: hobby},
                    create: {name: hobby}
                }))
            }
        },
        include: {hobbies: true}
    })
    res.send(newUsers)
})

app.patch("/users/:id", async (req, res) => {
    const id = Number(req.params.id);
    const updateUser = {
        fullName: req.body.fullName,
        image: req.body.image,
        email: req.body.email,
        hobbies: req.body.hobbies ? req.body.hobbies : []
    }

    const updatedUsers = await prisma.user.update({
        where: {id},
        data: {
            fullName: updateUser.fullName,
            image: updateUser.image,
            email: updateUser.email,
            hobbies: {
                connectOrCreate: updateUser.hobbies.map((hobby: string) => ({
                    where: {name: hobby},
                    create: {name: hobby}
                }))
            }
        },
        include: {hobbies: true}
    })
    res.send(updatedUsers)
})

app.delete("/users/:id", async (req, res) => {
    const id = Number(req.params.id);
    const deletedUsers = await prisma.user.delete({where: {id}});
    res.send(deletedUsers);
})


// hobbies section

app.get("/hobbies", async (req, res) => {
    const hobbies = await prisma.hobby.findMany({include: {users: true}});
    res.send(hobbies);
})

app.get("/hobbies/:id", async (req, res) => {
    const id = Number(req.params.id);
    const hobby = await prisma.hobby.findUnique({where: {id}, include: {users: true}});
    res.send(hobby);
})

app.post("/hobbies", async (req, res) => {
    const newHobby = {
        name: req.body.name,
        image: req.body.image,
        active: req.body.active,
        users: req.body.users ? req.body.users : []
    }

    const newHobbies = await prisma.hobby.create({
        data: {
            name: newHobby.name,
            image:  newHobby.image,
            active: newHobby.active,
            users: {
                connectOrCreate: newHobby.users.map((user: number) => ({
                    where: {id: user},
                    create: {id: user}
                }))
            }
        },
        include: {users: true}
    })
    res.send(newHobbies)
})

app.patch("/hobbies/:id", async (req, res) => {
    const id = Number(req.params.id);
    const updateHobby = {
        name: req.body.name,
        image: req.body.image,
        active: req.body.active,
        users: req.body.users ? req.body.users : []
    }

    const updatedHobbies = await prisma.hobby.update({
        where: {id},
        data: {
            name: updateHobby.name,
            image:  updateHobby.image,
            active: updateHobby.active,
            users: {
                connectOrCreate: updateHobby.users.map((user: number) => ({
                    where: {id: user},
                    create: {id: user}
                }))
            }
        },
        include: {users: true}
    })
    res.send(updatedHobbies)
})

app.delete("/hobbies/:id", async (req, res) => {
    const id = Number(req.params.id);
    const deletedHobbies = await prisma.hobby.delete({where: {id}});
    res.send(deletedHobbies);
})


// start server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})