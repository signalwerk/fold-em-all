import imageExtensions from 'image-extensions'

export const isImage = (url) => {
  return !!imageExtensions.find(url.endsWith)
}
