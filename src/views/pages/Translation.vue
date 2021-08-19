<template>
	<ion-page>
		<div id="contentBody">
			<ion-content id="icontent">
				<!-- *****************HEADER*********************** -->
				<!-- <div class="headerWrapper">
					<div class="iTitle">
						<img
							alt="logo"
							height="25"
							src="/assets/img/icon.png"
						/>
						Yolŋu Matha alphabet
					</div>
				</div> -->


				<!-- *****************CONTENT*********************** -->
				<div id="contentWrapper">

					<!-- START CONTENT -->
					<div class="langWrapper">
						English
						<ion-buttons>
							<button class="langbtn" href="#">
								<ion-icon :icon="repeat"></ion-icon>
							</button>
						</ion-buttons>
						Yolŋu
					</div>

					<ion-textarea
						class="langArea"
						value=""
						placeholder="Enter yolngu words here ..."
					></ion-textarea>

					<ion-button expand="block" shape="round">
						Listen
					</ion-button>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Doloremque repellat consequuntur modi dolore,
						totam facilis odit vitae itaque voluptatem reprehenderit
						odio voluptates et expedita porro dolorum fugiat sit,
						obcaecati error!
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Doloremque repellat consequuntur modi dolore,
						totam facilis odit vitae itaque voluptatem reprehenderit
						odio voluptates et expedita porro dolorum fugiat sit,
						obcaecati error!
					</p>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Doloremque repellat consequuntur modi dolore,
						totam facilis odit vitae itaque voluptatem reprehenderit
						odio voluptates et expedita porro dolorum fugiat sit,
						obcaecati error!
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Doloremque repellat consequuntur modi dolore,
						totam facilis odit vitae itaque voluptatem reprehenderit
						odio voluptates et expedita porro dolorum fugiat sit,
						obcaecati error!
					</p>
					<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
					<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Doloremque repellat consequuntur modi dolore,
						totam facilis odit vitae itaque voluptatem reprehenderit
						odio voluptates et expedita porro dolorum fugiat sit,
						obcaecati error!
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Doloremque repellat consequuntur modi dolore,
						totam facilis odit vitae itaque voluptatem reprehenderit
						odio voluptates et expedita porro dolorum fugiat sit,
						obcaecati error!
					</p>
					<!-- END CONTENT -->
				</div>
                

				<!-- *****************FOOTER*********************** -->
				<div id="ifooter">
					<ion-tabs
						id="ifooter"
						@ionTabsWillChange="beforeTabChange"
						@ionTabsDidChange="afterTabChange"
					>
						<ion-router-outlet></ion-router-outlet>
						<ion-tab-bar id="ifooter">
							<ion-tab-button tab="tab1" href="/letters">
								<ion-icon :icon="ear"></ion-icon>
								<ion-label>Sound</ion-label>
							</ion-tab-button>

							<ion-tab-button tab="tab2" href="/words">
								<ion-icon :icon="search"></ion-icon>
								<ion-label>Words</ion-label>
							</ion-tab-button>

							<ion-tab-button tab="tab3" href="/translate">
								<ion-icon :icon="repeat"></ion-icon>
								<ion-label>Translate</ion-label>
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
				</div>
			</ion-content>
		</div>
	</ion-page>
</template>

<script>
import { ear, information, play, repeat, search } from "ionicons/icons";
import {
	IonContent,
	IonPage,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonLabel,
	IonRouterOutlet,
	IonIcon,
	IonButtons,
	IonTextarea,
} from "@ionic/vue";
import {} from "@ionic/vue";
import { defineComponent } from "vue";
export default defineComponent({
	name: "Translation",
	components: {
		IonContent,
		IonPage,
		IonTabs,
		IonTabBar,
		IonTabButton,
		IonLabel,
		IonRouterOutlet,
		IonIcon,
		IonButtons,
		IonTextarea,
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
			search,
			beforeTabChange,
			afterTabChange,
		};
	},
});
</script>

<style>
</style>