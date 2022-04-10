import express, { Request, Response } from 'express'
import cors from 'cors';
const app = express()
const bodyParser = require('body-parser')
app.use(cors())
const port = process.env.PORT || 5005
app.get('/', (req: Request, res: Response ) => {
    res.send('Hello World!')
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/videos', (req, res) => {
    res.send(videos)
})

app.get('/videos/:videoId', (req: Request, res:Response) => {
    const id = +req.params.videoId
    const video = videos.find((v) => v.id === id)
    if(!video){
        res.send(404)
    } else {
        res.send(video)
    }
} )

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.send(201)
})

app.put('/videos/:videoId', (req: Request, res:Response) => {
    const id = +req.params.videoId
    const updatedVideos = videos.map((v) => {
     if(v.id === id){
         return {
             ...v,
             title: req.body.title
         } } else {
             return v
         }
    })
    res.send(updatedVideos)
})

app.delete('/videos/:videoId', (req: Request, res:Response) => {
    const id = +req.params.videoId
    const newVideos = videos.filter((v) => v.id !== id)
    res.send(newVideos)
})