-- CreateTable
CREATE TABLE "Artista" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Artista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cancion" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "duracion" TEXT NOT NULL,
    "portada" TEXT NOT NULL,
    "artistaId" INTEGER NOT NULL,
    "urlMP3" TEXT NOT NULL,

    CONSTRAINT "Cancion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cancion" ADD CONSTRAINT "Cancion_artistaId_fkey" FOREIGN KEY ("artistaId") REFERENCES "Artista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
