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
import { defineComponent } from 'vue';
import { ArticleInterface } from '~/interfaces/response';
import { useArticlesStore } from '~/store/articles';

export default defineComponent({
    props: {
        articles: Object
    },

    async setup() {
        const { fetchArticles, articles } = useArticlesStore();

        await fetchArticles()

        let articlesWithImage: ArticleInterface[] = [];
        let articlesWithoutImage: ArticleInterface[] = [];

        articles?.forEach((article, index) => {
            if (index === 0 || index === 3) {
                articlesWithImage.push(article)
            } else {
                articlesWithoutImage.push(article)
            }
        })

        return {
            articles,
            articlesWithImage,
            articlesWithoutImage
        };
    },
});
</script>


<style lang="scss" scoped></style>