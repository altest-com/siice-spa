import { Model } from '../abstract/models';

class FileModel extends Model {
    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        file: {
            writable: false,
            api: 'file',
            type: String
        },
        sizeBytes: {
            writable: false,
            api: 'size_bytes',
            type: Number
        }
    }
}

const fileModel = new FileModel();

export {
    FileModel,
    fileModel
};
