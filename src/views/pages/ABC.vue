<template>
	<div class="drop-zone" 
        @drop="onDrop($event, 1)"
        @dragenter.prevent
        @dragover.prevent
        >
		<!-- <div class="item" @dragstart="startDrag($event, item)" draggable="true" @dragstart="startDrag($event, item)">item 1</div> -->
		<div
			v-for="item in getList(1)"
			:key="item.id"
			class="item"
			draggable="true"
			@dragstart="startDrag($event, item)"
		>
			{{ item.id +" "+  item.name}}
		</div>
	</div>
	<div class="drop-zone" @drop="onDrop($event, 2)"
        @dragenter.prevent
        @dragover.prevent
        >
		<!-- <div class="item" @dragstart="startDrag($event, item)" draggable="true" @dragstart="startDrag($event, item)">item 1</div> -->
		<div
			v-for="item in getList(2)"
			:key="item.id"
			class="item"
			draggable="true"
			@dragstart="startDrag($event, item)"
		>
			{{ item.id +" "+  item.name}}
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
export default defineComponent({
	name: "",
	setup() {
		const items = ref([
			{ id: 0, name: "item a", list: 1 },
			{ id: 1, name: "item b", list: 2 },
			{ id: 2, name: "item c", list: 1 },
		]);

		const getList = (list) => {
			return items.value.filter((item) => item.list === list);
		};

		const startDrag = (event, item) => {
			console.log(item);
			console.log(event);
			// event.dataTransfer.dropEffect = "move";
			// event.dataTransfer.effectAllowed = "move";
			event.dataTransfer.setData("itemId", item.id);
		};

		const onDrop = (event, list) => {
			const itemID = event.dataTransfer.getData("itemId");
			const item = items.value.find((item) => (item.id == itemID));
			item.list = list;
		};

		return {
			getList,
			startDrag,
			onDrop,
		};
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