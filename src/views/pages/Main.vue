<template>
	<ion-page>
		<div id="contentBody">
			<ion-content id="icontent">
				<!-- *****************HEADER*********************** -->
				<div class="headerWrapper">
					<div class="iTitle">
						<img
							alt="logo"
							height="25"
							src="/assets/img/icon.png"
						/>
						Yolŋu Matha alphabet
					</div>
				</div>

				<!-- *****************CONTENT*********************** -->
				<div id="contentWrapper">
					<div
						class="tab-container"
						@drop="onDrop($event, 1)"
						@dragenter.prevent
						@dragover.prevent
					>
						<div
							v-for="item in getList(1)"
							:key="item.id"
							class="dletter"
							draggable="true"
							@dragstart="startDrag($event, item)"
							@click="playSound('sound' + item.id)"
						>
							{{ item.name }}
							<audio
								v-bind:ref="'sound' + item.id"
								v-bind:src="item.sound"
							></audio>
						</div>
					</div>

					<!-- END CONTENT -->
				</div>

				<!-- *****************FOOTER*********************** -->
				<div class="main-footer">
					<div
						class="drop-area"
						@drop="onDrop($event, 2)"
						@dragenter.prevent
						@dragover.prevent
					>
						<div
							v-for="(item, index) in getList(2)"
							:key="item.id"
							class="dletter"
							draggable="true"
							@dragstart="startDrag($event, item)"
							@click="playSound('drop' + index)"
						>
							{{ item.name }}
							<audio
								:ref="'drop' + index"
								v-bind:src="item.sound"
							></audio>
						</div>
					</div>
					<div class="wrapperButton">
						<a class="aButton"
							><ion-icon id="iIcon" :icon="play"></ion-icon
						></a>
					</div>
				</div>
			</ion-content>
		</div>
	</ion-page>
</template>

<script>
import {
	IonContent,
	IonPage,
	// IonTabs,
	// IonTabBar,
	// IonTabButton,
	// IonLabel,
	// IonRouterOutlet,
	IonIcon,
} from "@ionic/vue";
import { play } from "ionicons/icons";
import { defineComponent } from "vue";
import { ref } from "vue";
export default defineComponent({
	name: "",
	components: {
		IonContent,
		IonPage,
		// IonTabs,
		// IonTabBar,
		// IonTabButton,
		// IonLabel,
		// IonRouterOutlet,
		IonIcon,
	},

	setup() {
		const items = ref([
			{ id: 0, name: "item 0", list: 1, sound: "/assets/sylls/a.wav" },
			{ id: 1, name: "item 1", list: 2, sound: "/assets/sylls/ba.wav" },
			{ id: 2, name: "item 2", list: 1, sound: "/assets/sylls/bad.wav" },
			{ id: 3, name: "item 3", list: 1, sound: "/assets/sylls/badj.wav" },
			{ id: 4, name: "item 4", list: 2, sound: "/assets/sylls/bah.wav" },
			{ id: 5, name: "item 5", list: 1, sound: "/assets/sylls/bak.wav" },
			{ id: 6, name: "item 6", list: 1, sound: "/assets/sylls/bal.wav" },
			{ id: 7, name: "item 7", list: 2, sound: "/assets/sylls/balh.wav" },
			{ id: 8, name: "item 8", list: 1, sound: "/assets/sylls/bang.wav" },
		]);

		const getList = (list) => {
			return items.value.filter((item) => item.list === list);
		};

		const startDrag = (event, item) => {
			// console.log(item);
			// console.log(event);
			event.dataTransfer.dropEffect = "move";
			event.dataTransfer.effectAllowed = "move";
			event.dataTransfer.setData("itemId", item.id);
		};

		const onDrop = (event, list) => {
			const itemID = event.dataTransfer.getData("itemId");
			const item = items.value.find((item) => item.id == itemID);
			item.list = list;
		};

		return {
			getList,
			startDrag,
			onDrop,
			play,
			items,
		};
	},
	methods: {
		playSound: function (index) {
			this.$refs[index].play();
		},
	},
});
</script>

<style>
.item {
	width: 100px;
	height: 100px;
	background-color: darkslategrey;
	color: white;
	margin: 10px;
	padding: 5px;
}
.drop-zone {
	width: 90%;
	background-color: rgb(71, 17, 170);
	margin: 10px auto;
	padding: 10px;
	min-height: 20px;
	display: flex;
}

.item:nth-last-of-type(1) {
	margin-bottom: 0;
}
</style>