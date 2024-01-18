import express from 'express';
import cors from "cors"

const app= express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).json({
        message:"info fetched successfully"
    })
})
app.get('/healthcheck', (req, res) => {
    res.status(200).json({
        message:"The server is working fine"
    })
})

//import routes
import userRouter from './routes/user.route.js';

//using routes
app.use('/api/user', userRouter);

export {app}