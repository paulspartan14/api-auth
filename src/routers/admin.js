const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            tittle: 'my protected route',
            user: req.user
        }
    });
})

module.exports = router;