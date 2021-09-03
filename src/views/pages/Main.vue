<template>
	<ion-page>
		<div id="contentBody">
			<ion-content id="icontent">

				<div id="contentWrapper">
                    <!-- ******** SEARCH BAR ******** -->
					<ion-searchbar
						class="searchWrapper"
						placeholder="Enter a word to search"
					></ion-searchbar>

                    <!-- <button id="aa" style="height:50px;width: 100px; background-color:#000; z-index: 99" ref="testbm">Banh mi1111111</button> -->

					<div class="searchedWord">
						ebeykakkakankanjdidih
						<ion-icon
							class="repeatButton"
							:icon="repeat"
						></ion-icon>
					</div>
                    <!-- ******** SYLLABLES ********* -->
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
                            :id="item.id"
							@click="playSound('sound' + item.id)"
						>     
							{{ item.name }}
							<audio
								v-bind:ref="'sound' + item.id"
								v-bind:src="item.sound"
							></audio>                      
						</div>
					</div>

                    <div class="main-footer">
					<div
						class="drop-area"
						id="dropBox"
						@drop="onDrop($event, 2)"
						@dragenter.prevent
						@dragover.prevent
					>
						<div
							v-for="item in this.dropList"
							:key="item.id"
							class="dletter"
                            id="item.id"
							draggable="true"
							@dragstart="startDrag($event, item.id)"
							@click="playSound('audio' + item.id)"
						>
							{{ item.name }}
							<audio
								:ref="'audio' + item.id"
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
					
				</div>
                 
				<!-- *****************FOOTER*********************** -->
				
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
			</ion-content>
		</div>
	</ion-page>
</template>

<script>
import { createGesture } from '@ionic/vue';
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
    // data(){
    //     const items = ref([
	// 		{ id: 0, name: "be", sound: "/assets/sylls/be.wav" },
	// 		{ id: 1, name: "bey", sound: "/assets/sylls/bey.wav" },
	// 		{ id: 2, name: "ka", sound: "/assets/sylls/ka.wav" },
	// 		{ id: 3, name: "kka", sound: "/assets/sylls/kka.wav" },
	// 		{ id: 4, name: "kan", sound: "/assets/sylls/kan.wav" },
	// 		{ id: 5, name: "kanj", sound: "/assets/sylls/kanj.wav" },
	// 		{ id: 6, name: "di", sound: "/assets/sylls/di.wav" },
	// 		{ id: 7, name: "dih", sound: "/assets/sylls/dih.wav" },
	// 	]);

	// 	const dropList = ref([
	// 	]);
    //     return{

    //     }
    // },
    mounted() {
        let dragEl = document.getElementsByClassName('dletter');
        for(let i =0; i < dragEl.length; i++){
            let c = dragEl[i];

            
            const gesture = createGesture({
                el: c,
                gestureName: "drag",
                disableScroll: true,
                threshold: 0,
                // onStart: event =>{
                //     if(isBegin){
                //         startpx = event.deltaX;
                //         startpy = event.deltaY;
                //         isBegin = false;
                //     }
                // },
                onMove: e =>{
                    c.style.transform = `translate(${e.deltaX}px, ${e.deltaY}px)`;    
                    if(this.onDropbox(e.currentX, e.currentY)){
                        c.style.position = 'sticky';
                        c.style.zIndex = 9;
                        c.style.border = "2px solid green";
                        if(this.onDropbox(e.currentX, e.currentY)){
                            c.style.border = "1px solid aqua";
                        }
                    }       
                },
                onEnd: e =>{
                    c.style.transform = `translate(0px, 0px)`;
                    c.style.border = "none";
                    // console.log(e.deltaY);
                    // console.log(this.onDropbox(e.currentX, e.currentY));
                    if(this.onDropbox(e.currentX, e.currentY)){
                        gesture.enable(false); 
                        let a  = c.getAttribute('id');
                        // console.log(a);                        
                        this.dragAction(a);
                        // c.remove();
                    }
                }
            });
            gesture.enable(true);
        }
        // b.forEach( el => {
        //     console.log(el);
        // })
        // let c = this.$refs.testbm;
        
    },
	
    setup(){
        const items = ref([
			{ id: 0, name: "be", sound: "/assets/sylls/be.wav" },
			{ id: 1, name: "bey", sound: "/assets/sylls/bey.wav" },
			{ id: 2, name: "ka", sound: "/assets/sylls/ka.wav" },
			{ id: 3, name: "kka", sound: "/assets/sylls/kka.wav" },
			{ id: 4, name: "kan", sound: "/assets/sylls/kan.wav" },
			{ id: 5, name: "kanj", sound: "/assets/sylls/kanj.wav" },
			{ id: 6, name: "di", sound: "/assets/sylls/di.wav" },
			{ id: 7, name: "dih", sound: "/assets/sylls/dih.wav" },
		]);

		const dropList = ref([
			// { id: 9, name: "item 9", sound: "/assets/sylls/bang.wav" },
		]);
        const dragAction=(itemID) =>{
            const item = items.value.find((item) => item.id == itemID);
            items.value.splice(items.value.indexOf(item), 1);
            dropList.value.push(item);
        };

        const startDrag=(event, id) => {
			event.dataTransfer.dropEffect = "move";
			event.dataTransfer.effectAllowed = "move";
			event.dataTransfer.setData("itemId", id);
		};

		const onDrop=(event, option) => {
			const itemID = event.dataTransfer.getData("itemId");
			if (option == 2) {
				const item = items.value.find((item) => item.id == itemID);
				items.value.splice(items.value.indexOf(item), 1);
				dropList.value.push(item);
			} else {
				const item = dropList.value.find((item) => item.id == itemID);
				items.value.push(item);
				dropList.value.splice(dropList.value.indexOf(item), 1);				
			}
		}

        return {
			startDrag,
			onDrop,
            dragAction,
            items, 
            dropList,
            repeat,
            play
		};
    },
	methods: {
        onDropbox(x,y){
            let elem = document.querySelector('#dropBox');
            let dropBox = elem.getBoundingClientRect();
            if(dropBox.left >= x) return false;
            if(dropBox.right <= x) return false;
            if(dropBox.top >= y) return false;            
            
            return true;
        },
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
		}
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