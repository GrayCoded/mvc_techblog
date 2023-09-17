const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.save.logged_in = true;
            req.session.user_id = userData.id;
            req.statusCode(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/session', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { displayName: req.body.display_name } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect information, please try again.' });
            return;
        }
        const verifypass
    }
})