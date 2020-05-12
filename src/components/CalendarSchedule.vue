<template>

<div class="calendar-schedule">
    <el-calendar :value="value" @input="onInputDate">
        <template slot="dateCell" slot-scope="{ data }">
            <div class="day">
                {{ data.day.split('-')[2] }}
            </div>
            <div
                v-if="isDayEnabled(data.day)"
                class="day-data" 
                :style="{backgroundColor: getDayColor(data.day)}"
            >
                {{ getDaySlots(data.day) }} turnos
            </div>
        </template>
    </el-calendar>

    <div>
        <el-select size="small" :value="time" @change="onChangeTime">
            <el-option
                v-for="(choice, index) in timeChoices"
                :key="index"
                :label="choice.lower"
                :value="choice.lower"
                :disabled="choice.count <= choice.used"
            >
                <span style="float: left">{{ choice.lower }}</span>
                <span style="float: right; font-weight: 700; font-size: 13px">
                    {{ choice.count - choice.used }} turnos
                </span>
            </el-option>
        </el-select>
    </div>
</div>

</template>

<script>

function hourToSeconds(hour) {
    const parts = hour.split(':');
    const mult = [3600, 60, 1];
    let seconds = 0;
    for (let i = 0; i < 3; i++) {
        const part = +parts[i];
        if (!isNaN(part)) {
            seconds += (Math.min(24, Math.max(0, part))) * mult[i]; 
        }               
    }
    return seconds;
}

const colors = ['#f56c6c', '#ff965c', '#3dc178'];

/* function secondsToHour(seconds) {
    const date = new Date(1000 * seconds);
    return isNaN(date) ? '00:00' : date.toISOString().substr(11, 5);
}
 */
export default {
    name: 'CalendarSchedule',

    props: {
        value: {
            type: [Date, String, Number],
            default: () => { return new Date(); }
        },
        slots: {
            type: Array,
            default: () => { return []; }
        },
        schedules: {
            type: Object,
            default: () => { return {}; }
        },
        notDays: {
            type: Array,
            default: () => { return [0, 6]; }
        }
    },

    data() {
        return {
        };
    },

    computed: {

        date() {
            const date = new Date(this.value);
            return isNaN(date) ? new Date() : date; 
        },

        isoDate() {
            return this.date.toISOString().substring(0, 10);
        },

        time() {
            return this.date.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false
            });
        },

        timeChoices() {
            const schedule = this.schedules[this.isoDate];
            let scheduleTime = [];

            if (schedule) {
                scheduleTime = schedule.map(hour => hourToSeconds(hour));
            }

            return this.slotsTime.map(slot => {
                let used = 0;
                const lower = slot.lowerTime;
                const upper = slot.upperTime;
                scheduleTime.forEach(time => {
                    if (time >= lower && time < upper) {
                        used++; 
                    }
                });
                return {
                    lower: slot.lowerLabel,
                    upper: slot.upperLabel,
                    count: slot.count,
                    used: used
                };
            });
        },

        slotsTime() {
            return this.slots.map(slot => {
                return {
                    lowerLabel: slot.lower,
                    upperLabel: slot.upper,
                    lowerTime: hourToSeconds(slot.lower),
                    upperTime: hourToSeconds(slot.upper),
                    count: slot.count
                };
            });
        },

        slotsTotal() {
            let count = 0;
            this.slots.forEach(slot => {
                count += slot.count;
            });
            return count;
        }
    },

    created() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        this.$options.today = today;
    },

    methods: {
        onInputDate(val) {
            const date = val.toISOString().substring(0, 10);
            if (this.isDayEnabled(date)) {
                this.$emit('input', new Date(`${date}T${this.time}:00`));
            }
        },

        onChangeTime(time) {
            this.$emit('input', new Date(`${this.isoDate}T${time}:00`));
        },

        isDayEnabled(date) {
            date = new Date(date + 'T00:00:00');
            return (
                date >= this.$options.today && 
                !this.notDays.includes(date.getDay())
            );
        },

        getDaySlots(date) {
            const schedule = this.schedules[date];
            if (schedule) {
                return this.slotsTotal - schedule.length;
            }
            return this.slotsTotal;
        },

        getDayColor(date) {
            const schedule = this.schedules[date];
            if (schedule) {
                const ratio = 1 - schedule.length / this.slotsTotal;
                const n = colors.length;
                for (let i = 0; i < n; i++) {
                    if (ratio < (i + 1) / n) {
                        return colors[i];
                    }                
                }
            }
            return colors[2];
        }
    }
};
</script>

<style lang="scss">

.calendar-schedule {
    .day-data {
        margin: auto;
        font-size: 12px;
        padding: 0 4px;
        border-radius: 4px;
        color: #fff;
    }
    .el-calendar__header, .el-calendar__body {
        padding-left: 0;
        padding-right: 0;
    }
    .el-calendar-day {
        height: 64px;
        font-size: 13px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .el-calendar-table td {
        &.is-selected {
            background-color: #ecf5ff;
            .day {
                font-weight: 700;
            }
        }
        &:hover {
            background-color: #f5f7fa;
        }
    }
}

</style>
