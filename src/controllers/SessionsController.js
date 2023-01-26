const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken");
const { compare } = require("bcrypt");

class SessionsController {
    async create(request, response) {
        const { email, password } = request.body;

        const user = await knex("users").where({ email }).first();

        const checkPassword = await compare(password, user.password);

        if(!checkPassword) {
            throw new AppError("E-mail e/ou senha inválido(s)", 401)
        }

        if(!user) {
            throw new AppError("E-mail e/ou senha inválido(s)", 401)
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({ user, token });
    }
}

module.exports = SessionsController;