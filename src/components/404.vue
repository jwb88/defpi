<template>
	<v-app class="background">
		<v-layout align-center justify-center class="text-xs-center" xs12>
			<h1>404 ERROR</h1>
		</v-layout>

		<v-layout align-center justify-center class="text-xs-center" xs12>
			<router-link to="/"><v-btn xs12>Back to Dashboard</v-btn></router-link>
		</v-layout>
	</v-app>
</template>

<script>
    export default {
        name: "404"
    }
</script>

<style scoped>

</style>
