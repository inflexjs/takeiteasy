<template lang="pug">
	.b-home
		form-component.__form
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Form from "@/components/blanks/Form.vue";

@Component({
	components: {
		'form-component': Form
	}
})
export default class Home extends Vue {

}
</script>