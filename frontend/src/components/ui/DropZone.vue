<template lang="pug">
	.b-dropzone
		input.__value(
			ref="input"
			type="file"
			:disabled="dropzone.disabled"
			@change="upload"
		)
		.__content(
			:class="classes"
		)
			transition(
				name="fade"
				mode="out-in"
			)
				i.__icon(
					:class="dropzone.icon"
					:key="dropzone.icon"
				)
			transition(
				name="fade"
				mode="out-in"
			)
				.__text(
					:key="dropzone.status"
				) {{dropzone.name}}
</template>

<script lang="ts">
import {Component, Emit, Prop, Ref, Vue} from 'vue-property-decorator';

@Component
export default class Title extends Vue {
	@Ref('input') readonly inputRef!: HTMLInputElement
	
	@Emit('upload')
	uploadEmit(file: File) {
		return file
	}
	
	dropzone = {
		limit: 52428800,
		status: '',
		name: 'Upload file',
		icon: 'fa-solid fa-plus',
		disabled: false
	}
	
	upload(e: InputEvent) {
		const input = e.target as HTMLInputElement

		if (input && input.files && this.dropzone.limit) {
			if (input.files[0].size > this.dropzone.limit) {
				this.dropzone.status = 'Error'
				this.dropzone.name = 'File size is more than 50 mb'
				this.dropzone.icon = 'fa-solid fa-xmark'
				this.clear()
			} else {
				this.dropzone.status = 'Success'
				this.dropzone.name = input.files[0].name
				this.dropzone.icon = 'fa-solid fa-check'
				this.dropzone.disabled = true
				this.uploadEmit(input.files[0])
			}
		}
	}
	
	clear(){
		if(this.inputRef) {
			this.inputRef.value = ''
		}
	}
	
	get classes() {
		let classes
		if (this.dropzone.status) {
			return [`dropzone__content--${this.dropzone.status.toLowerCase()}`]
		}
		return classes
	}
}
</script>