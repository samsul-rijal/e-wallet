const { user, wallet } = require("../../models")

const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().min(3).required(),
        password: Joi.string().min(1).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
        return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
        });

    try {

        const emailExist = await user.findOne({
            where: {
                email: req.body.email
            }
        })

        if (emailExist) {
            return res.status(400).send({
                status: "failed",
                message: "Email already registered!"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        await wallet.create({ saldo: "0", userId: newUser.id })

        res.status(200).send({
            status: 'success',
            data: {
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

exports.login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(1).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
        return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
        });

    try {
        const userExist = await user.findOne({
            where: {
                email: req.body.email,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        if(!userExist){
            return res.status(400).send({
                status:'failed',
                message: 'Email belum terdaftar'
            })
        }

        const isValid = await bcrypt.compare(req.body.password, userExist.password);

        if (!isValid) {
            return res.status(400).send({
                status: 'failed',
                message: 'password salah!',
            });
        }

        const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY);

        const dataWalet = await wallet.findOne({
            where: {
                userId: userExist.id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId']
            },
        });


        res.status(200).send({
            status: 'success',
            data: {
                id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                saldo: dataWalet.saldo,
                token,

            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

exports.checkAuth = async (req, res) => {
    try {
        const id = req.user.id;

        const dataUser = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
            },
        });

        if (!dataUser) {
            return res.status(404).send({
                status: 'failed',
            });
        }

        const dataWalet = await wallet.findOne({
            where: {
                userId: dataUser.id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId']
            },
        });

        const token = jwt.sign({ id: req.user.id }, process.env.TOKEN_KEY);

        res.send({
            status: 'success',
            data: {
                id: dataUser.id,
                name: dataUser.name,
                email: dataUser.email,
                saldo: dataWalet.saldo,
                token

            },
        });
    } catch (error) {
        console.log(error);
        res.status({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

exports.getUsers = async (req, res) => {
    try {

        const data = await user.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
        })

        res.send({
            status: 'success',
            data,
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};