<template>
    <a-layout>
        <TheHeader />
        <a-layout-content :style="{ padding: '0 50px', marginTop: '160px' }">
            <slot />
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
            NewsGator ©2023
        </a-layout-footer>
    </a-layout>
</template>

<script lang="ts">
import { useNewsGatorStore } from '~/store/newsgator.js';

export default defineComponent({
    async setup() {
        const { fetchUserPreferences } = useNewsGatorStore();

        await fetchUserPreferences()
    },
});

</script>

<style>
#components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>