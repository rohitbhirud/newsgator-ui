<template>
    <div v-if="message" class="mb-8 w-2/5 ml-10">
        <a-alert :message="message" type="success" />
    </div>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="Categories">
            <a-checkbox-group v-model:value="formState.categories">
                <div class="flex flex-wrap">
                    <div v-for="(category, index) in categories" :key="index" class="mr-4 mb-2">
                        <a-checkbox :value="category" name="category">{{ category?.toUpperCase() }}</a-checkbox>
                    </div>
                </div>
            </a-checkbox-group>
        </a-form-item>

        <a-form-item label="Sources">
            <a-checkbox-group v-model:value="formState.sources">
                <div class="flex flex-wrap">
                    <div v-for="(source, index) in sources" :key="index" class="mr-4 mb-2">
                        <a-checkbox :value="source.id" name="source">{{ source?.name?.toUpperCase() }}</a-checkbox>
                    </div>
                </div>
            </a-checkbox-group>
        </a-form-item>

        <a-form-item>
            <a-button type="primary" @click="onSubmit">Save</a-button>
        </a-form-item>
    </a-form>

    <a-form :model="logOutState">
        <a-form-item>
            <a-button type="danger" @click="onLogout">Logout</a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue';
import { useNewsGatorStore } from '~/store/newsgator.js';
import type { UnwrapRef } from 'vue';
import { storeToRefs } from 'pinia';

interface FormState {
    categories: string[];
    sources: string[];
}
export default defineComponent({
    async setup() {

        const ngStore = useNewsGatorStore();

        const { categories, sources, preferences } = storeToRefs(ngStore)

        const message = useSuccessMessage();

        await ngStore.fetchSources();

        const formState: UnwrapRef<FormState> = reactive({
            categories: preferences.value.categories.split(','),
            sources: preferences.value.sources.split(','),
        });

        const logOutState = reactive({
            user: {},
        });

        const onSubmit = async () => {

            const data = {
                categories: formState.categories.join(','),
                sources: formState.sources.join(',')
            }

            try {
                await ngStore.savePrefs(data)
                message.value = 'Saved successfully';
            } catch (error) {
                console.log("🚀 ~ onSubmit ~ error:", error);
            }
        };

        const onLogout = async () => {
            await ngStore.logout()
            await navigateTo('/')
        };

        return {
            labelCol: { style: { width: '80px' } },
            wrapperCol: { span: 14 },
            formState,
            logOutState,
            onSubmit,
            onLogout,
            categories,
            sources,
            message
        };
    },

});
</script>
  
  