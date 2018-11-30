<template>
	<v-app class="background">
		<v-content>
			<h1>App Manager</h1>
		</v-content>

		<Menu></Menu>
	</v-app>
</template>

<script>
	import Menu from './Menu';
    export default {
        name: "AppManager",
		components: {
        	Menu
		}
    }
</script>

<style scoped>

</style>
