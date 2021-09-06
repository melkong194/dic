<template>
	<ion-page>
		<div id="contentBody">
			<ion-content id="icontent" scrollEvents="false">
				<div id="contentWrapper">
					<!-- ******** SEARCH BAR ******** -->
					<!-- <ion-searchbar
						class="searchWrapper"
						placeholder="Enter a word to search"
                        showCancelButton="true"
                        debounce="0"
                        :value="searchInput"
                        @ionInput="searchInput = $event.target.value; onInput$.next($event.target.value)"
                        @ionClear="searchCleared($event)"
					></ion-searchbar> -->
					<div class="searchWrapper">
						<!-- <ion-back-button></ion-back-button> -->
						<span class="searchBar">
							<input
								class="searchInput"
								placeholder="Enter a word to search"
								v-model="searchValue"
							/>
							<ion-icon
								@click="searchReset"
								:icon="close"
							></ion-icon>
						</span>
					</div>

					<div class="searchedWord" v-if="this.searchedResult">
						{{ this.searchedResult.name }}
						<ion-icon
							class="repeatButton"
							:icon="repeat"
						></ion-icon>
					</div>

					<!-- ******** SYLLABLES ********* -->
					<p>{{ this.sorted }}</p>
					<p>{{ this.sylls }}</p>
					<div
						class="tab-container"
						id="dragBox"
						@dragenter.prevent
						@dragover.prevent
					>
						<div
							class="dletter"
							v-for="item in this.sylls"
							:key="item.id"
							:id="item.id"
							@click="playSound('sound' + item.id)"
						>
							{{ item.name }}
							<audio
								:ref="'sound' + item.id"
								:src="item.sound"
							></audio>
						</div>
					</div>
				</div>
			</ion-content>

			<!-- *****************FOOTER*********************** -->

			<div class="main-footer">
				<div class="dropArea">
					<div id="dropBox" @dragenter.prevent @dragover.prevent>
						<div
							class="dletter"
							v-for="item in this.sorted"
							:key="item.id"
							:id="item.id"
							@click="playSound('audio' + item.id)"
						>
							{{ item.name }}
							<audio
								:ref="'audio' + item.id"
								:src="item.sound"
							></audio>
						</div>
					</div>
				</div>
				<div class="wrapperButton">
					<a class="stringButton" @click="playString"
						><ion-icon id="iIcon" :icon="play"></ion-icon
					></a>
				</div>
			</div>

			<!-- *********************************** -->
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
			<!----- Clear button ----->
			<a class="saveButton">OK</a>
			<!-- *********************************** -->
		</div>
	</ion-page>
</template>

<script>
import { createGesture } from "@ionic/vue";
import { IonContent, IonPage, IonIcon } from "@ionic/vue";
import { play, repeat, close } from "ionicons/icons";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
// import { ref } from "vue";
export default defineComponent({
	name: "",
	components: {
		IonContent,
		IonPage,
		IonIcon,
	},
	data() {
		return {
			sorted: [
				{ id: 1, name: "be", sound: "/assets/sylls/be.wav" },
				{ id: 6, name: "be", sound: "/assets/sylls/be.wav" },
			],
			sylls: [
				{ id: 0, name: "be", sound: "/assets/sylls/be.wav" },
				{ id: 4, name: "bey", sound: "/assets/sylls/bey.wav" },
				{ id: 2, name: "ka", sound: "/assets/sylls/ka.wav" },
				{ id: 5, name: "kka", sound: "/assets/sylls/kka.wav" },
				{ id: 3, name: "kan", sound: "/assets/sylls/kan.wav" },
			],

			searchValue: "",
		};
	},
	watch: {},
	mounted() {
		this.updateEvent(1);
		this.updateEvent(2);
	},
	setup() {
		// const sylls = ref([
		// 	{ id: 0, name: "be", sound: "/assets/sylls/be.wav" },
		//     { id: 1, name: "bey", sound: "/assets/sylls/bey.wav" },
		//     { id: 2, name: "ka", sound: "/assets/sylls/ka.wav" },
		//     { id: 3, name: "kka", sound: "/assets/sylls/kka.wav" },
		//     { id: 4, name: "kan", sound: "/assets/sylls/kan.wav" },
		// ]);
		// const sorted = ref([
		// 	{ id: 9, name: "item 9", sound: "/assets/sylls/bang.wav" },
		// ]);
		return {
			repeat,
			play,
			close,
			// sorted,
			// sylls
		};
	},
	computed: {
		...mapGetters(["getWordByName"]),
		searchedResult() {
			if (this.searchValue) {
				let word = this.getWordByName(this.searchValue);
				this.updateSylls(word.sylls);
				// console.log(this.items);
				// console.log(this.dropList);
				return word;
			}
			return "";
		},
	},
	methods: {
		updateEvent(index) {
			// index=1 : drag in , index=2 : drag out
			let dragEl = null;
			if (index == 1)
				dragEl = document.getElementById("dragBox").children;
			else dragEl = document.getElementById("dropBox").children;

			let dropBox = document.querySelector(".dropArea");
			let contentEl = document.querySelector("#icontent");
			let isAction = false;

			for (let i = 0; i < dragEl.length; i++) {
				let c = dragEl[i];
				const gesture = createGesture({
					el: c,
					gestureName: "drag",
					disableScroll: true,
					threshold: 0,
					onStart: () => {
						contentEl.setAttribute("scroll-y", false);
					},
					onMove: (e) => {
						c.style.transform = `translate(${e.deltaX}px, ${e.deltaY}px)`;
						if (index == 1) {
							if (this.onDropbox(e.currentX, e.currentY)) {
								dropBox.style.border = "5px dashed yellow";
							} else {
								dropBox.style.border =
									"5px dashed rgb(23, 90, 129)";
							}
						}
					},
					onEnd: (e) => {
						contentEl.setAttribute("scroll-y", true);
						dropBox.style.border = "5px dashed rgb(23, 90, 129)";
						c.style.transform = `translate(0px, 0px)`;
						let a = c.getAttribute("id");
						if (index == 1) {
							if (this.onDropbox(e.currentX, e.currentY)) {
								c.remove();
								console.log(a);
								this.dragAction(a, index);
								isAction = true;
							}
						} else {
							if (!this.onDropbox(e.currentX, e.currentY)) {
								c.remove();
								console.log(a);
								this.dragAction(a, index);
								isAction = true;
							}
						}
					},
				});
				gesture.enable(true);
                console.log(gesture);
				if (isAction) {
					this.updateGesture();
				}
			}
		},
		addGestureEvent() {
			// dragEl = document.getElementsByClassName("dletter");
			// for (let i = 0; i < dragEl.length; i++) {
			// 	let c = dragEl[i];
			//     gest
			// this.updateEvent(1);
			// this.updateEvent(2);
		},
		// updateSylls(items) {
		// 	this.sylls = items;
		// },
		// updateSorted(items) {
		// 	this.sorted = items;
		// },
		dragAction(itemID, option) {
			//option = 1: drag from dragBox
			//option = 2: drag from dropBox
			console.log(itemID);
			let x = JSON.parse(JSON.stringify(this.sylls));
			let y = JSON.parse(JSON.stringify(this.sorted));
			if (option == 1) {
				let result = this.FindItemPosition(x, itemID);

				//update sylls list
				x.splice(result[1], 1);
				this.sylls = x;

				//update sorted list
				y.push(result[0]);
				this.sorted = y;
			} else {
				let result = this.FindItemPosition(y, itemID);
				console.log(result);

				//update sylls list
				y.splice(result[1], 1);
				this.sorted = y;

				//update sorted list
				x.push(result[0]);
				this.sylls = x;
			}
		},
		FindItemPosition(list, id) {
			let item = null;
			let pos = null;
			for (let x = 0; x < list.length; x++) {
				console.log(list[x]);
				if (list[x].id == id) {
					item = list[x];
					pos = x;
					break;
				}
			}
			return [item, pos];
		},
		// removeEl(list, index) {
		// 	let items = JSON.parse(JSON.stringify(list));
		// 	items.splice(index, 1);
		// 	return items;
		// },
		// addEl(list, item) {
		// 	let items = JSON.parse(JSON.stringify(list));
		// 	items.push(item);
		// 	return items;
		// },
		onDropbox(x, y) {
			let elem = document.querySelector("#dropBox");
			let dropBox = elem.getBoundingClientRect();
			if (dropBox.left >= x) return false;
			if (dropBox.right <= x) return false;
			if (dropBox.top >= y) return false;
			return true;
		},
		playSound(index) {
			console.log(index);
			this.$refs[index].play();
		},
		clearDrop() {
			this.sorted.forEach((element) => {
				this.items.push(element);
			});
			this.sorted = [];
			// this.setup.$forceUpdate();
			// this.mounted.$forceUpdate();
		},
		playString() {
			let sounds = [];
			this.sorted.forEach((item) => {
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
		searchReset() {
			this.searchValue = "";
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