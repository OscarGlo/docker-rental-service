import express from "express";
import * as bodyParser from "body-parser";
import {db} from "./db";

const app = express();

app.use(bodyParser.json({
	limit: "50mb",
	verify(req: any, res, buf, encoding) {
		req.rawBody = buf;
	}
}));

// Handlers that return sql errors when there is one
function sqlError(res) {
	return err => err ? res.status(500).send(err) : res.sendStatus(200);
}

function sqlDataError(res) {
	return (err, data) => res.status(err ? 500 : 200).json(err ?? data);
}

app.get("/users", (req, res) =>
	db.query("SELECT * FROM user", sqlDataError(res))
);

app.post("/users", (req, res) => {
	db.query("INSERT INTO user VALUES (NULL, ?, ?)", [req.body.name, req.body.email], sqlError(res))
});

app.delete("/users/:id", (req, res) =>
	db.query("DELETE FROM user WHERE id = ?", [req.params["id"]], sqlError(res))
);

app.get("/users/:id", (req, res) =>
	db.query("SELECT * FROM user WHERE id = ?", [req.params["id"]], sqlDataError(res))
);

export {app};
