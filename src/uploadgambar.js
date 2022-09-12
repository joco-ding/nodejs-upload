import { MIMETYPE, UPLOADPATH } from "./config.js"
import { v4 as uuidv4 } from 'uuid'
import { existsSync } from "fs"
import { isValidToken } from "./users.js"

const uploadgambar = async (req, res) => {
  if (await isValidToken(req, res) === '') return

  let ok = false
  let message = 'Gagal'
  let data = {}

  try {
    if (!req.files) {
      message = 'File gambar harus disertakan'
      res.status(400).json({ ok, message, data })
      return
    }
    const gambar = req.files.gambar
    if (!MIMETYPE.includes(gambar.mimetype)) {
      message = 'File harus berupa gambar dengan ektensi yang sudah ditentukan'
      res.status(400).json({ ok, message, data })
      return
    }
    let ekstensi = 'jpg'
    switch (gambar.mimetype) {
      case 'image/gif':
        ekstensi = 'gif'
        break;
      case 'image/png':
        ekstensi = 'png'
        break;
    }
    let lokasifilegambar = ''
    while (true) {
      lokasifilegambar = `${UPLOADPATH}/` + uuidv4() + `.${ekstensi}`
      if (!existsSync(lokasifilegambar)) break
    }
    gambar.mv(lokasifilegambar)
    ok = true
    message = 'Gambar berhasil diupload'
    data = {
      name: gambar.name,
      mimetype: gambar.mimetype
    }
  } catch (error) {
    res.status(500).json({ ok, message: 'Terdapat kesalahan', data: error })
  }
  res.json({ ok, message, data })
}

export default uploadgambar