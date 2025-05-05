import express from 'express'
import routes from './routes'

const app = express();

app.use('/', routes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})