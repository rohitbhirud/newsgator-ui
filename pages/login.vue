<template>
    <div class="mt-10 flex items-center justify-center h-96">
        <div v-if="message" class="mb-8 w-2/5 ml-10">
            <a-alert :message="message" type="error" />
        </div>

        <a-form :model="formState" v-bind="layout" name="nest-messages" :validate-messages="validateMessages"
            @finish="onFinish" class="w-2/5">
            <a-form-item :name="['user', 'email']" label="Email" :rules="[{ required: true, type: 'email' }]">
                <a-input v-model:value="formState.user.email" />
            </a-form-item>
            <a-form-item :name="['user', 'password']" label="Password" :rules="[{ required: true }]">
                <a-input-password v-model:value="formState.user.password" />
            </a-form-item>
            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">{{ isLogin ? 'Login' : 'Register' }}</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useNewsGatorStore } from '~/store/newsgator.js';

export default defineComponent({
    async setup() {
        const { login, token } = useNewsGatorStore();

        let isLogin = true;

        if (token) {
            await navigateTo('/')
        }

        const message = useSuccessMessage()

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

            try {
                await login(values.user)
                await navigateTo('/')
            } catch (error) {
                console.log("🚀 ~ onFinish ~ error:", error);
                message.value = 'Wrong email or password!'
            }

            return {
                token
            };
        };

        return {
            formState,
            onFinish,
            isLogin,
            layout,
            message,
            validateMessages,
        };
    },
});
</script>
  
  