<template lang="pug">
	.b-dropdown(
		:class="classes"
		@click="openMenu"
	)
		.__text {{label}}
		transition(
			name="fade-dropdown"
			mode="out-in"
		)
			.__list(
				v-if="active && list"
				v-on-click-away="away"
			)
				.__item(
					v-for="item in list"
				) {{item.name}}
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { directive as onClickAway} from 'vue-clickaway/index';


@Component({
	directives:{
		'on-click-away': onClickAway
	}
})
export default class Dropdown extends Vue {
	@Prop({ default: 'Choose' }) readonly label!: string
	@Prop() readonly list!: { id: number, name: string }[]
	
	active = false
	
	openMenu(e: HTMLElement) {
		//@ts-ignore
		// console.log(e.target as HTMLInputElement)
		this.active = !this.active;
	}
	
	away() {
		console.log('click away')
		this.active = false
	}
	
	get classes() {
		let classes = []
		if (this.active) {
			classes.push('active')
		}
		return classes
	}
}
</script>