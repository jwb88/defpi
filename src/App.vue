<template>
	<!-- Current Page -->
	<router-view></router-view>
</template>

<script>
    export default {
        name: "app",
	}
</script>

<style>
	.v-icon,
	.v-list__tile__title {
		user-select: none;		/*remove selection capability*/
	}

</style>
