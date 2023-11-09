import mongoose from 'mongoose';

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEMORY_PATH = path.join('/uploads');

const memorySchema = new mongoose.Schema({
    userRef:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    collectionRef:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    },
    image: 
    {
        // stores addreses
        type: String
    },
    encrypted: 
    {   
        type: Boolean,
        default: false
    },
    tags: [{
        type : String,
    }],
    tag:{
        type: String
    }
},{
    timestamps : true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', MEMORY_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg';
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});


// static functions

memorySchema.statics.uploadedImage = multer({storage: storage}).single('image');
memorySchema.statics.memoryPath = MEMORY_PATH;

const Memory = mongoose.model('Memory',memorySchema);
export default Memory;
