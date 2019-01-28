<template>
	<router-view></router-view>
</template>

<script>
    export default {
        name: "app",
		mounted() {
        	console.log("IS APP:");
			console.log(this.$route.matched[0].components["default"] === this);
		}
	}
</script>

<style>
	.v-icon,
	.v-list__tile__title {
		user-select: none;
	}

</style>
