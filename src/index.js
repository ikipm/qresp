import indexRoutes from './routes/index.routes.js'
import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url'
import { createTable } from './pacient-db.js';

// Create an express app at port 3000
const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up Handlebars as the view engine
app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set("views", path.join(__dirname, "views"));

app.use(indexRoutes);

createTable();

app.get('/', (req, res) => {
  res.render('home', { title: 'Qres', webTitle: 'Qresp BitsXMarato 2024' });
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
})

