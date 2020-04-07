import { Model } from '../abstract/models';

class DependencyModel extends Model {
    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        name: {
            writable: true,
            api: 'name',
            type: String
        },
        corporation: {
            writable: true,
            api: 'corporation',
            type: Number
        },
        createdAt: {
            writable: false,
            api: 'created_at',
            type: Date
        },
        updatedAt: {
            writable: false,
            api: 'updated_at',
            type: Date
        }
    }
}

const dependencyModel = new DependencyModel();

export {
    dependencyModel
};
