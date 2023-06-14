<template>
    <div>
        <a-card title="Top Healines" style="width: 300px">
            <p>card content</p>
            <p>card content</p>
            <p>card content</p>
        </a-card>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    setup() {

        const { pending, data: posts } = useFetch('http://newsgator.test/api/articles?country=in', {
            lazy: true,
            transform: (posts: ApiResponseInterface) => {
                return posts.data.map((cat: string) => cat)
            }
        })

        return {
            pending,
            posts
        };
    },
});
</script>


<style lang="scss" scoped></style>