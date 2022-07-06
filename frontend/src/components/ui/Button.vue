<template lang="pug">
	component.b-button(
		v-bind="attrs"
		v-on:click="$emit('click', $event)"
	)
		span(
			:style="{'opacity': `${loading ? '0' : null}`}"
		)
			slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {TagPropsType} from "@/js/types/utility/helpers";
import getOptionsByTag from "@/js/types/utility/getOptionsByTag";

export interface IButtonProps {
	view?: | 'primary' | 'secondary'
	tag?: Extract<TagPropsType, 'button' | 'a'>
	type?: 'button' | 'submit'
	disabled?: boolean | ''
	loading?: boolean
	href?: string
	ariaLabel: string
}

@Component
export default class Button extends Vue {
	@Prop({ default: 'primary' }) readonly view?: IButtonProps['view']
	@Prop({ default: 'button' }) readonly tag?: IButtonProps['tag']
	@Prop({ default: 'button' }) readonly type?: IButtonProps['type']
	@Prop({ required: true }) readonly ariaLabel!: IButtonProps['ariaLabel']
	@Prop() readonly href?: IButtonProps['href']
	@Prop() readonly loading?: IButtonProps['loading']
	@Prop() readonly disabled?: IButtonProps['disabled']
	
	get attrs (): Record<string, unknown> {
		return {
			...this.tag === 'a' && getOptionsByTag('a', this.href),
			...this.tag === 'button' && getOptionsByTag('button'),
			is: this.tag,
			type: this.type,
			class: this.classes,
			disabled: this.isDisabled,
			ariaLabel: this.ariaLabel
		}
	}
	
	get classes (): string[] {
		const classes = [`button--view-${this.view}`]
		if (this.isDisabled) {
			classes.push('is-disabled')
		}
		return classes
	}
	
	get isDisabled (): boolean {
		return typeof this.disabled !== 'undefined' && this.disabled !== false
	}
}

</script>
