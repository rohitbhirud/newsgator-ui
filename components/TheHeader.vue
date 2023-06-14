<template>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', height: '140px' }">
        <div class="flex mt-4 justify-between items-center">
            <NuxtLink to="/">
                <h1 class="logo mr-5 text-white text-2xl mb-0">
                    NewsGator
                </h1>
            </NuxtLink>

            <div class="w-4/5 flex self-center">
                <a-input-search v-model:value="value" placeholder="input search text" @search="onSearch" />
            </div>

            <div v-if="user && user.name">
                <NuxtLink to="/prefs">
                    <a-avatar style="color: #f56a00; background-color: #fde3cf">{{ user.name?.charAt(0)?.toUpperCase()
                    }}</a-avatar>
                </NuxtLink>
            </div>

            <div v-else>
                <NuxtLink to="/login">
                    <span class="text-white">Login</span>
                </NuxtLink>
            </div>

        </div>

        <div class="flex justify-center mt-1">
            <div theme="dark" class="flex">
                <div v-for="(category, index) in categories" :key="index">
                    <a @click="goToCategory(category)" class="text-white block mr-8">{{ category.toUpperCase() }}</a>
                </div>
            </div>
        </div>
    </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { useNewsGatorStore } from '~/store/newsgator.js';
import { storeToRefs } from 'pinia';


export default defineComponent({
    async setup() {
        const route = useRoute()

        console.log("🚀 ~ onSearch ~ $nuxt.$route.name:", route.path);

        const ngStore = useNewsGatorStore();

        const { categories, user } = storeToRefs(ngStore)

        await ngStore.fetchCategories()

        const value = ref<string>('');

        const onSearch = async (searchValue: string) => {
            console.log('use value', searchValue);

            await ngStore.fetchFilteredArticles(`q=${searchValue}`);

            if (route.path !== '/results') {
                await navigateTo({
                    path: '/results',
                    query: {
                        q: searchValue
                    }
                })
            }
        };

        const goToCategory = async (category: string) => {
            console.log("🚀 ~ goToCategory ~ category:", category);
            if (route.path !== '/results') {
                await navigateTo({
                    path: '/results',
                    query: {
                        category
                    }
                })
            } else {
                await ngStore.fetchFilteredArticles(`category=${category}`);
            }
        }

        return {
            selectedKeys: ref<string[]>(['2']),
            value,
            onSearch,
            categories,
            UserOutlined,
            user,
            goToCategory,
        };
    },
});
</script>

<style lang="scss" scoped></style>