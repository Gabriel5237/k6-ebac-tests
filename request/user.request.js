
import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class User {
    list(token) {
        const response = http.get(`${Utils.getBaseUrl()}/users`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        console.log(`Status da listagem: ${response.status}`);

        check(response, {
            "listagem deve retornar 200": (r) => r.status === 200
        });
    }
}
