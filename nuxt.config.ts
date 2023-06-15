// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	components: [{ path: '~/components/home', prefix: 'Home' }, '~/components'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/_colors.scss" as *;',
				},
			},
		},
	},
	css: ['~/assets/scss/main.scss'],
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		[
			'@nuxtjs/google-fonts',
			{
				families: {
					Nunito: true,
					download: true,
					inject: true,
				},
			},
		],
	],
	plugins: ['@/plugins/antd'],
});
