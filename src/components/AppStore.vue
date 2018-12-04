<template>
	<v-app class="background">
		<v-content>
			<h1>AppStore</h1>
		</v-content>

		<Menu :menu="menu"></Menu>
	</v-app>
</template>

<script>
	import Menu from './Menu'
    export default {
		props: ["menu"],
		components: {
			Menu
		}
    }
</script>

<style scoped>

</style>
