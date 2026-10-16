'use client'
import { Template, ImageCard } from '../components';
import { useImageService } from '../resource/service';
import { useState, useEffect } from 'react';
import { Image } from '../resource/image';

export default function Galeria() {

  const useService = useImageService();
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [extension, setExtension] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  async function searchImages() {
    setLoading(true);
    setError('');
    try {
      const result = await useService.buscar(query, extension);
      setImages(result);
      console.table(result);
    } catch (err) {
      console.error('Erro ao buscar imagens:', err);
      setError('Não foi possível carregar as imagens. Verifique se o servidor está rodando.');
      setImages([]);
    } finally {
      setLoading(false);
    }
  }

  // Carrega as imagens assim que a página abre
  useEffect(() => {
    searchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderImageCard(image: Image) {
    return (
      <ImageCard
        key={image.url}
        imageName={image.name}
        imageUrl={image.url}
        imageSize={`${image.size}`}
        uploadDate={image.uploadDate}
        extension={image.extension}
      />
    );
  }

  function renderImageCards() {
    return images.map(renderImageCard);
  }

  function renderContent() {
    if (loading) {
      return <p className="col-span-full text-center text-gray-500">Carregando...</p>;
    }
    if (error) {
      return <p className="col-span-full text-center text-red-500">{error}</p>;
    }
    if (images.length === 0) {
      return <p className="col-span-full text-center text-gray-500">Nenhuma imagem encontrada.</p>;
    }
    return renderImageCards();
  }

  return (
    <Template>
      <section className="flex flex-col items-center justify-center my-5">
        <div className="flex flex-wrap justify-center gap-4">
          <input
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
            onKeyDown={event => { if (event.key === 'Enter') searchImages(); }}
            className="border px-4 py-2 rounded-lg"
            placeholder="Buscar imagens..."
          />

          <select
            value={extension}
            onChange={event => setExtension(event.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="">All formats</option>
            <option value="PNG">PNG</option>
            <option value="JPG">JPG</option>
            <option value="JPEG">JPEG</option>
            <option value="GIF">GIF</option>
          </select>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={searchImages}
          >
            Search
          </button>

          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Add New
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {renderContent()}
      </section>
    </Template>
  );
}