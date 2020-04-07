<template>
    <div class="sidebar-logo-container" :class="{ collapse: collapse }">
        <transition name="sidebarLogoFade">
            <router-link
                v-if="collapse"
                key="collapse"
                class="sidebar-logo-link"
                to="/"
            >
                <img :src="logo" class="sidebar-logo" />
            </router-link>
            <router-link v-else key="expand" class="sidebar-logo-link" to="/">
                <img v-if="logo" :src="logo" class="sidebar-logo" />
                <h1 class="sidebar-title">{{ title }}</h1>
            </router-link>
        </transition>
    </div>
</template>

<script>
import settings from '@/settings';

export default {
    name: 'SidebarLogo',
    props: {
        collapse: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            title: settings.title,
            logo: require('@/assets/images/logo.png')
        };
    }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
    opacity: 0;
}

.sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 70px;
    line-height: 70px;
    overflow: hidden;
    padding-left: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & .sidebar-logo-link {
        display: flex;
        align-items: flex-end;

        & .sidebar-logo {
            height: 32px;
            vertical-align: middle;
            margin-right: 12px;
        }

        & .sidebar-title {
            margin-bottom: 0;
            font-weight: 600;
            font-size: 20px;
        }
    }

    &.collapse {
        text-align: center;
        padding-left: 0;
        justify-content: center;
        .sidebar-logo {
            margin-right: 0px;
        }
    }
}
</style>
