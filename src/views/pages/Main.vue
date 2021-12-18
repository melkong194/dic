<template>
	<ion-page>
		<div id="contentBody">
			<ion-content id="icontent" scrollEvents="false">
				<div class="searchWrapper" v-if="this.isSearch">
					<span class="searchBar">
						<input
							class="searchInput"
							placeholder="Enter recording name to search"
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
							handleRecord();
							toggleRecordPanel();
						"
					></ion-icon>
				</div>
				<div v-if="this.searchedWordResult"></div>
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

					<!-- <div class="tab-container" id="dragBox" v-if="this.searchedWordResult"> -->
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
				<ion-icon class="add-icon" :icon="addSharp"></ion-icon>
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
			<!----- index recording ----->
			<span class="index"
				>{{ this.id + 1 }}/{{ this.getWordsLength }}</span
			>
			<!-- *********************************** -->

			<!-- ///////// SIDE BAR ////////////////////// -->
			<div v-if="this.isSidebar" class="panelWrapper">
				<div class="sidebar">
					<div class="headerSidebar">
						<!-- <ion-icon class="controlSideBar" :icon="add"></ion-icon> -->
						<ion-icon
							v-if="!this.isSyllSearch"
							class="controlSideBar"
							:icon="search"
							@click="toggleSyllSearch"
						></ion-icon>
						<ion-icon
							v-if="this.isSyllSearch"
							class="controlSideBar"
							:icon="closeCircleSharp"
							@click="toggleSyllSearch"
						></ion-icon>
						SYLLABLES
						<ion-icon
							class="controlSideBar"
							:icon="close"
							@click="toggleSidebar"
						></ion-icon>
					</div>

					<span class="searchBar" v-if="this.isSyllSearch">
						<input
							class="syllSearch"
							placeholder="Enter syllable to search"
							v-model="syllValue"
						/>
						<ion-icon @click="searchReset" :icon="close"></ion-icon>
					</span>

					<ul class="list-group" v-if="this.syllValue == ''">
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

					<ul class="list-group" v-if="this.syllValue != ''">
						<!-- <span>{{this.syllValue}}</span> -->
						<li
							v-for="item in this.searchedSyllResult"
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
					<div class="headerRecordPanel" id="buttons">
						<span>Recording...</span>

						<div class="stopRecordingWrap">
							<!-- <ion-icon
								class="startRecord"
								:icon="mic"
								@click="toggleRecording"
							></ion-icon> -->
							<ion-icon
								class="stopRecord"
								:icon="micOff"
								@click="toggleRecording"
							></ion-icon>
							<!-- <span>00:00</span> -->
						</div>

						<ion-icon
							class="closeRecorder"
							:icon="close"
							@click="toggleRecordPanel"
						></ion-icon>
					</div>
					<!-- <canvas class="visualizer" height="60"></canvas> -->
					<section class="sound-clips"></section>
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
	addSharp,
	micOff,
	closeCircleSharp,
} from "ionicons/icons";
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
// import { ref } from "vue";
export default defineComponent({
	name: "AudioRecorder",
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
			syllValue: "",
			isSearch: false,
			isSyllSearch: false,
			isSidebar: false,
			isRecorder: false,
			isTextOutput: true,
			listSounds: [],
			isRecording: false,
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
			addSharp,
			add,
			micOff,
			closeCircleSharp,
		};
	},
	computed: {
		...mapGetters([
			"getWordByName",
			"getWordById",
			"getWordsLength",
			"getSyllableById",
			"getListSyllables",
			"getSyllsByName",
		]),
		searchedWordResult() {
			let w;
			if (this.searchValue) {
				if (this.getWordByName(this.searchValue)) {
					w = this.getWordByName(this.searchValue);
					this.updateWord(w);
				}
			}
			return w;
		},
		searchedSyllResult() {
			let s = [];
			if (this.syllValue) {
				s = this.getSyllsByName(this.syllValue);
			}
			return s;
		},
	},
	methods: {
		...mapActions(["addSyllableIntoWord"]),
		initial() {
			let x = this.getWordById(this.id);
			this.word = x;
			this.sylls = x.sylls;
			this.addStopSyll();
		},
		addStopSyll() {
			let stop = { id: -1, name: "___", sound: "/assets/stop.wav" };
			this.sylls.unshift(stop);
		},
		nextWord() {
			this.id = this.id + 1;
			let x = this.getWordById(this.id);
			this.word = x;
			this.sylls = x.sylls;
			this.addStopSyll();
			this.sorted = [];
		},
		prevWord() {
			this.id = this.id - 1;
			let x = this.getWordById(this.id);
			this.word = x;
			this.sylls = x.sylls;
			this.addStopSyll();
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
							// c.remove();
							this.dragAction(a, index);
						}
					} else {
						if (!this.onDropbox(e.currentX, e.currentY)) {
							// c.remove();
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
				if (itemID > -1) {
					x.splice(result[1], 1);
					this.sylls = x;
				}

				//update sorted list
				y.push(result[0]);
				this.sorted = y;
			} else {
				let result = this.FindItemPosition(y, itemID);

				//update sylls list

				y.splice(result[1], 1);
				this.sorted = y;

				//update sorted list
				if (itemID > -1) {
					x.push(result[0]);
					this.sylls = x;
				}
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
			this.addStopSyll();
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
			this.listSounds = [];
			this.sorted.forEach((item) => {
				let audio = new Audio(item.sound);
				this.listSounds.push(audio);
			});
			this.playSequence();
		},
		playSequence() {
			if (this.listSounds.length > 0) {
				this.listSounds[0].play();
				this.listSounds[0].addEventListener("ended", () => {
					this.listSounds.shift();
					return this.playSequence(this.listSounds);
				});
			}
		},
		searchReset() {
			this.searchValue = "";
			this.syllValue = "";
		},
		toggleSearchBox() {
			this.isSearch = !this.isSearch;
		},
		toggleSidebar() {
			this.isSidebar = !this.isSidebar;
		},
		toggleSyllSearch() {
			this.searchReset();
			this.isSyllSearch = !this.isSyllSearch;
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
		toggleRecording() {
			this.isRecording = !this.isRecording;
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
		handleRecord() {
			// const record = document.querySelector('.startRecord');

			if (navigator.mediaDevices.getUserMedia) {
				console.log("getUserMedia supported.");

				const constraints = { audio: true };
				let chunks = [];

				let onSuccess = (stream) => {
					const mediaRecorder = new MediaRecorder(stream);
					// this.visualize(stream);
					mediaRecorder.start();

					const stop = document.querySelector(".stopRecord");
					stop.onclick = () => {
						mediaRecorder.stop();
						mediaRecorder.onstop = () => {
							console.log(
								"data available after MediaRecorder.stop() called."
							);

							// const clipName = 'abc';
							const clipContainer =
								document.createElement("article");
							const clipLabel = document.createElement("p");
							const audio = document.createElement("audio");
							const deleteButton =
								document.createElement("button");
							const soundClips =
								document.querySelector(".sound-clips");

							clipContainer.classList.add("clip");
							audio.setAttribute("controls", "");
							// clipLabel.textContent = clipName;

							clipContainer.appendChild(audio);
							clipContainer.appendChild(clipLabel);
							clipContainer.appendChild(deleteButton);
							soundClips.appendChild(clipContainer);

							audio.controls = true;
							const blob = new Blob(chunks, {
								type: "audio/wav; codecs=opus",
							});
							// this.saveFile(blob);
							var filename = "abc..wav";
							if (window.navigator.msSaveOrOpenBlob)
								// IE10+
								window.navigator.msSaveOrOpenBlob(
									blob,
									filename
								);
							else {
								// Others
								var aTag = document.createElement("a"),
									url = URL.createObjectURL(blob);
								aTag.href = url;
								aTag.download = filename;
								document.body.appendChild(aTag);
								console.log(aTag);

								aTag.addEventListener("click", (event) => {
									event.preventDefault();
									console.log(aTag);
									console.log(event);
								});

								// setTimeout(function() {
								//     document.body.removeChild(aTag);
								//     window.URL.revokeObjectURL(url);
								// }, 0);
							}

							chunks = [];
							const audioURL = window.URL.createObjectURL(blob);
							audio.src = audioURL;
							console.log("recorder stopped");
						};

						mediaRecorder.ondataavailable = function (e) {
							chunks.push(e.data);
						};
					};
				};

				let onError = function (err) {
					console.log("The following error occured: " + err);
				};

				navigator.mediaDevices
					.getUserMedia(constraints)
					.then(onSuccess, onError);
			} else {
				console.log("getUserMedia not supported on your browser!");
			}
		},
		// saveFile(blob) {
		//     console.log("start");
		// 	var a = document.createElement("a");
		// 	document.body.appendChild(a);
		// 	a.style = "display: none";
		//     const url = window.URL.createObjectURL(blob);
		// 	a.href = url;
		// 	a.click();
		// 	window.URL.revokeObjectURL(url);
		//     console.log("end");
		// },
		// visualize(stream) {
		// 	let audioCtx;
		// 	const canvas = document.querySelector(".visualizer");
		// 	const canvasCtx = canvas.getContext("2d");

		// 	if (!audioCtx) {
		// 		audioCtx = new AudioContext();
		// 	}

		// 	const source = audioCtx.createMediaStreamSource(stream);

		// 	const analyser = audioCtx.createAnalyser();
		// 	analyser.fftSize = 2048;
		// 	const bufferLength = analyser.frequencyBinCount;
		// 	const dataArray = new Uint8Array(bufferLength);

		// 	source.connect(analyser);
		// 	this.draw(canvas, canvasCtx, analyser, dataArray, bufferLength);
		// },
		// draw(canvas, canvasCtx, analyser, dataArray, bufferLength) {
		// 	const WIDTH = canvas.width;
		// 	const HEIGHT = canvas.height;

		// 	requestAnimationFrame(this.draw);

		// 	analyser.getByteTimeDomainData(dataArray);

		// 	canvasCtx.fillStyle = "rgb(200, 200, 200)";
		// 	canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

		// 	canvasCtx.lineWidth = 2;
		// 	canvasCtx.strokeStyle = "rgb(0, 0, 0)";

		// 	canvasCtx.beginPath();

		// 	let sliceWidth = (WIDTH * 1.0) / bufferLength;
		// 	let x = 0;

		// 	for (let i = 0; i < bufferLength; i++) {
		// 		let v = dataArray[i] / 128.0;
		// 		let y = (v * HEIGHT) / 2;

		// 		if (i === 0) {
		// 			canvasCtx.moveTo(x, y);
		// 		} else {
		// 			canvasCtx.lineTo(x, y);
		// 		}

		// 		x += sliceWidth;
		// 	}

		// 	canvasCtx.lineTo(canvas.width, canvas.height / 2);
		// 	canvasCtx.stroke();
		// },
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