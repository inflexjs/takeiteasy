<template lang="pug">
	.b-params
		drop-zone-component.__dropzone(
			@upload="upload"
		)
		.__options
			select-component.__select(
				v-for="(list, name, index) in lists"
				:list="list"
				:label="name"
			)
		button-component.__button(
			aria-label="Get link"
			href="https://www.vk.com"
			tag="a"
		) Get link
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from "@/components/ui/Button.vue";
import DropZone from "@/components/ui/DropZone.vue";
import Select from "@/components/ui/Select.vue";

@Component({
	components: {
		'select-component': Select,
		'drop-zone-component': DropZone,
		'button-component': Button,
	}
})
export default class ParamsLayout extends Vue {
	
	lists = {
		'Lifetime': [
			{
				id: 1,
				name: 'Once',
			},
			{
				id: 2,
				name: 'One day',
			},
			{
				id: 3,
				name: 'One week',
			},
			{
				id: 4,
				name: 'One month',
			},
			
		],
		'Private': [
			{
				id: 1,
				name: 'Yes',
			},
			{
				id: 2,
				name: 'No',
			},
		],
		'Numbers': [
			{
				id: 1,
				name: 'Yes',
			},
			{
				id: 2,
				name: 'No',
			},
		],
	}
	
	upload(file: File): void {
		console.log(file)
	}
}
</script>