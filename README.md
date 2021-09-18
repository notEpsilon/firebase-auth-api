# firebase-auth-api
This is a complete authentication service including validation and database storage using firebase & nodejs.

## Usage
1. download the files and run `npm install` to install the dependencies.

2. create a `.env` file in the root directory and add in it the firebase \
   configuration and an email to be the sender that sends passwords \
   to people via the `nodemailer` package.

3. make sure to name your environment variables exactly like this \
    `API_KEY`
    `AUTH_DOMAIN`
    `PROJECT_ID`
    `STORAGE_BUCKET`
    `MESSAGING_SENDER_ID`
    `APP_ID`
    `MEASUREMENT_ID`
    `MAILER_EMAIL`
    `MAILER_PASS` \
   unless you want to change the names in the whole project (which isn't hard).
