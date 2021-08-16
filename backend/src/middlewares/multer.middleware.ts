import multer from "multer";
let tradeFields = ['entry', 'exit', 'trade']

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname === 'avatar')
      cb(null, 'uploads/avatar/')

    if(tradeFields.includes(file.fieldname))
      cb(null, 'uploads/trades/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  }
})

export const formBody = multer({
  storage
})