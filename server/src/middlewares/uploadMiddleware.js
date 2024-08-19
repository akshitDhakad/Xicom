import multer from "multer";
import path from "path";

// Multer configuration
const storage = multer.diskStorage({
    distination: function(req, file, cb){
        const uploadPath = path.resolve("public", "uploads");
        cb(null, uploadPath); 
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
})

// File filters tp ensure only certain file types are allowed

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type .Only JPEG , PNG and PDF files are allowed."));
    }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});

export default upload;