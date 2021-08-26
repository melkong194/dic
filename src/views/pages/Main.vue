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
							v-for="(item, index) in this.dropList"
							:key="item.id"
							class="dletter"
							draggable="true"
							@dragstart="startDrag($event, item.id)"
							@click="playSound('drop' + index)"
						>
							{{ item.name }}
							<audio
								:ref="'drop' + index"
								v-bind:src="item.sound"
							></audio>
                            <!-- <span class="deleteSpan">x</span> -->
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
		IonIcon,
	},

	setup() {
		const items = ref([
			{ id: 0, name: "item 0", sound: "/assets/sylls/a.wav" },
			{ id: 1, name: "item 1", sound: "/assets/sylls/ba.wav" },
			{ id: 2, name: "item 2", sound: "/assets/sylls/bad.wav" },
			{ id: 3, name: "item 3", sound: "/assets/sylls/badj.wav" },
			{ id: 4, name: "item 4", sound: "/assets/sylls/bah.wav" },
			{ id: 5, name: "item 5", sound: "/assets/sylls/bak.wav" },
			{ id: 6, name: "item 6", sound: "/assets/sylls/bal.wav" },
			{ id: 7, name: "item 7", sound: "/assets/sylls/balh.wav" },
			{ id: 8, name: "item 8", sound: "/assets/sylls/bang.wav" },
		]);

        const dropList = ref([
			{ id: 9, name: "item 9", sound: "/assets/sylls/bang.wav" },
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
            if (option == 2){
                const item = items.value.find((item) => item.id == itemID);
                items.value.splice(items.value.indexOf(item),1);
                dropList.value.push(item);
            }else{
                const item = dropList.value.find((item) => item.id == itemID);
                dropList.value.splice(items.value.indexOf(item),1);
                items.value.push(item);
            }
			
		};

		return {
			startDrag,
			onDrop,
			play,
			items,
            dropList
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