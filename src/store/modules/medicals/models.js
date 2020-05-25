import { EvalSectionModel } from '../evaluations/models';

class MedicalModel extends EvalSectionModel {
}

const medicalModel = new MedicalModel();
Object.freeze(medicalModel);

export {
    medicalModel
};
