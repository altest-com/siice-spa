<template>

<div class="alerts-timeline">

    <div class="flex-row as mt-3 mb-4">
        <el-button
            :disabled="!message"
            round
            type="primary"
            class="alert-button"
            @click="onSendAlert" 
        >
            Enviar
            <i class="el-icon-arrow-right el-icon-right"></i>
        </el-button>
        <el-input
            v-model="message"            
            type="textarea"
            :rows="4"
            class="alert-input"                           
        />
    </div>

    <div v-if="alerts.length" class="alerts">
        <ul>
            <li 
                v-for="alert in alerts" 
                :key="alert.id"
            >
                <span/>
                <div class="info"> {{ alert.info }} </div>
                <div class="name">
                    - Andrea Vázquez, {{ sectionLabels[alert.section] }} -
                </div>
                <div class="time">
                    <span> {{ alert.createdAt | dateTimeFilter }} </span>
                </div>
            </li>
        </ul>
    </div>
    
</div>

</template>

<script>

import { mapGetters } from 'vuex';
import { alertModel } from '@/store/modules/alerts/models';

export default {
    name: 'AlertsTimeline',

    components: {
    },

    props: {
        evaluationId: {
            type: [String, Number],
            required: true
        },
        section: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            message: '',
            sectionLabels: alertModel.SECTION_CHOICES
        };
    },

    computed: {
        ...mapGetters({
            alerts: 'alerts/sortedItems'
        })
    },

    created() {
        this.$store.dispatch('alerts/resetFilter');
        this.$store.dispatch('alerts/setFilter', { 
            evaluation: this.evaluationId
        });
        this.$store.dispatch('alerts/fetchItems');
    },

    methods: {
        onSendAlert() {
            if (this.message) {
                const alert = alertModel.create();
                alert.info = this.message;
                alert.evaluation = this.evaluationId;
                alert.section = this.section;

                this.$store.dispatch('alerts/createItem', {
                    persist: true,
                    item: alert
                }).then(() => {
                    this.message = '';
                    this.$store.dispatch('alerts/fetchItems');
                });
            }
        }
    }
};
</script>

<style lang="scss">

.alerts-timeline {

    .alert-button {
        width: 140px;
        margin-left: 40px;
        margin-right: 30px;
        flex-shrink: 0;
    }

    .alert-input {
        width: 350px
    }

    .alerts {
        margin-left: 150px;
        position: relative;

        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            transition: all 0.5s linear;
        }

        ul:before {
            content: "";
            display: block;
            width: 0;
            height: 100%;
            border: 1px dashed #909399;
            position: absolute;
            top: 0;
            left: 30px
        }

        ul li {
            margin: 20px 60px 60px;
            position: relative;
            padding: 10px 20px;
            background:#ecf5ff;
            border-radius: 10px;
            line-height: 20px;
            width: 350px
        }

        ul li {
            border-top-left-radius: 0;
        }

        ul li > span {
            content: "";
            display: block;
            width: 0;
            height: 100%;
            border: 1px solid #304aff;
            position: absolute;
            top:0;
            left: -30px
        }

        ul li > span:before, ul li > span:after {
            content: "";
            display: block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background:#304aff;
            position: absolute;
            left: -6px
        }
        ul li > span:before {
            top:-10px
        }
        ul li > span:after {
            top:95%
        }
        .info {
            font-size: 14px;
        }
        .info:first-letter{
            text-transform: capitalize;
            line-height: 1.7
        }
        .name{
            margin-top: 10px;
            text-transform: capitalize;
            font-style: italic;
            font-size: 12px;
            text-align: right;
            margin-right: 20px
        }
        .time span{
            position: absolute;
            left: -170px;
            color:#909399;
            font-size: 12px;
            font-weight: bold;
        }
        .time span {
            top: -12px
        }
    }
}

</style>
