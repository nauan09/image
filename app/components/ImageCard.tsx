interface ImageCardProps {
  imageName?: string;
  imageUrl?: string;
  imageSize?: string;
  uploadDate?: string;
  extension?: string;
}

function formatSize(size?: string) {
  const bytes = Number(size);
  if (!bytes || isNaN(bytes)) return size ?? '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date?: string) {
  if (!date) return '';
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString('pt-BR');
}

export const ImageCard: React.FC<ImageCardProps> = ({
  imageName,
  imageUrl,
  imageSize,
  uploadDate,
  extension,
}) => {
  return (
    <div className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={imageName ?? 'Imagem'}
        className="h-56 w-full object-cover rounded-md"
      />
      <div className="card-body p-4">
        <h1 className="text-xl font-semibold mb-2 text-gray-600">
          {imageName}
        </h1>
        <p className="text-sm mb-1 text-gray-600">
          Formato: {extension}
        </p>
        <p className="text-sm mb-1 text-gray-600">
          Tamanho: {formatSize(imageSize)}
        </p>
        <p className="text-sm text-gray-600">
          Upload: {formatDate(uploadDate)}
        </p>
      </div>
    </div>
  );
};