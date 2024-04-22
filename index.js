import 'dotenv/config'
import express from 'express';
import Jimp from 'jimp';
import {nanoid} from 'nanoid';

const _dirname = import.meta.dirname;
const app = express ()
app.use(express.static(_dirname + '/public'))

app.get ('/image', async (req, res) => {
    const image_url = req.query.image_url
    const image = await Jimp.read(image_url)
    const buffer = await image
    .cover (500, 500)
    .grayscale ()
    .quality(60)
    .getBufferAsync(Jimp.MIME_JPEG)


const dirname = _dirname + `/public/img/image-${nanoid()}.`
await image.writeAsync(dirname)

res.set("content-type", image/jpeg)
return res.send(buffer)

})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`example app listening on port ${PORT}`)
}) 