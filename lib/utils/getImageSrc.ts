export function getImageSrc(image?: Uint8Array | null) {
  if (!image) return '/dog-default.jpg';
  const imageBase64 = Buffer.from(image).toString('base64');
  return `data:image/jpeg;base64,${imageBase64}`;
}
