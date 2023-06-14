<template>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', height: '140px' }">
        <div class="flex mt-4 justify-between items-center">
            <h1 class="logo mr-5 text-white text-2xl mb-0">
                NewsGator
            </h1>

            <div class="w-4/5 flex self-center">
                <a-input-search v-model:value="value" placeholder="input search text" @search="onSearch" />
            </div>

            <div>
                <a-avatar size="medium">
                    <template #icon>
                        <UserOutlined />
                    </template>
                </a-avatar>
            </div>

        </div>

        <div class="flex justify-center mt-1">
            <!-- you will need to handle a loading state -->
            <div v-if="pending">
                Loading ...
            </div>
            <div v-else>
                <a-menu v-model:selectedKeys="selectedKeys" theme="dark" class="flex">
                    <div v-for="(category, index) in categories" :key="index">
                        <a-menu-item key={{ index }}>{{ category.toUpperCase() }}</a-menu-item>
                    </div>
                </a-menu>
            </div>
        </div>
    </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { ApiResponseInterface } from '~/interfaces/response';


export default defineComponent({
    setup() {

        const { pending, data: categories } = useFetch('http://newsgator.test/api/articles/categories', {
            lazy: true,
            transform: (cats: ApiResponseInterface) => {
                return cats.data.map((cat: string) => cat)
            }
        })

        const value = ref<string>('');

        const onSearch = (searchValue: string) => {
            console.log('use value', searchValue);
            console.log('or use this.value', value.value);
        };

        return {
            selectedKeys: ref<string[]>(['2']),
            value,
            onSearch,
            pending,
            categories,
            UserOutlined
        };
    },
});
</script>

<style lang="scss" scoped></style>