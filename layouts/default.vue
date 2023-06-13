<template>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center' }">
            <h1 class="logo mr-5 text-white text-2xl mb-0">
                NewsGator
            </h1>
            <a-input-search v-model:value="value" placeholder="input search text" style="width: 200px" @search="onSearch" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
                <a-menu-item key="1">nav 1</a-menu-item>
                <a-menu-item key="2">nav 2</a-menu-item>
                <a-menu-item key="3">nav 3</a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
            <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">Content</div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
            Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {

        const value = ref<string>('');

        const onSearch = (searchValue: string) => {
            console.log('use value', searchValue);
            console.log('or use this.value', value.value);
        };

        return {
            selectedKeys: ref<string[]>(['2']),
            value,
            onSearch,
        };
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