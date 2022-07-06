<template lang="pug">
	.b-title
		h1
			slot
		p(
			v-if="description"
		) {{description}}
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Title extends Vue {
	@Prop() readonly description?: string
}
</script>