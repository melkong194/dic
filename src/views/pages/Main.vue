<template>
	<ion-page>
		<div id="contentBody">
			<ion-content id="icontent" scrollEvents="false">
				<div class="searchWrapper" v-if="this.isSearch">
					<span class="searchBar">
						<input
							class="searchInput"
							placeholder="Enter a word to search"
							v-model="searchValue"
						/>
						<ion-icon @click="searchReset" :icon="close"></ion-icon>
					</span>
				</div>

				<div class="searchedWord">
					<ion-icon
						v-if="!this.isSearch"
						@click="toggleSearchBox"
						class="searchOpen"
						:icon="search"
					></ion-icon>
					<ion-icon
						v-if="this.isSearch"
						@click="toggleSearchBox"
						class="searchClose"
						:icon="close"
					></ion-icon>
					<audio controls ref="wordAudio">
						<source :src="this.word.sound" type="audio/mpeg" />
						Your browser does not support the audio element.
					</audio>
					<ion-icon
						class="record"
						:icon="mic"
						@click="
							handleStartRecord();
							toggleRecordPanel();
						"
					></ion-icon>
				</div>
				<div v-if="this.searchedResult"></div>
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

					<!-- ******** SYLLABLES ********* -->
					<!-- <p>{{ this.sorted }}</p>
					<p>{{ this.sylls }}</p>
					<p>STRING: {{ this.searchValue }}</p>
                    <p>WORD: {{ this.word }}</p>
                    <p>Length: {{this.getWordsLength}}, id: {{this.id}}</p> -->

					<!-- <div class="tab-container" id="dragBox" v-if="this.searchedResult"> -->
					<div class="tab-container" id="dragBox">
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
					<div id="dropBox" @click="this.toggleOutput($event)">
						<div
							class="dletter intoText"
							v-for="item in this.sorted"
							:key="item.id"
							:id="item.id"
							@click="playSound('audio' + item.id)"
						>
							{{ item.name }}
							<audio
								id="sortedPlay"
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

			<!-- ///////// FIXED CONTROL BUTTONS ///////////////// -->
			<!----- Add button ----->
			<a class="fixedBtn btnCir add" @click="toggleSidebar">
				<ion-icon class="add-icon" :icon="add"></ion-icon>
			</a>
			<!----- Store button ----->
			<a class="fixedBtn btnCir store">
				<ion-icon class="like-icon" :icon="thumbsUp"></ion-icon>
			</a>
			<!----- next button ----->
			<a
				v-if="this.id < this.getWordsLength - 1"
				class="fixedBtn btnRec next"
			>
				<ion-icon
					@click="nextWord"
					class="dir-icon"
					:icon="arrowForward"
				></ion-icon>
			</a>
			<!----- prev button ----->
			<a v-if="this.id > 0" class="fixedBtn btnRec prev">
				<ion-icon
					@click="prevWord"
					class="dir-icon"
					:icon="arrowBack"
				></ion-icon>
			</a>
			<!-- *********************************** -->

			<!-- ///////// SIDE BAR ////////////////////// -->
			<div v-if="this.isSidebar" class="panelWrapper">
				<div class="sidebar">
					<div class="headerSidebar">
						<!-- <ion-icon class="controlSideBar" :icon="add"></ion-icon> -->
						SYLLABLES
						<ion-icon
							class="controlSideBar"
							:icon="close"
							@click="toggleSidebar"
						></ion-icon>
					</div>
					<ul class="list-group">
						<li
							v-for="item in this.getListSyllables"
							:key="item.id"
							:id="item.id"
							@click="playSound('syll' + item.id)"
						>
							{{ item.name }}
							<audio
								:ref="'syll' + item.id"
								:src="item.sound"
							></audio>
							<ion-icon
								:icon="add"
								@click="handleAddSyll(item)"
							></ion-icon>
						</li>
					</ul>
				</div>
			</div>
			<!-- ///////// RECORDER ////////////////////// -->
			<div v-if="this.isRecorder" class="panelWrapper">
				<div class="recordPanel">
					<div class="headerRecordPanel">
						<span>Recording...</span>

						<div class="stopRecordingWrap">
							<ion-icon
								class="stopRecording"
								:icon="micOff"
								@click="handleStopRecord"
							></ion-icon>
							<span>00:00</span>
						</div>

						<ion-icon
							class="closeRecorder"
							:icon="close"
							@click="toggleRecordPanel"
						></ion-icon>
					</div>
				</div>
			</div>
			<!-- ///////// END ////////////////////// -->
		</div>
	</ion-page>
</template>

<script>
import { createGesture } from "@ionic/vue";
import { IonContent, IonPage, IonIcon } from "@ionic/vue";
import {
	play,
	repeat,
	close,
	thumbsUp,
	arrowBack,
	arrowForward,
	search,
	mic,
	add,
	micOff,
} from "ionicons/icons";
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
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
			word: null,
			sorted: [],
			sylls: [],
			id: 0,
			searchValue: "",
			isSearch: false,
			isSidebar: false,
			isRecorder: false,
			isTextOutput: true,
		};
	},
	watch: {
		sorted: function () {
			this.forceRerender();
		},
		isTextOutput: function () {
			this.updateSortedListOutput();
		},
	},
	created() {
		this.initial();
	},
	mounted() {
		this.updateEvent(true);
	},
	setup() {
		return {
			repeat,
			play,
			close,
			thumbsUp,
			arrowBack,
			arrowForward,
			search,
			mic,
			add,
			micOff,
		};
	},
	computed: {
		...mapGetters([
			// " getWordByName",
			"getWordById",
			"getWordsLength",
			"getSyllableById",
			"getListSyllables",
		]),
		searchedResult() {
			let w;
			if (this.searchValue) {
				if (this.getWordByName(this.searchValue)) {
					w = this.getWordByName(this.searchValue);
					this.updateWord(w);
				}
			}
			return w;
		},
	},
	methods: {
		...mapActions(["addSyllableIntoWord"]),
		initial() {
			let x = this.getWordById(this.id);
			this.word = x;
			this.sylls = x.sylls;
		},
		nextWord() {
			this.id = this.id + 1;
			let x = this.getWordById(this.id);
			this.word = x;
			this.sylls = x.sylls;
			this.sorted = [];
		},
		prevWord() {
			this.id = this.id - 1;
			let x = this.getWordById(this.id);
			this.word = x;
			this.sylls = x.sylls;
			this.sorted = [];
		},
		updateSortedListOutput() {
			this.$nextTick(() => {
				let dragEl = document.getElementById("dropBox").children;
				if (this.isTextOutput) {
					for (let i = 0; i < dragEl.length; i++) {
						let c = dragEl[i];
						c.classList.remove("intoText");
					}
				} else {
					for (let i = 0; i < dragEl.length; i++) {
						let c = dragEl[i];
						c.classList.add("intoText");
					}
				}
			});
		},
		updateEvent(on) {
			// index=1 : drag in , index=2 : drag out
			let dragEl = document.getElementById("dragBox").children;
			for (let i = 0; i < dragEl.length; i++) {
				let c = dragEl[i];
				this.addGestureEvent(c, 1, on);
			}

			dragEl = document.getElementById("dropBox").children;
			for (let i = 0; i < dragEl.length; i++) {
				let c = dragEl[i];
				this.addGestureEvent(c, 2, on);
				if (this.isTextOutput) c.classList.remove("intoText");
				else c.classList.add("intoText");
			}
		},
		onDropbox(x, y) {
			let elem = document.querySelector("#dropBox");
			let dropBox = elem.getBoundingClientRect();
			if (dropBox.left >= x) return false;
			if (dropBox.right <= x) return false;
			if (dropBox.top >= y) return false;
			return true;
		},
		addGestureEvent(c, index, on) {
			let dropBox = document.querySelector(".dropArea");
			let contentEl = document.querySelector("#icontent");
			const gesture = createGesture({
				el: c,
				gestureName: "drag",
				disableScroll: true,
				threshold: 0,
				gesturePriority: 10,
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
							this.dragAction(a, index);
						}
					} else {
						if (!this.onDropbox(e.currentX, e.currentY)) {
							c.remove();
							this.dragAction(a, index);
						}
					}
				},
			});
			if (on) gesture.enable(true);
			else gesture.destroy();
		},
		dragAction(itemID, option) {
			//option = 1: drag from dragBox
			//option = 2: drag from dropBox

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
				if (list[x].id == id) {
					item = list[x];
					pos = x;
					break;
				}
			}
			return [item, pos];
		},
		updateWord(word) {
			this.word = word;
			this.sylls = word.sylls;
			this.sorted = [];
			this.id = word.id;
		},
		forceRerender() {
			this.updateEvent(false);
			this.$nextTick(() => {
				this.updateEvent(true);
				this.$refs.wordAudio.load();
				// this.updateSortedListOutput();
			});
		},
		playSound(index) {
			this.$refs[index].play();
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
		toggleSearchBox() {
			this.isSearch = !this.isSearch;
		},
		toggleSidebar() {
			this.isSidebar = !this.isSidebar;
		},
		toggleRecordPanel() {
			this.isRecorder = !this.isRecorder;
		},
		toggleOutput(e) {
			if (e.target.className != "dletter") {
				console.log(this.isTextOutput);
				this.isTextOutput = !this.isTextOutput;
				this.updateSortedListOutput();
			}
		},
		handleAddSyll(syll) {
			let data = {
				wordID: this.word.id,
				addSyll: syll,
			};
			this.addSyllableIntoWord(data);
			this.isSidebar = false;
			this.initial();
			this.sorted = [];
		},
		handleStartRecord() {
			console.log("ABC");
			// navigator.mediaDevices.getUserMedia({
			//     audio: true
			// }).then(stream => audioElement.srcObject = stream)
			//     .catch(err => log(err.name + ": " + err.message));
		},
		handleStopRecord() {},
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