<template>
    <div class="mt-10 flex items-center justify-center flex-col h-96">
        <div v-if="message" class="mb-8 w-2/5 ml-10">
            <a-alert :message="message" type="info" />
        </div>


        <a-form :model="formState" v-bind="layout" name="nest-messages" :validate-messages="validateMessages"
            @finish="onFinish" class="w-2/5">
            <h1 class="text-center text-3xl mb-10">Login</h1>
            <a-form-item :name="['user', 'email']" label="Email" :rules="[{ required: true, type: 'email' }]">
                <a-input v-model:value="formState.user.email" />
            </a-form-item>
            <a-form-item :name="['user', 'password']" label="Password" :rules="[{ required: true }]">
                <a-input-password v-model:value="formState.user.password" />
            </a-form-item>
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit" class="mr-8">{{ 'Login' }}</a-button>
                <NuxtLink to="/register">
                    <a-button type="info" html-type="submit">{{ 'Register' }}</a-button>
                </NuxtLink>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, reactive } from 'vue';
import { useNewsGatorStore } from '~/store/newsgator.js';

export default defineComponent({
    async setup() {
        const ngStore = useNewsGatorStore();

        const { token } = storeToRefs(ngStore)

        const message = useLoginMessage()

        if (token.value) {
            await navigateTo('/')
        }

        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        };

        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not a valid email!',
                password: '${label} is not a valid password!',
            },
        };

        const formState = reactive({
            user: {
                email: '',
                password: '',
            },
        });

        const onFinish = async (values: any) => {
            console.log('Success:', values);

            const res = await ngStore.login(values.user)

            if (res) {
                message.value = 'Login Successful!'
            } else {
                message.value = 'Wrong email or password!'
            }

            if (token.value) {
                await navigateTo('/')
            }

            return {
                token
            };
        };

        return {
            formState,
            onFinish,
            layout,
            message,
            validateMessages,
        };
    },
});
</script>
  
  