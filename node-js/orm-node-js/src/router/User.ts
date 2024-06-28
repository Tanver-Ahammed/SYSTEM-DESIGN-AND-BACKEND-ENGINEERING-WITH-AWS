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

// delete user
router.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Id is required");
    }
    try {
        const result = await userRepo.delete(id);
        if (result.affected === 0) {
            res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully...');
    } catch (error) {
        res.status(500).send('Failed to delete the user!!!');
    }
});

// update user
router.put('/user/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, age } = req.body;

    if (!id) {
        res.status(400).send("Id is required");
    }

    try {
        const updateUser = await userRepo.findOneBy({ id: id });
        if (!updateUser) {
            res.status(404).send('User not found');
        }
        updateUser.firstName = firstName;
        updateUser.lastName = lastName;
        updateUser.age = age;
        const updatedUser = await userRepo.save(updateUser);
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send('Failed to update the user!!!');
    }
});