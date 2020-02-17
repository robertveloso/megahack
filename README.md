<h1>
  Megahack - CIP
</h1>

## Features

This back-end features the latest tools and practices in web development!

- 💹 **Express** — JavaScript back-end Framework
- 🐋 **Docker** — Containers
- ♻️ **Bee Queue** — Task queue for jobs (uses Redis)
- 💌 **Nodemailer** - E-mails
- 🖼️ **Handlebars** - View template (used for e-mails)
- 💖 **PostgreSQL** — For geneeral data (except notifications and jobs)
- 💖 **MongoDB** — For notifications
- 💖 **Redis** — For jobs

I've used other libraries too, like **multer** for file uploads; **youch** and **sentry** for errors; **jsonwebtoken** and **bcrypt** for authentication.

## Getting started

First you need to have `node` or `yarn` installed on your machine.
You'll also need `docker compose`.
Then, you can clone this repository and run the following commands inside the project folder:

1. `git clone https://github.com/robertveloso/gostack-desafio-01.git`

1. `yarn dev`;

1. As soon as the Postgres instance is running, open another terminal and run: `yarn migrate` you might need to change the .env to 'localhost', 'postgres' or 'ip address'.

> ps.: don't forget to create the `.env` (please duplicate `.env.example`).

You can even run `yarn test` after created `.env.test`!

## :memo: License

This project is licensed under the MIT license. See the file [LICENSE](LICENSE.md) to obtain more details.

---

Made with love ♥ by Robert Veloso :wave:
[get in touch](https://www.linkedin.com/in/robertveloso/),
[or discord me!](https://discordapp.com/channels/@me/robertveloso#1547)
