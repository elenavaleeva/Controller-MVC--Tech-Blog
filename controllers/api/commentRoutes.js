const router = require("express").Router();
const db = require("../models");
const { comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);

        })
});
router.post("/", withAuth, (req, res) => {
    if (req.session && req.session.user_id) {
        Comment.create({
            content: req.body.content,
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })

            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    }
});

router.delete("/:id", withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },

    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: "No comment found with this id" });
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;


