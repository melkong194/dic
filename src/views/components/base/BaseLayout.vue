<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title
					><img alt="logo" height="25" src="/assets/img/icon.png" />
					{{ pageTittle }}Yolŋu Matha alphabet</ion-title
				>
			</ion-toolbar>
		</ion-header>

		<ion-slide-box>
			<ion-content id="icontent">
				<slot />
			</ion-content>

			<ion-footer-bar id="ifooter">
				<ion-tabs
					id="ifooter"
					@ionTabsWillChange="beforeTabChange"
					@ionTabsDidChange="afterTabChange"
				>
					<ion-tab-bar id="ifooter">
						<ion-tab-button tab="tab1" href="/letters">
							<ion-icon :icon="ear"></ion-icon>
							<ion-label>Sound</ion-label>
						</ion-tab-button>

						<ion-tab-button tab="tab2" href="/translate">
							<ion-icon :icon="repeat"></ion-icon>
							<ion-label>Translate</ion-label>
						</ion-tab-button>

						<ion-tab-button tab="tab3" href="/dic">
							<ion-icon :icon="play"></ion-icon>
							<ion-label>Game</ion-label>
						</ion-tab-button>

						<ion-tab-button tab="tab4">
							<ion-icon :icon="play"></ion-icon>
							<ion-label>Game</ion-label>
						</ion-tab-button>

						<ion-tab-button tab="tab5">
							<ion-icon :icon="information"></ion-icon>
							<ion-label>Info</ion-label>
						</ion-tab-button>
					</ion-tab-bar>
				</ion-tabs>
			</ion-footer-bar>

		</ion-slide-box>
	</ion-page>
</template>

<script>
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonLabel,
	IonIcon
} from "@ionic/vue";

import { ear, information, play, repeat } from "ionicons/icons";
import { defineComponent } from "vue";
export default defineComponent({
	name: "base-layout ",
	props: ["pageTitle"],
	components: {
		IonContent,
		IonHeader,
		IonPage,
		IonTitle,
		IonToolbar,
		IonTabs,
		IonTabBar,
		IonTabButton,
		IonLabel,
		IonIcon
	},

	setup() {
		const beforeTabChange = () => {
			// do something before tab change
		};
		const afterTabChange = () => {
			// do something after tab change
		};
		return {
			ear,
			repeat,
			play,
			information,
			beforeTabChange,
			afterTabChange,
		};
	},
});
</script>

<style>
</style>