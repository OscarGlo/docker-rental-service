import {app} from "./app";
import {db} from "./db";
import {AddressInfo} from "net";

const server = app.listen(5000, "0.0.0.0", () => {
	db.connect(function(err: any) {
		if (err) {
			throw err;
		} else {
			console.log("Connecté à la base de données MySQL!");
			const {port, address} = server.address() as AddressInfo;
			console.log("Server listening on:", "http://" + address + ":" + port);
		}
	});
});