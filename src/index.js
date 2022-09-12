import express from 'express'
import morgan from 'morgan'
import addFilm from './addfilm.js'
import { PORT } from './config.js'
import delFilm from './delfilm.js'
import getAllFilm from './getallfilm.js'
import getFilm from './getfilm.js'
import putFilm from './putfilm.js'
import { registerUser, signIn } from './users.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import uploadgambar from './uploadgambar.js'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({ createParentPath: true }))

app.use(morgan('combined'))

app.get("/films", getAllFilm)
app.post("/film", addFilm)
app.get("/film/:id", getFilm)
app.put("/film/:id", putFilm)
app.delete("/film/:id", delFilm)

app.post('/user/register', registerUser)
app.post('/user/signin', signIn)

app.post('/upload-gambar', uploadgambar)

app.listen(PORT)
console.log(`API sudah aktif di port ${PORT}`)