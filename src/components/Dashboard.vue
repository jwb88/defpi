<template>
	<v-app class="background">
		<v-content>
			<router-view></router-view>
		</v-content>

		<Menu></Menu>
	</v-app>
</template>

<script>
    import Menu from "./Menu";

    export default {
        name: 'dashboard',
        components: {
            Menu,
        },
        data() {
            return {
            }
        }
    }
</script>

<style lang="scss">
	html {
		/*overflow: auto;*/
	}
</style>