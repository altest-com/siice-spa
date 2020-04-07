import { booleanFieldModel } from '@/store/modules/boolean-fields/models';
import { charFieldModel } from '@/store/modules/char-fields/models';
import { choicesFieldModel } from '@/store/modules/choices-fields/models';
import { dateFieldModel } from '@/store/modules/date-fields/models';
import { dateTimeFieldModel } from '@/store/modules/datetime-fields/models';
import { floatFieldModel } from '@/store/modules/float-fields/models';
import { imagesFieldModel } from '@/store/modules/images-fields/models';
import { integerFieldModel } from '@/store/modules/integer-fields/models';
import { textFieldModel } from '@/store/modules/text-fields/models';
import { timeFieldModel } from '@/store/modules/time-fields/models';
import { booleanValueModel } from '@/store/modules/boolean-values/models';
import { charValueModel } from '@/store/modules/char-values/models';
import { choicesValueModel } from '@/store/modules/choices-values/models';
import { dateValueModel } from '@/store/modules/date-values/models';
import { dateTimeValueModel } from '@/store/modules/datetime-values/models';
import { floatValueModel } from '@/store/modules/float-values/models';
import { imagesValueModel } from '@/store/modules/images-values/models';
import { integerValueModel } from '@/store/modules/integer-values/models';
import { textValueModel } from '@/store/modules/text-values/models';
import { timeValueModel } from '@/store/modules/time-values/models';

import filters from '@/filters';

export const params = {
    boolean: {
        fieldStore: 'booleanFields',
        fieldModel: booleanFieldModel,
        valueStore: 'booleanValues',
        valueModel: booleanValueModel,
        valueRender(data) {
            return data.value ? 'Sí' : 'No';
        }
    }, 
    char: {
        fieldStore: 'charFields',
        fieldModel: charFieldModel,
        valueStore: 'charValues',
        valueModel: charValueModel,
        valueRender(data) {
            return data.value;
        }
    }, 
    choices: {
        fieldStore: 'choicesFields',
        fieldModel: choicesFieldModel,
        valueStore: 'choicesValues',
        valueModel: choicesValueModel,
        valueRender(data) {
            return data.value.join();
        }
    }, 
    date: {
        fieldStore: 'dateFields',
        fieldModel: dateFieldModel,
        valueStore: 'dateValues',
        valueModel: dateValueModel,
        valueRender(data) {
            const value = data.value;
            return value ? filters.dateFilter(data.value) : '';
        }
    }, 
    datetime: {
        fieldStore: 'dateTimeFields',
        fieldModel: dateTimeFieldModel,
        valueStore: 'dateTimeValues',
        valueModel: dateTimeValueModel,
        valueRender(data) {
            const value = data.value;
            return value ? filters.dateTimeFilter(data.value) : '';
        }
    }, 
    float: {
        fieldStore: 'floatFields',
        fieldModel: floatFieldModel,
        valueStore: 'floatValues',
        valueModel: floatValueModel,
        valueRender(data) {
            const value = data.value;
            return value || value === 0 ? value : '';
        }
    }, 
    image: {
        fieldStore: 'imagesFields',
        fieldModel: imagesFieldModel,
        valueStore: 'imagesValues',
        valueModel: imagesValueModel,
        valueRender(data) {
            const value = data.value;
            return value.length ? value[0] : '';
        }
    }, 
    integer: {
        fieldStore: 'integerFields',
        fieldModel: integerFieldModel,
        valueStore: 'integerValues',
        valueModel: integerValueModel,
        valueRender(data) {
            const value = data.value;
            return value || value === 0 ? value : '';
        }
    }, 
    text: {
        fieldStore: 'textFields',
        fieldModel: textFieldModel,
        valueStore: 'textValues',
        valueModel: textValueModel,
        valueRender(data) {
            return data.value;
        }
    }, 
    time: {
        fieldStore: 'timeFields',
        fieldModel: timeFieldModel,
        valueStore: 'timeValues',
        valueModel: timeValueModel,
        valueRender(data) {
            return filters.timeFilter(data.value);
        }
    }
};
