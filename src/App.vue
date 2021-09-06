<template>
	<ion-app>
		<ion-router-outlet />
	</ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { mapActions } from 'vuex';
export default defineComponent({
	name: "App",
	components: {
		IonApp,
		IonRouterOutlet,
	},
	created() {
        this.onWordsListener
    },
	methods: {
		...mapActions([
			"onWordsListener",
		]),
	},
});
</script>