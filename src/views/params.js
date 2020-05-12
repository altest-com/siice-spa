import { socioeconomicsApi } from '@/store/modules/socioeconomics';
import { medicalsApi } from '@/store/modules/medicals';
import { toxicologicalsApi } from '@/store/modules/toxicologicals';
import { psychologicalsApi } from '@/store/modules/psychologicals';
import { polygraphicsApi } from '@/store/modules/polygraphics';

export default {
    'socioeconomic': {
        name: 'Socioeconómico',
        store: 'socioeconomics',
        api: socioeconomicsApi
    },
    'medical': {
        name: 'Médico',
        store: 'medicals',
        api: medicalsApi
    },
    'toxicological': {
        name: 'Toxicológico',
        store: 'toxicologicals',
        api: toxicologicalsApi
    },
    'psychological': {
        name: 'Psicológico',
        store: 'psychologicals',
        api: psychologicalsApi
    },
    'polygraphic': {
        name: 'Poligráfico',
        store: 'polygraphics',
        api: polygraphicsApi
    }
};

