<template lang="pug">
	.b-form
		title-component.__title(
			description="free instant file sharing service"
		) takeIteasy
		.__content
			params-layout-component.__params
			//.__response responseLayout component
			//.__private privateLayout component
		.__donation
			p Do you want to support the author?
			link-component(
				underline
				href="#"
			) Donate him
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from "@/components/ui/Title.vue";
import Link from "@/components/ui/Link.vue";
import ParamsLayout from "@/components/blanks/layouts/ParamsLayout.vue";

@Component({
	components: {
		'params-layout-component': ParamsLayout,
		'title-component': Title,
		'link-component': Link
	}
})
export default class Form extends Vue {

}
</script>