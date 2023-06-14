<template>
    <div>
        <a-card title="Local News">
            <div v-for="(article, index) in articles" :key="index" class="mb-4">
                <a-row :gutter="[16, 20]">
                    <a-col :span="18">
                        <div class="pr-8">
                            <span>{{ article.source.name }}</span>
                            <div class="mt-1 mb-2">{{ article.title }}</div>
                            <span>{{ getTimeSince(article.publishedAt) }}</span>
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <img :src="article.urlToImage" class="rounded" />
                    </a-col>
                </a-row>
            </div>
        </a-card>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useArticlesStore } from '~/store/articles';

export default defineComponent({
    props: {
        articles: Object
    },

    async setup() {
        const { fetchArticles, articles } = useArticlesStore();

        await fetchArticles()

        return {
            articles
        };
    },
});
</script>


<style lang="scss" scoped></style>