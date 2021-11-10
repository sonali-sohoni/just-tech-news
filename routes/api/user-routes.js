const router = require("express").Router();
const { User } = require("../../models");

//GET /api/users
router.get("/", (req, res) => {
	User.findAll({
		attributes: { exclude: ["password"] },
	})
		.then((dbUserData) => res.json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//GET /api/users/1
router.get("/:id", (req, res) => {
	User.findOne({
		where: { id: req.params.id },
		attributes: { exclude: ["password"] },
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(400).json({ message: "No user found with this id" });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.post("/", (req, res) => {
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	})
		.then((dbUserData) => {
			res.json(dbUserData);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.put("/:id", (req, res) => {
	User.update(req.body, { where: { id: req.params.id } })
		.then((dbUserData) => {
			if (!dbUserData[0]) {
				res.status(400).json({ message: "No user found with this id" });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	User.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((data) => {
			if (!data) {
				res.status(400).json({ message: "No user found with this id" });
				return;
			}
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
