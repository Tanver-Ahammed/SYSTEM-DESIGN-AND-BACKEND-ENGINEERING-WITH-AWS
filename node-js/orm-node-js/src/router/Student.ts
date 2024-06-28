import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
export const router = Router();

const userRepo = AppDataSource.getRepository(User);

// get all users
router.get('/users', async (req, res) => {
    const users = await userRepo.find();
    res.json(users);
});


// insert user
router.post('/add-user', async (req, res) => {
    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.age = req.body.age;
    user.age = req.body.age;

    try {
        const saveUser = await userRepo.save(user);
        res.status(201).send(saveUser);
    } catch (error) {
        res.status(500).send(error);
    }

});