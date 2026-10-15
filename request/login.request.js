
import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class Login {
    #token;

    access(email, pass) {
        const response = http.post(
            `${Utils.getBaseUrl()}/login`,
            JSON.stringify({
                email: email,
                password: pass
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        );


        check(response, {
            "status deve ser 200": (r) => r.status === 200
        });

        if (response.status === 200) {
            this.#token = response.json("token").replace(/^Bearer\s+/i, "");
            console.log(`Token recebido: ${Boolean(this.#token)}`);
        }

    }

    getToken() {
        return this.#token;
    }
}
