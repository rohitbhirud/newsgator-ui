<template>
    <div>
        <a-card title="Search Results">
            <div v-for="(article, index) in filteredArticles" :key="index" class="mb-4">
                <a-row :gutter="[16, 20]">
                    <a-col :span="4">
                        <img :src="article.urlToImage" class="rounded" />
                    </a-col>
                    <a-col :span="18">
                        <NuxtLink :to="article.url">
                            <div class="pr-8 text-black hover:underline">
                                <span>{{ article.source.name }}</span>
                                <div class="mt-1 mb-2 font-bold">{{ article.title }}</div>
                                <div class="mt-1 mb-2">{{ article.description }}</div>
                                <span class="mt-10 block">{{ getTimeSince(article.publishedAt) }}</span>
                            </div>
                        </NuxtLink>
                    </a-col>

                </a-row>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNewsGatorStore } from '~/store/newsgator.js';
import { storeToRefs } from 'pinia';

export default defineComponent({
    async setup() {

        const ngStore = useNewsGatorStore();

        const { filteredArticles } = storeToRefs(ngStore)

        const route = useRoute()

        let query = '';

        if (route.query.q) {
            query = `q=${route.query.q}`
        }

        if (route.query.category) {
            query = `category=${route.query.category}`
        }

        console.log("🚀 ~ setup ~ route:", route.query.q);

        await ngStore.fetchFilteredArticles(query);

        return {
            filteredArticles,
        };
    },

});
</script>
  
  