import multer from 'multer';

function uploadFile() {
  const storage = multer.diskStorage({
    filename: function(_res, file, cb) {
      console.log(file.originalname);
      const ext = file.originalname.split(".").pop();
      const fileName = Date.now();
      cb(null, fileName + '.' + ext);
    },
    destination: function(_res, _file, cb) {
      cb(null, './src/public/anexos');
    },
  });
  const upload = multer({ storage: storage }).single('myFile');
  return upload;
}
export default uploadFile;
