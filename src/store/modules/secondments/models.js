import { Model } from '../abstract/models';

class SecondmentModel extends Model {
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
        dependency: {
            writable: true,
            api: 'dependency',
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

const secondmentModel = new SecondmentModel();

export {
    secondmentModel
};
