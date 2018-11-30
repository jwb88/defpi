<template>
	<v-app class="background">
		<v-content>
			<h1>AppStore</h1>
		</v-content>

		<Menu></Menu>
	</v-app>
</template>

<script>
	import Menu from './Menu'
    export default {
		components: {
			Menu
		}
    }
</script>

<style scoped>

</style>
