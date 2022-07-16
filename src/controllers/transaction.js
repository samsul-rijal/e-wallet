const { wallet, user, transaction } = require("../../models")

exports.transaction = async (req, res) => {
    try {

        const dataWallet = await wallet.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (dataWallet.saldo < req.body.nominal) {
            return res.status(400).send({
                message: 'maaf saldo anda tidak cukup!',
            });
        }

        const dataTransfer = await wallet.findOne({
            where: {
                userId: req.body.receiver
            }
        })

        const bodyData = {
            saldo: dataTransfer.saldo + parseInt(req.body.nominal)
        }

        await wallet.update(bodyData, {
            where: {
                userId: req.body.receiver
            }
        });

        const userWallet = await wallet.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (userWallet.saldo < req.body.nominal) {
            return res.status(400).send({
                message: 'maaf saldo tidak cukup',
            });
        }

        const dataSaldo = {
            saldo: userWallet.saldo - req.body.nominal
        }

        await wallet.update(dataSaldo, {
            where: {
                userId: req.user.id
            }
        });

        const dataTransaksi = await transaction.create({
            receiver: req.body.receiver,
            nominal: req.body.nominal,
            sender: req.user.id,
            type: 'Transfer'
        });

        res.status(200).send({
            message: 'Transfer berhasil',
            dataTransaksi
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

exports.transactions = async (req, res) => {

    try {
        let dataTransactions = await transaction.findAll({
            // where:{
            //     sender: req.user.id
            // },
            include: [
                {
                    model: user,
                    as: 'receiverUser',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    },
                },
                {
                    model: user,
                    as: 'senderUser',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    },
                }
            ],
            attributes: {
                exclude: ['receiver','sender']
            },
        })

        // console.log(data);
        const dataSender = dataTransactions.filter((item) => item.senderUser.id === req.user.id)
        const dataReceiver = dataTransactions.filter((item) => item.receiverUser.id === req.user.id)

        let data = dataSender.concat(dataReceiver)
        data = [...new Map(data.map(item => [item['id'], item])).values()]

        data.sort((a, b) => b.createdAt - a.createdAt)

        res.send({
            status: 'success',
            data
            // dataTransactions
        })

    } catch (error) {
        console.log(error);
    }
}