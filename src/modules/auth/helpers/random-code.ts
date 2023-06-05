export const generateRandomCode = (length = 20): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const indiceAleatorio = Math.floor(Math.random() * characters.length);
    code += characters.charAt(indiceAleatorio);
  }

  return code;
};
