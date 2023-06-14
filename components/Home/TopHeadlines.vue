<template>
    <div>
        <a-card title="Top Healines">
            <a-row :gutter="[16, 16]">
                <a-col :span="10">
                    <div v-for="(article, index) in articlesWithImage" :key="index" class="mb-4">
                        <HomeTopArticleWithImage :article="article" />
                    </div>
                </a-col>

                <a-col :span="14">
                    <div v-for="(article, index) in articlesWithoutImage" :key="index" class="mb-4">
                        <HomeTopSingleArticle :article="article" />
                    </div>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>


<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { ArticleInterface } from '~/interfaces/response';
import { useNewsGatorStore } from '~/store/newsgator.js';

export default defineComponent({
    props: {
        articles: Object
    },

    async setup() {
        const ngStore = useNewsGatorStore();

        const { articles } = storeToRefs(ngStore)

        await ngStore.fetchArticles()

        let articlesWithImage: ArticleInterface[] = [];
        let articlesWithoutImage: ArticleInterface[] = [];

        if (articles.value && Array.isArray(articles.value)) {
            articles.value.forEach((article, index) => {
                if (index === 0 || index === 3) {
                    articlesWithImage.push(article)
                } else {
                    articlesWithoutImage.push(article)
                }
            })
        }


        return {
            articlesWithImage,
            articlesWithoutImage
        };
    },
});
</script>


<style lang="scss" scoped></style>