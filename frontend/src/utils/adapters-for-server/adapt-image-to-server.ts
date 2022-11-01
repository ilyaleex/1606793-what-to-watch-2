export const adaptImageToServer = (file: File) => {
  const formData = new FormData();
  formData.set('avatar', file);

  return formData;
};
