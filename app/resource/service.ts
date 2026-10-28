import { Image } from "./image";

export class ImageService {
  baseURL: string = 'http://localhost:8080/images';

  async buscar(query: string = '', extension: string = ''): Promise<Image[]> {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (extension) params.append('extension', extension);

    const url = `${this.baseURL}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar imagens (status ${response.status})`);
    }

    return await response.json();
  }
}

// React Hook
export const useImageService = () => new ImageService();