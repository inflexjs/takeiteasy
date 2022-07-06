<template lang="pug">
	component.b-link(
		:is="tag"
		:class="classes"
		v-on="events"
		v-bind="attrs"
	)
		span
			slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import getOptionsByTag from "@/js/types/utility/getOptionsByTag";

export interface ILinkProps {
	href: string
	tag?: 'a' | 'button' | 'p'
	size?: 's' | 'm' | 'inherit'
	view?: 'primary' | 'secondary'
	underline?: boolean | string
	disabled?: boolean | string
}

@Component
export default class Link extends Vue {
	@Prop() readonly href!: ILinkProps['href']
	@Prop({ default: 'a' }) readonly tag!: ILinkProps['tag']
	@Prop({ default: 'm' }) readonly size!: ILinkProps['size']
	@Prop({ default: 'primary' }) readonly view!: ILinkProps['view']
	@Prop() readonly underline!: ILinkProps['underline']
	@Prop() readonly disabled?: ILinkProps['disabled']
	
	get notLinkTags (): boolean {
		return this.tag !== 'a'
	}
	
	get isDisabled (): boolean {
		return typeof this.disabled !== 'undefined' && this.disabled !== false
	}
	
	get classes (): string[] {
		const classes = [
			`link--view-${this.view}`,
			`link--size-${this.size}`
		]
		
		if (this.isDisabled) {
			classes.push('is-disabled')
		}
		
		if (this.isUnderline) {
			classes.push('is-underline')
		}
		
		return classes
	}
	
	get attrs (): Record<string, unknown> {
		return {
			...this.tag === 'a' && getOptionsByTag('a', this.href),
			...this.tag === 'button' && getOptionsByTag('button')
		}
	}
	
	get isUnderline (): boolean {
		return typeof this.underline !== 'undefined' && this.underline !== false
	}
	
	get events (): Record<string, (e: Event) => void> {
		return {
			...!this.isDisabled && {
				...this.notLinkTags && {
					click: (e: Event) => this.$emit('click', e)
				},
				mouseenter: (e: Event) => this.$emit('mouseenter', e),
				mouseleave: (e: Event) => this.$emit('mouseleave', e)
			}
		}
	}
}

</script>
