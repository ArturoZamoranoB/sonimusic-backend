import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { PrismaClient } from '@prisma/client'



const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


app.get("/api/canciones", async (req, res) => {
  const canciones = await prisma.cancion.findMany({
    include: { artista: true },
    take: 50,
  });

  const conArtista = canciones.map(c => ({
    id: c.id,
    titulo: c.titulo,
    artista: c.artista.nombre,
    portada: c.portada,
    duracion: c.duracion,
    preview: c.urlMP3,
    deezerId: c.deezerId.toString()
  }));

  res.json(conArtista);
});

app.get("/api/preview/:deezerId", async (req, res) => {
  const { deezerId } = req.params;
  const response = await fetch(`https://api.deezer.com/track/${deezerId}`);
  const data = await response.json();

  if (data.preview) {
    res.json({ preview: data.preview });
  } else {
    res.status(404).json({ error: "Preview no disponible" });
  }
});

app.get("/api/buscar", async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") return res.json([]);

  const canciones = await prisma.cancion.findMany({
    where: {
      OR: [
        { titulo: { contains: q, mode: "insensitive" } },
        { artista: { nombre: { contains: q, mode: "insensitive" } } }
      ]
    },
    include: { artista: true },
    take: 50
  });

  const resultados = canciones.map(c => ({
    id: c.id,
    titulo: c.titulo,
    artista: c.artista.nombre,
    portada: c.portada,
    preview: c.urlMP3,
    deezerId: c.deezerId.toString(),
    duracion: c.duracion
  }));

  res.json(resultados);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
