// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
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
