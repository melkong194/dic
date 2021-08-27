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
					<ion-searchbar
						class="searchWrapper"
						placeholder="Enter a word to search"
					></ion-searchbar>
					<div class="searchedWord">
						ebeykakkakankanjdidih
						<!-- <a class="repeatButton"> -->
						<ion-icon
							class="repeatButton"
							:icon="repeat"
						></ion-icon>
						<!-- </a> -->
					</div>
					<div
						class="tab-container"
						@drop="onDrop($event, 1)"
						@dragenter.prevent
						@dragover.prevent
					>
						<div
							v-for="item in this.items"
							:key="item.id"
							class="dletter"
							draggable="true"
							@dragstart="startDrag($event, item.id)"
							@click="playSound('sound' + item.id)"
						>
							{{ item.name }}
							<audio
								v-bind:ref="'sound' + item.id"
								v-bind:src="item.sound"
							></audio>
						</div>
					</div>
					<p>
						<span v-for="i in this.items" :key="i.id">
							{{ i.id + "-" + i.name + " | " }}
						</span>
					</p>
					<p>
						<span v-for="i in this.dropList" :key="i.id">
							{{ i.id + "-" + i.name + " | " }}
						</span>
					</p>
					<!-- END CONTENT -->
				</div>

				<!-- *****************FOOTER*********************** -->
				<div class="main-footer">
					<div
						class="drop-area"
						id="drop-box"
						@drop="onDrop($event, 2)"
						@dragenter.prevent
						@dragover.prevent
					>
						<div
							v-for="item in this.dropList"
							:key="item.id"
							class="dletter"
							draggable="true"
							@dragstart="startDrag($event, item.id)"
							@click="playSound('drop' + item.id)"
						>
							{{ item.name }}
							<audio
								:ref="'drop' + item.id"
								v-bind:src="item.sound"
							></audio>
						</div>
					</div>
					<div class="wrapperButton">
						<a class="stringButton" @click="playString"
							><ion-icon id="iIcon" :icon="play"></ion-icon
						></a>
					</div>
				</div>
				<!----- Clear button ----->
				<div class="clearBtn" @click="clearDrop">
					<a>
						<span class="left">
							<span class="circle-left"></span>
							<span class="circle-right"></span>
						</span>
						<span class="right">
							<span class="circle-left"></span>
							<span class="circle-right"></span>
						</span>
					</a>
				</div>
			</ion-content>
		</div>
	</ion-page>
</template>

<script>
import { IonContent, IonPage, IonIcon } from "@ionic/vue";
import { play, repeat } from "ionicons/icons";
import { defineComponent } from "vue";
import { ref } from "vue";
export default defineComponent({
	name: "",
	components: {
		IonContent,
		IonPage,
		IonIcon,
	},

	setup() {
		const items = ref([
			{ id: 0, name: "be", sound: "/assets/sylls/a.wav" },
			{ id: 1, name: "bey", sound: "/assets/sylls/ba.wav" },
			{ id: 2, name: "ka", sound: "/assets/sylls/bad.wav" },
			{ id: 3, name: "kka", sound: "/assets/sylls/badj.wav" },
			{ id: 4, name: "kan", sound: "/assets/sylls/bah.wav" },
			{ id: 5, name: "kanj", sound: "/assets/sylls/bak.wav" },
			{ id: 6, name: "di", sound: "/assets/sylls/bal.wav" },
			{ id: 7, name: "dih", sound: "/assets/sylls/balh.wav" },
		]);

		const dropList = ref([
			// { id: 9, name: "item 9", sound: "/assets/sylls/bang.wav" },
		]);

		// let sortable = document.querySelectorAll('#drop-box > li')

		// sortable.forEach(item => {
		// $(item).prop('draggable', true)
		// item.addEventListener('dragstart', dragStart)
		// item.addEventListener('drop', dropped)
		// item.addEventListener('dragenter', cancelDefault)
		// item.addEventListener('dragover', cancelDefault)
		// })

		// function dragStart (e) {
		// var index = $(e.target).index()
		// e.dataTransfer.setData('text/plain', index)
		// }

		// function dropped (e) {
		// cancelDefault(e)

		// let oldIndex = e.dataTransfer.getData('text/plain')
		// let target = $(e.target)
		// let newIndex = target.index()

		// let dropped = $(this).parent().children().eq(oldIndex).remove()

		// if (newIndex < oldIndex) {
		//     target.before(dropped)
		// } else {
		//     target.after(dropped)
		// }
		// }

		// function cancelDefault (e) {
		// e.preventDefault()
		// e.stopPropagation()
		// return false
		// }

		const startDrag = (event, id) => {
			event.dataTransfer.dropEffect = "move";
			event.dataTransfer.effectAllowed = "move";
			event.dataTransfer.setData("itemId", id);
		};

		const onDrop = (event, option) => {
			const itemID = event.dataTransfer.getData("itemId");
			if (option == 2) {
				const item = items.value.find((item) => item.id == itemID);
				items.value.splice(items.value.indexOf(item), 1);
				dropList.value.push(item);
				// event.DataTransfer.clearData();
			} else {
				const item = dropList.value.find((item) => item.id == itemID);
				items.value.push(item);
				dropList.value.splice(dropList.value.indexOf(item), 1);
				// event.DataTransfer.clearData();
			}
		};

		return {
			startDrag,
			onDrop,
			play,
			items,
			dropList,
			repeat,
		};
	},
	methods: {
		playSound(index) {
			this.$refs[index].play();
		},
		clearDrop() {
			this.dropList.forEach((element) => {
				this.items.push(element);
			});
			this.dropList = [];
		},
		playString() {
			let sounds = [];
			this.dropList.forEach((item) => {
				let audio = new Audio(item.sound);
				sounds.push(audio);
			});
			this.playSequence(sounds);
		},
		playSequence(sounds) {
			if (sounds.length > 0) {
				sounds[0].play();
				sounds[0].addEventListener("ended", () => {
                    sounds.shift();
					return this.playSequence(sounds);
				});
			}
		},
	},
});
</script>

<style>
/* .item {
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
} */
</style>