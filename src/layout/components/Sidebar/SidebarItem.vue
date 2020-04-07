<template>
    <div v-if="!item.hidden" class="sidebar-item">
        <template v-if="!hasChildren">
            <router-link v-if="item.meta && item.route" :to="item.route">
                <el-menu-item
                    :index="item.key"
                    :class="{ 'submenu-title-noDropdown': !isNest }"
                >
                    <item
                        :icon="item.meta.icon"
                        :title="item.meta.title"
                    />
                </el-menu-item>
            </router-link>
            <el-menu-item
                v-else-if="item.meta"
                :index="item.key"
                :class="{ 'submenu-title-noDropdown': !isNest }"
            >
                <item
                    :icon="item.meta.icon"
                    :title="item.meta.title"
                />
            </el-menu-item>
        </template>

        <el-submenu
            v-else
            ref="subMenu"
            :index="item.key"
            popper-append-to-body
        >
            <template slot="title">
                <item
                    v-if="item.meta"
                    :icon="item.meta && item.meta.icon"
                    :title="item.meta.title"
                />
            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="child.key"
                :is-nest="true"
                :item="child"
                class="nest-menu"
            />
        </el-submenu>
    </div>
</template>

<script>
import Item from './Item';
import FixiOSBug from './FixiOSBug';

export default {
    name: 'SidebarItem',
    components: { Item },
    mixins: [FixiOSBug],
    props: {
        // route object
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },

    computed: {
        hasChildren() {
            if (this.item.children) {
                const children = this.item.children.filter(item => {
                    if (item.hidden) {
                        return false;
                    } else {
                        return true;
                    }
                });
                if (children.length) {
                    return true;
                }
            }            
            return false;
        }
    }
};
</script>

<style lang="scss">

.sidebar-item {
    a {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        font-size: 14px;
        font-weight: 600;
    }
    .el-submenu__title {
        font-size: 14px;
        font-weight: 600;
    }
}
</style>
