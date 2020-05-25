import { Model, readers, writers } from 'vrudex';
import { evalSectionModel } from '../evaluations/models';

class SocioeconomicModel extends Model {
    DIGI_ENTRY_EMPTY = ''

    DIGI_ENTRY_CHOICES = {
        [this.DIGI_ENTRY_EMPTY]: 'No definido'
    }

    ID_TYPE_EMPTY = ''
    ID_TYPE_INE = 'ine'
    ID_TYPE_PASSPORT = 'passport'

    ID_TYPE_CHOICES = {
        [this.ID_TYPE_EMPTY]: 'No definido',
        [this.ID_TYPE_INE]: 'INE',
        [this.ID_TYPE_PASSPORT]: 'Pasaporte'
    }

    props = Object.assign({}, evalSectionModel.props, {
        digiEntry: {
            writable: true,
            api: 'digi_entry',
            type: String,
            choices: Object.keys(this.DIGI_ENTRY_CHOICES)
        },
        digiDate: {
            writable: true,
            api: 'digi_date',
            type: Date,
            reader: readers.dateReader,
            writer: writers.dateWriter
        },
        digiIdType: {
            writable: true,
            api: 'digi_id_type',
            type: String,
            choices: Object.keys(this.ID_TYPE_CHOICES)
        },
        digiIdNumber: {
            writable: true,
            api: 'digi_id_number',
            type: String
        },
        digiImage: {
            writable: true,
            api: 'digi_image',
            type: Number
        }        
    })
}

const socioeconomicModel = new SocioeconomicModel();
Object.freeze(socioeconomicModel);

export {
    socioeconomicModel
};
