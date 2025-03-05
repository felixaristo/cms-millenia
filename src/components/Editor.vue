<template>
    <ckeditor
        v-if="editor"
        v-model="data"
        :editor="editor"
        :config="config"
    />
</template>

<script setup>
import { ref, computed } from 'vue';
import { Ckeditor, useCKEditorCloud } from '@ckeditor/ckeditor5-vue';

const cloud = useCKEditorCloud( {
    version: '44.2.1'
} );

const data = ref( '<p>Hello world!</p>' );

const editor = computed( () => {
    if ( !cloud.data.value ) {
        return null;
    }

    return cloud.data.value.CKEditor.ClassicEditor;
} );

const config = computed( () => {
        if ( !cloud.data.value ) {
        return null;
    }

    const { Essentials, Paragraph, Bold, Italic, List, Underline, Heading, FontSize, Alignment } = cloud.data.value.CKEditor;
    // const { FormatPainter } = cloud.data.value.CKEditorPremiumFeatures;

    return {
        licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzI1ODIzOTksImp0aSI6IjFjMDM1YzIwLTM5MTQtNGU4Mi04NTYyLWY3Mjk4ZjQ2MGU3OCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCJdLCJ2YyI6ImQ0ZTk2Nzg3In0.tOd645w7Wov2JKhRJUIaz3WGU3OVcQzAqbswkKSu6NAcA6p_CHbqPhv79UGWBrcYypABQufUftP3EiE02ZA-5g',
        plugins: [ Essentials, Paragraph, Bold, Italic, List, Underline, Heading, Alignment ],
        toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', 'numberedList', 'bulletedList', 'underline', 'heading', 'alignment']
    };
} );
</script>
