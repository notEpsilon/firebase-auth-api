/**
 * This File is The Project Package Entry Point
 * Which Contains the Express Server Inits. and
 * Responsible for Executing Driver Code Parts.
*/

/** External Imports ( installed via NPM ) */
import express from 'express';

/** Internal Imports ( created modules ) */
import userRouter from './routes/user.route.js';

const app = express(); // Inits New Express Application Onto The app Var.

/**
 * Server Middlewares
 * 1. allows for JSON data flow through api.
 * 2. allows for user routing through authentication services & endpoints.
*/
app.use(express.json());
app.use('/auth', userRouter);

/** PORT Constant is Either From The Production Version
 * Environment Variables Which Should be Saved to The
 * Hosting Service, or it's Just Defaulted to (4000).
 */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server Listening on Port ${PORT}...`));
