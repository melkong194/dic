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

                     <ion-searchbar class="searchWrapper" placeholder="Enter a word to search"></ion-searchbar>

                    <!-- START CONTENT -->
                    
					<div class="tab-container">
						<div class="dword">
							<img src="/assets/img/words/1.gif" />
                            <span>word1bcnd2</span>
                            <audio ref="audioElm" src="/assets/img/sound/1.wav"></audio>
						</div>
                        <div class="dword">
							<img src="/assets/img/words/2.gif" />
                            <span>word1bcnd2</span>
						</div>
                        <div class="dword">
							<img src="/assets/img/words/3.gif" />
                            <span>word1bcnd2a</span>
						</div>
                        <div class="dword">
							<img src="/assets/img/words/1.gif" />
                            <span>word1bcnd2</span>
                            
						</div>
                        <div class="dword">
							<img src="/assets/img/words/2.gif" />
                            <span>word1bcnd2</span>
						</div>
                        <div class="dword">
							<img src="/assets/img/words/3.gif" />
                            <span>word1bcnd2a</span>
						</div>
                        <div class="dword">
							<img src="/assets/img/words/1.gif" />
                            <span>word1bcnd2</span>
                            
						</div>
                        <div class="dword">
							<img src="/assets/img/words/2.gif" />
                            <span>word1bcnd2</span>
						</div>
                        <div class="dword">
							<img src="/assets/img/words/3.gif" />
                            <span>word1bcnd2a</span>
						</div>

                        <div class="dword" id="empty"> 
                            <img src="/assets/img/words/3.gif" />
                            <span>word1bcnd2a</span>                           
						</div>
                        <div class="dword" id="empty">
                            <img src="/assets/img/words/3.gif" />
                            <span>word1bcnd2a</span>		
						</div>
                        <div class="dword" id="empty">
                            <img src="/assets/img/words/3.gif" />
                            <span>word1bcnd2a</span>	
						</div>	
					</div>

                    <audio ref="audioElm" src="/assets/img/sound/1.wav"></audio>
                    <p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Doloremque repellat consequuntur modi dolore,
							totam facilis odit vitae itaque voluptatem
							reprehenderit odio voluptates et expedita porro
							dolorum fugiat sit, obcaecati error!
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Doloremque repellat consequuntur modi dolore,
							totam facilis odit vitae itaque voluptatem
							reprehenderit odio voluptates et expedita porro
							dolorum fugiat sit, obcaecati error!
						</p>

						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Doloremque repellat consequuntur modi dolore,
							totam facilis odit vitae itaque voluptatem
							reprehenderit odio voluptates et expedita porro
							dolorum fugiat sit, obcaecati error!
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Doloremque repellat consequuntur modi dolore,
							totam facilis odit vitae itaque voluptatem
							reprehenderit odio voluptates et expedita porro
							dolorum fugiat sit, obcaecati error!
						</p>
						<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Doloremque repellat consequuntur modi dolore,
							totam facilis odit vitae itaque voluptatem
							reprehenderit odio voluptates et expedita porro
							dolorum fugiat sit, obcaecati error!
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Doloremque repellat consequuntur modi dolore,
							totam facilis odit vitae itaque voluptatem
							reprehenderit odio voluptates et expedita porro
							dolorum fugiat sit, obcaecati error!
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
// import BaseLayout from "../components/base/BaseLayout.vue";
import { defineComponent } from "vue";
import {
	IonContent,
	IonPage,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonLabel,
	IonRouterOutlet,
	IonIcon,
} from "@ionic/vue";
import { ear, information, play, repeat, search } from "ionicons/icons";
export default defineComponent({
	name: "Words",
	// components: { BaseLayout },
	components: {
		IonContent,
		IonPage,
		IonTabs,
		IonTabBar,
		IonTabButton,
		IonLabel,
		IonRouterOutlet,
		IonIcon,
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