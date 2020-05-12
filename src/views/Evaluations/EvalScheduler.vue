<template>

<div v-if="evalSection" class="eval-scheduler">
    <el-form
        ref="form"
        size="small"
        label-position="top"            
        :disabled="loading"
    >
        <div class="flex-row ae js mb-2">
            <el-form-item :label="label" class="mb-0 grow-1">            
                <el-date-picker                    
                    type="datetime"
                    :value="evalSection.scheduledAt"
                    @input="val => onParamChange({ scheduledAt: val })"  
                ></el-date-picker>
            </el-form-item>
            <el-button 
                class="ml-2"
                icon="el-icon-date" 
                size="small" 
                type="primary"
                @click="showCalendar = true"
            />
        </div>
    </el-form>

    <el-dialog
        title="Calendario de exámenes"
        :visible.sync="showCalendar"
        width="600px"
    >
        <calendar-schedule
            :schedules="schedules"
            :slots="$options.slots"
            :value="evalSection.scheduledAt"
            @input="val => onParamChange({ scheduledAt: val })" 
        />

        <span slot="footer" class="dialog-footer">
            <el-button 
                size="small" 
                icon="el-icon-close" 
                @click="showCalendar = false"
            >
                Cancelar
            </el-button>
            <el-button
                class="ml-2"
                size="small"
                type="primary"
                icon="el-icon-check"
                @click="showCalendar = false"
            >
                Confirmar
            </el-button>
        </span>
    </el-dialog>
</div>

</template>

<script>

import CalendarSchedule from '@/components/CalendarSchedule';
import params from '../params';
const spanDays = 30;

const slots = [{
    lower: '09:00',
    upper: '10:00',
    count: 2
}, {
    lower: '10:00',
    upper: '11:00',
    count: 1
}, {
    lower: '11:00',
    upper: '12:00',
    count: 3
}, {
    lower: '02:00',
    upper: '03:00',
    count: 10
}];

export default {
    name: 'EvalScheduler',

    components: {
        CalendarSchedule
    },

    props: {
        sectionId: {
            type: [Number, String],
            required: true
        },
        section: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            loading: false,
            showCalendar: false,
            currSection: null,
            schedules: {}
        };
    },

    computed: {
        state() {
            return params[this.section].store;
        },

        label() {
            return `Examen ${params[this.section].name}`;
        },

        evalSection() {
            this.$store.dispatch(`${this.state}/getItem`, this.sectionId);
            return this.$store.state[this.state].items[this.sectionId];
        }
    },

    created() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.$options.slots = slots;
        this.$options.today = today;

        this.getSchedules();
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch(`${this.state}/updateItem`, {
                item: { id: this.sectionId, ...data }, 
                persist: true
            }).then(() => {
                this.getSchedules();
            });
        },
        getSchedules() {
            const api = params[this.section].api;
            const schedules = {};
            
            const until = new Date();
            until.setHours(0, 0, 0, 0);
            until.setDate(until.getDate() + spanDays);

            api.fetch({
                'scheduled_at__gte': this.$options.today,
                'scheduled_at__lte': until,
                'fields': 'scheduled_at'
            }).then(({ data }) => {
                const items = data.results || [];
                items.forEach(item => {
                    let scheduledAt = item['scheduled_at'];
                    if (scheduledAt) {
                        scheduledAt = new Date(scheduledAt);
                        if (!isNaN(scheduledAt)) {
                            const date = scheduledAt.toISOString().substring(0, 10);
                            const time = scheduledAt.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                hour12: false
                            });
                            if (schedules[date]) {
                                schedules[date].push(time);
                            } else {
                                schedules[date] = [time];
                            }
                        }                        
                    }                    
                });
                this.schedules = schedules;
            });
        }
    }   
};

</script>

<style lang="scss">
</style>
