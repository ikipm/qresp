import indexRoutes from './routes/index.routes.js'
import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url'
import { createTable } from './pacient_db.js'

// Create an express app at port 3000
const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up Handlebars as the view engine
app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set("views", path.join(__dirname, "views"));

// Set up the router
app.use(indexRoutes);

// Start the database creating (if it doesn't exist) the table Pacient
createTable();

app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
})

