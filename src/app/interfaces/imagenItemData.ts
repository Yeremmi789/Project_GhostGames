interface ImageItemData {
  src: string;
  thumb: string; // Esta es la miniatura de la imagen
}

class ImageItem {
  constructor(public data: ImageItemData) {}
}
