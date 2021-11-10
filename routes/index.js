const router = require("express").Router();
const apiroutes = require("./api");
router.use("/api", apiroutes);
router.use((req, res) => {
	res.status(404).end();
});
module.exports = router;