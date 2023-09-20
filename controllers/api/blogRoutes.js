const router = require('express').Router();
const { Blog } = require('../../models');



router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(201).json(newBlog);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid input or server error.' });
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        await blogData.destroy();
        res.status(200).json({ message: 'Blog post deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;