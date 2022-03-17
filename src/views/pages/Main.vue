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
					<!-- <ion-icon
						v-if="!this.isSearch"
						@click="toggleSearchBox"
						class="searchOpen"
						:icon="search"
					></ion-icon> -->
					<ion-icon
						v-if="!this.isSearch"
						@click="toggleSidebar"
						class="searchOpen"
						:icon="addSharp"
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
						@click="toggleRecordPanel()"
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
					<!-- <p>Testing add syll from recording: {{ this.newSylls }}</p> -->
					<div class="tab-container" id="dragBox">
						<div
							class="dletter"
							v-for="item in orderedSylls"
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
							v-for="(item, index) in this.sorted"
							:key="item.id"
							:id="item.id"
							:index="index"
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
			<!-- <a class="fixedBtn btnCir add" @click="toggleSidebar">
				<ion-icon class="add-icon" :icon="addSharp"></ion-icon>
			</a> -->
			<!----- Store button ----->
			<a class="fixedBtn btnCir store" @click="storeWord">
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

			<!-- ///////// ADD SIDE BAR ////////////////////// -->
			<div
				v-if="this.isSidebar"
				class="panelWrapper"
				@click="this.closePanel($event)"
			>
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

					<ul v-if="this.syllValue == ''">
						<li
							v-for="(list, ind) in this.getListSyllablesByOrder"
							:key="ind"
						>
							<span class="listHeader"
								>{{ this.alpList[ind] }}
								<ion-icon :icon="listSharp"></ion-icon>
							</span>
							<ul class="list-group">
								<li
									v-for="item in list"
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
						</li>
					</ul>

					<!-- <ul class="list-group" v-if="this.syllValue == ''">                        
						<li
							v-for="item in this.getListSyllables"
							:key="item.id"
							:id="item.id"
							@click="playSyll('/assets/sylls/'+item.name+'.wav')"
						>
							{{ item.name }}
							<audio preload="none"
								:ref="'syll' + item.id"
								:src="item.sound"
							></audio>
							<ion-icon
								:icon="add"
								@click="handleAddSyll(item)"
							></ion-icon>
						</li>
					</ul> -->

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
			<div
				v-if="this.isRecorder"
				class="panelWrapper"
				@click="this.closePanel($event)"
			>
				<div class="recordPanel">
					<div class="headerRecordPanel" id="buttons">
						<span v-if="this.isRecording == 1"
							>Click on mic to record !</span
						>
						<span v-if="this.isRecording == 2"
							>Recording..., click on mic to stop !</span
						>
						<span v-if="this.isRecording == 3">Recorded !</span>

						<ion-icon
							class="closeRecorder"
							:icon="close"
							@click="toggleRecordPanel"
						></ion-icon>
					</div>
					<section
						class="sound-clips"
						v-if="this.isRecording == 3"
					></section>
					<section v-if="this.isRecording != 3">
						<canvas class="visualizer" height="60"></canvas>
					</section>
					<div class="stopRecordingWrap">
						<ion-icon
							v-if="this.isRecording == 1"
							class="startRecord"
							:icon="mic"
							@click="
								toggleRecording();
								handleRecord();
							"
						></ion-icon>

						<ion-icon
							v-if="this.isRecording == 2"
							class="stopRecord"
							:icon="micOff"
							@click="toggleRecording"
						></ion-icon>
						<!-- <span>00:00</span> -->
						<!-- <div
							class="recordedControls"
							v-if="this.isRecording == 3"
						>
							<button>Re-record</button>
							<button>Accept Record</button>
						</div> -->
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
// import { axiosInstance } from "../../config/axios";
import axios from "axios";
import _ from 'lodash';
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
	listSharp,
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
			isSidebar: true,
			isRecorder: false,
			isTextOutput: true,
			listSounds: [],
			isRecording: 1,
			newSylls: null,
			alpList: [
				"a",
				"bb",
				"b",
				"dj",
				"d",
				"e",
				"kk",
				"k",
				"l",
				"m",
				"ng",
				"nj",
				"n",
				"o",
				"rd",
				"rl",
				"rn",
				"rr",
				"r",
				"u",
				"w",
				"y",
			],
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
        this.getStorageWords();
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
			listSharp,
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
			"getListSyllablesByOrder",
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
		orderedSylls: function () {
			return _.orderBy(this.sylls, 'name')
		},
	
	
	},
	methods: {
		...mapActions(["addSyllableIntoWord", "addSyllableIntoWordByName", "getStorageWords"]),
		initial() {
			
			let x = this.getWordById(this.id);
			this.word = x;
			//why push not unshift?
		
			if (this.data){
				console.log(this.data.addSyll);
				x.sylls.push(this.data.addSyll);
			}
			const unique = [...new Map(x.sylls.map(item =>
				[item['name'], item])).values()];
			this.sylls = unique;
			
			//this works, but maybe easier way
			this.$nextTick(() => {this.updateEvent()});
		
			
			this.addStopSyll();
			// let k = this.getListSyllablesByOrder;
			// console.log(k);
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
		updateEvent() {
			// index=1 : drag in , index=2 : drag out
			let dragEl = document.getElementById("dragBox").children;
			for (let i = 0; i < dragEl.length; i++) {
				let c = dragEl[i];
				this.addGestureEvent(c, 1);
			}

			dragEl = document.getElementById("dropBox").children;
			for (let i = 0; i < dragEl.length; i++) {
				let c = dragEl[i];
				this.addGestureEvent(c, 2);
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
		addGestureEvent(c, index) {
			//index = 1: drag from dragBox
			//index = 2: drag from dropBox
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
					if (index == 1) {
						if (this.onDropbox(e.currentX, e.currentY)) {
							let a = c.getAttribute("id");
							this.dragAction(a, index);
						}
					} else {
						if (!this.onDropbox(e.currentX, e.currentY)) {
							let a = c.getAttribute("index");
							this.dragAction(a, index);
						}
					}
				},
			});
			// if (on)
			gesture.enable(true);
			// else gesture.destroy();
		},
		dragAction(itemID, option) {
			//option = 1: drag from dragBox
			//option = 2: drag from dropBox

			let x = JSON.parse(JSON.stringify(this.sylls));
			let y = JSON.parse(JSON.stringify(this.sorted));
			if (option == 1) {
				let result = this.FindItemPosition(x, itemID);

				//update sylls list
				// if (itemID > -1) {
				// 	x.splice(result[1], 1);
				// 	this.sylls = x;
				// }

				//update sorted list
				y.push(result[0]);
				this.sorted = y;
			} else {
				y.splice(itemID, 1);
				this.sorted = y;
				//update sorted list
				// if (itemID > -1) {
				// 	x.push(result[0]);
				// 	this.sylls = x;
				// }
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
			//this.$refs[index][0].load();
			this.$refs[index].play();
		},
		playSyll(syll){
			const sound = new Audio( syll);
			sound.play();
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

			// if(this.isSidebar){
			//     console.log(this.isSidebar);
			//     console.log(e.target.parent);
			// }
		},
		closePanel(e) {
			if (e.target.className == "panelWrapper") {
				this.isSidebar = false;
				this.isRecorder = false;
			}
		},
		toggleSyllSearch() {
			this.searchReset();
			this.isSyllSearch = !this.isSyllSearch;
		},
		toggleRecordPanel() {
			this.isRecorder = !this.isRecorder;
			this.isRecording = 1;
		},
		toggleOutput(e) {
			if (!e.target.classList.contains("dletter")) {
				// console.log(this.isTextOutput);
				this.isTextOutput = !this.isTextOutput;
				this.updateSortedListOutput();
			}
		},
		toggleRecording() {
			if (this.isRecording == 3) this.isRecording = 1;
			else {
				this.isRecording = this.isRecording + 1;
			}
		},
		handleAddSyll(syll) {
			this.data = {
				wordID: this.word.id,
				addSyll: syll,
			};
			
			this.addSyllableIntoWord(this.data);
			this.isSidebar = false;

			// this.sorted = [];
			//update word list with new sylls into database
			this.initial();
            this.updateEvent(true);
		},
		handleRecord() {
			// const record = document.querySelector('.startRecord');
			const canvas = document.querySelector(".visualizer");
			let audioCtx;
			const canvasCtx = canvas.getContext("2d");
			let self = this;
			// const mainSection = document.querySelector(".main-controls");

			if (navigator.mediaDevices.getUserMedia) {
				console.log("getUserMedia supported.");

				const constraints = { audio: true };
				let chunks = [];

				let onSuccess = (stream) => {
					const mediaRecorder = new MediaRecorder(stream);

					visualize(stream);

					mediaRecorder.start();

					const stop = document.querySelector(".stopRecord");
					stop.onclick = () => {
						mediaRecorder.stop();
						mediaRecorder.onstop = () => {
							console.log(
								"data available after MediaRecorder.stop() called."
							);

							const clipContainer =
								document.createElement("article");

							const audio = document.createElement("audio");
							const recordButton =
								document.createElement("button");
							const acceptButton =
								document.createElement("button");
							const soundClips =
								document.querySelector(".sound-clips");

							clipContainer.classList.add("clip");
							audio.setAttribute("controls", "");

							clipContainer.appendChild(audio);
							clipContainer.appendChild(recordButton);
							clipContainer.appendChild(acceptButton);
							soundClips.appendChild(clipContainer);
							recordButton.textContent = "Re-record";
							recordButton.className = "reRecord";
							acceptButton.textContent = "Accept";
							acceptButton.className = "accept";

							audio.controls = true;
							const blob = new Blob(chunks, {
								type: "audio/wav; codecs=opus",
							});
							// this.saveFile(blob);
							var filename = "abc.wav";
							if (window.navigator.msSaveOrOpenBlob)
								// IE10+
								window.navigator.msSaveOrOpenBlob(
									blob,
									filename
								);
							else {
								// Others
								// var aTag = document.createElement("a"),
								// 	url = URL.createObjectURL(blob);
								// aTag.href = url;
								// aTag.download = filename;
								// document.body.appendChild(aTag);
								// console.log(aTag);
								// aTag.addEventListener("click", (event) => {
								// 	event.preventDefault();
								// 	console.log(aTag);
								// 	console.log(event);
								// });
							}

							chunks = [];
							const audioURL = window.URL.createObjectURL(blob);
							audio.src = audioURL;
							console.log("recorder stopped");
							recordButton.onclick = function () {
								self.isRecording = 1;
								return;
							};
							acceptButton.onclick = function () {
								// let URL = "....";

								// let data = new FormData();
								// data.append("name", "image");
								// data.append("file", event.target.files[0]);

								// let config = {
								// 	header: {
								// 		"Content-Type": "multipart/form-data",
								// 	},
								// };

								// axios
								// 	.post(URL, data, config)
								// 	.then((response) => {
								// 		console.log("response", response);
								// 	})
								// 	.catch((error) => {
								// 		console.log("error", error);
								// 	});

								// Code Python here
								self.loadingRecordingSylls();
								self.toggleRecordPanel();
								return;
							};
						};

						mediaRecorder.ondataavailable = function (e) {
							chunks.push(e.data);
						};
					};
				};

				let onError = function (err) {
					self.isRecorder = false;
					self.isRecording = 1;
					alert(
						err + ". Please allow apps to access your microphone"
					);
				};

				navigator.mediaDevices
					.getUserMedia(constraints)
					.then(onSuccess, onError);
			} else {
				alert("Browser is not supported the recording function!");
			}

			function visualize(stream) {
				if (!audioCtx) {
					audioCtx = new AudioContext();
				}

				const source = audioCtx.createMediaStreamSource(stream);

				const analyser = audioCtx.createAnalyser();
				analyser.fftSize = 2048;
				const bufferLength = analyser.frequencyBinCount;
				const dataArray = new Uint8Array(bufferLength);

				source.connect(analyser);
				//analyser.connect(audioCtx.destination);

				draw();

				function draw() {
					const WIDTH = canvas.width;
					const HEIGHT = canvas.height;
					requestAnimationFrame(draw);
					analyser.getByteTimeDomainData(dataArray);
					canvasCtx.fillStyle = "rgb(225, 222, 250)";
					canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
					canvasCtx.lineWidth = 2;
					canvasCtx.strokeStyle = "rgb(24, 16, 97)";
					canvasCtx.beginPath();
					let sliceWidth = (WIDTH * 1.0) / bufferLength;
					let x = 0;

					for (let i = 0; i < bufferLength; i++) {
						let v = dataArray[i] / 128.0;
						let y = (v * HEIGHT) / 2;

						if (i === 0) {
							canvasCtx.moveTo(x, y);
						} else {
							canvasCtx.lineTo(x, y);
						}

						x += sliceWidth;
					}

					canvasCtx.lineTo(canvas.width, canvas.height / 2);
					canvasCtx.stroke();
				}
			}

			// if (!isError) {
			// 	window.onresize = function () {
			// 		canvas.width = mainSection.offsetWidth;
			// 	};

			// 	window.onresize();
			// }
		},
		async loadingRecordingSylls() {
			const self = this;
			await axios
				.get("http://localhost:3000/read?file=kunw")
				.then((response) => {
					let list = JSON.stringify(response.data);
					list = JSON.parse(list);
					list = list.replace(/[' ]/g, "");
					list = list.substring(1, list.length - 3).split(",");

					self.handleAddingNewSylls(list);
					self.initial();

					this.newSylls = response.data; // assigns the data from api call to the users variable
				});
		},
		handleAddingNewSylls(syllNames) {
			let data = {
				wordID: this.word.id,
				syllNames: syllNames,
			};
			this.addSyllableIntoWordByName(data);

			// this.sorted = [];
			//update word list with new sylls into database
		},
		storeWord() {},
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