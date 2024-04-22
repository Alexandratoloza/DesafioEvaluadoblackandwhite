import 'dotenv/config';
import express from 'express';
import Jimp from 'jimp';
import { nanoid } from 'nanoid';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the image processing server' });
});

app.get('/image', async (req, res) => {
    try {
        const imageUrl = req.query.image_url;

        // Validar la URL de la imagen (puedes agregar más validaciones según sea necesario)
        if (!imageUrl || !imageUrl.startsWith('http')) {
            return res.status(400).json({ error: 'Invalid image URL' });
        }

        const image = await Jimp.read(imageUrl);

        const processedImage = await image
            .cover(500, 500) // Cambiar según tus necesidades
            .grayscale()
            .quality(60) // Cambiar según tus necesidades
            .getBufferAsync(Jimp.MIME_JPEG);

        const imagePath = join(__dirname, `public/img/${nanoid()}.jpeg`);
        await image.writeAsync(imagePath);

        res.set('Content-Type', 'image/jpeg');
        return res.send(processedImage);
    } catch (error) {
        console.error('Error processing image:', error);
        return res.status(500).json({ error: 'Failed to process image' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
