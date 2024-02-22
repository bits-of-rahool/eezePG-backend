import multer from "multer";
import { v4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix  = v4();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).array('photos', 5);

export { upload };

