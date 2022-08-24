import multer from 'multer';

function uploadFile() {
  const storage = multer.diskStorage({
    filename: function(_res, file, cb) {
      console.log(file.originalname);
      const ext = file.originalname.split(".").pop(); //TODO pdf / jpeg / mp3
      const fileName = Date.now(); //TODO 12312321321
      cb(null, fileName + '.' + ext); //TODO 123123213232.pdf
    },
    destination: function(_res, file, cb) {
      cb(null, './src/public/anexos');
    },
  });
  const upload = multer({ storage: storage }).single('myFile');
  return upload;
}
export default uploadFile;
