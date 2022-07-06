<template lang="pug">
	.b-select
		label.__label {{label}}
		dropdown-component.__dropdown(
			:list="list"
		)
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Dropdown from "@/components/ui/Dropdown.vue";

@Component({
	components: {
		'dropdown-component': Dropdown,
	}
})
export default class Select extends Vue {
	@Prop({required: true}) readonly label!: string
	@Prop() readonly list!: { id: number, name: string }[]
}
</script>