<template>
    <div>
        <NuxtLink :to="article.url">
            <a-card :bordered="false" class="hover:underline">
                <template #cover>
                    <img :alt="article.title" :src="article.urlToImage" />
                </template>
                <div class="mb-2">
                    {{ article.source.name }}
                </div>
                <a-card-meta :title="article.title">
                    <template #description>{{ getTimeSince(article.publishedAt) }}</template>
                </a-card-meta>
            </a-card>
        </NuxtLink>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ArticleInterface } from '~/interfaces/response';

export default defineComponent({
    props: {
        article: Object,
    },
    setup(props) {
        // You can access the article data using the props.article property
        const article = props?.article as ArticleInterface

        return {
            article,
        };
    },
});
</script>

<style lang="scss" scoped></style>