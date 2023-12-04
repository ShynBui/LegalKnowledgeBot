# LegalKnowledgeBot

Develop an application to support searching and asking questions about legal knowledge based on the Legal Code and Legal Document Database#.

# First of all

You can access the backend website that my team has deployed at the following link

```
https://phapluatcodeheroes.site
```

## Usage

1. Clone the Python Flask project

```
git clone -b backend https://github.com/ShynBui/LegalKnowledgeBot.git backend
```

2. Open folder where clone and open `backend` folder.
3. Create a new file named `.env` in `saleapp`.
4. Open the `.env` file and set your environment variables as follows:

   ```
   DB_USER=<your-database-username>
   DB_PASS=<your-database-password>
   DB_HOST=<your-database-host>
   DB_NAME=<your-database-name>
   HOST=localhost
   CORS_URL=http://localhost:5173
   JWT_SECRET_KEY=123312dsawq

   ```

## Running the Program in VSCode

1. Open _VSCode_.
2. Go to `File -> Open Folder`.
3. Select the folder where clone, open `backend` folder.
4. Press `Ctrl+Shift+P` to open the Command Palette.
5. Type and select `Python:Create Environment`.
6. In the terminal, activate the virtual environment using the command `source .venv/bin/activate`.
7. Install the required packages with `pip install -r requirements.txt`.
8. Run program with `python index.py`.

## Running the Program in PyCharm

1. Open _PyCharm_.
2. Go to `File -> Open...`.
3. Select the folder where clone, open `backend` folder.
4. Go to `File` -> `Setting` -> `Project: <Project-name>` -> `Python Interpreter`.
5. Click on the plus (+) icon in the bottom right corner to add a new Python Interpreter.
6. Select `Virtualenv Environment` on the left.
7. Make sure `New environment` is selected and specify the path to the `.venv` directory in project folder in Location.
8. Select the Python version from the `Base interpreter` list.
9. Click `OK` to create the virtual environment.
10. Open the Terminal in PyCharm (`View` -> `Tool Windows` -> `Terminal`).
11. In the terminal, activate the virtual environment using the command `source .venv/bin/activate`.
12. Install the required packages with `pip install -r requirements.txt`.
13. Navigate to the `index.py` file in the PyCharm Project Tool Window.
14. Right-click on the `index.py` file and select `Run 'run'`.

## Prepare Database

1. Create a new database in MySQL Server.
2. Update the .env file with your database information.
3. Run `models.py` to create table.

## Installing Docker on Ubuntu

You will need the following:

- One Ubuntu server set up, including a sudo non-root user and a firewall.
- An account on Docker Hub if you wish to create your own images and push them to Docker Hub.

1. Update your existing list of packages: `$ sudo apt update`

2. Next, install a few prerequisite packages which let apt use packages over HTTPS: `$ sudo apt install apt-transport-https ca-certificates curl software-properties-common`

3. Then add the GPG key for the official Docker repository to your system: `$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`

4. Add the Docker repository to APT sources: `$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"`

5. Finally, install Docker: `$ sudo apt install docker-ce`

6. Docker should now be installed, the daemon started, and the process enabled to start on boot. Check that it’s running: `$ sudo systemctl status docker`

## Installing PyTest

1. Prerequisites

- Python Installation.
- Pip Installation.

2. Open your terminal and run the command: `pip install pytest`

# Features included in the project

- Register / Login: Includes new user registration and login functionality, information authentication, database storage, and access authorization via tokens.
- Searching codification tree
- Look up legal terms: query terms and return pagination results based on keywords and page numbers.
- Discussion forum
- Chat bot
- Contact: provides a JWT-protected API endpoint for sending reports via email. It uses Flask and JWT to authenticate users and send email reports with the content and subject provided from the request.

# Dependencies and libraries

1. Flask and related extensions:
   <<<<<<< HEAD

- Flask (3.0.0)
- Flask-Bcrypt (1.0.1)
- Flask-Cors (4.0.0)
- Flask-JWT-Extended (4.5.3)
- Flask-RESTful (0.3.10)
- Flask-SQLAlchemy (3.1.1)

2. Libraries that support data processing and calculations:

- NumPy (1.26.2)
- Pandas (2.1.3)
- SciPy (1.11.4)
- Scikit-learn (1.3.2)
- sklearn-crfsuite (0.3.6)

3. Libraries that support authentication, encryption, and security:

- PyJWT (2.8.0)
- Bcrypt (4.1.1)
- Cryptography (41.0.7)
- Werkzeug (3.0.1)

4. Other supporting libraries:

- Cloudinary (1.36.0)
- Jinja2 (3.1.2)
- MarkupSafe (2.1.3)
- SQLAlchemy (2.0.23)
- Tabulate (0.9.0)
- Jenkins
- Docker

## Author

- [Nguyen Duc Hoang](https://github.com/duchoaang)
- [Bui Tien Phat](https://github.com/ShynBui)
- [Tsan Quy Thanh](https://github.com/quythanh)

## License

# [Apache License 2.0](http://www.apache.org/licenses/)

- Flask (3.0.0)
- Flask-Bcrypt (1.0.1)
- Flask-Cors (4.0.0)
- Flask-JWT-Extended (4.5.3)
- Flask-RESTful (0.3.10)
- Flask-SQLAlchemy (3.1.1)

2. Libraries that support data processing and calculations:

- NumPy (1.26.2)
- Pandas (2.1.3)
- SciPy (1.11.4)
- Scikit-learn (1.3.2)
- sklearn-crfsuite (0.3.6)

3. Libraries that support authentication, encryption, and security:

- PyJWT (2.8.0)
- Bcrypt (4.1.1)
- Cryptography (41.0.7)
- Werkzeug (3.0.1)

4. Other supporting libraries:

- Cloudinary (1.36.0)
- Jinja2 (3.1.2)
- MarkupSafe (2.1.3)
- SQLAlchemy (2.0.23)
- Tabulate (0.9.0)
- Jenkins
- Docker
  > > > > > > > ab79c5e2dfb8acac58682fa2aff039a5776086c7
