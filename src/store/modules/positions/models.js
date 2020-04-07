import { Model } from '../abstract/models';

class PositionModel extends Model {
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
        }
    }
}

const positionModel = new PositionModel();

export {
    positionModel
};
