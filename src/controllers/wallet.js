const { wallet, user, transaction } = require("../../models")

exports.getWallet = async (req, res) => {
    try {
        const userId = req.user.id;

        const data = await wallet.findOne({
            where: {
                userId,
            },
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                },
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId']
            },
        });

        res.send({
            status: 'success...',
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


exports.updateWallet = async (req, res) => {
    try {
        
        const data = await wallet.findOne({
            where: {
                userId: req.user.id
            }
        })

        const body = {
            saldo: data.saldo + parseInt(req.body.saldo)
        }

        await wallet.update(body, {
            where: {
                userId: req.user.id
            }
        });

        await transaction.create({
            nominal: req.body.saldo,
            sender: req.user.id,
            type: 'Topup'
        });

        res.status(200).send({
            message: 'topup berhasil',
            body,
            data: req.body.saldo
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

