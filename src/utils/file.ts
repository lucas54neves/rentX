import fs from 'fs'

export async function deleteFile(filename: string) {
  // Verifica se o arquivo existe
  try {
    await fs.promises.stat(filename)
  } catch {
    return
  }

  // Remove o arquivo se ele existir
  await fs.promises.unlink(filename)
}
