<script>
    export default{
        data(){
            return {
                articleJson: null,
                currentArticle: null,
                othersArticle: null
            }
        },
        methods: {
            gotoArticle(id){
                window.location.href = "/article/" + id
            }   
        },
        async setup(){
            const url = window.location.href;
            const id = url.split("/").slice(-1)[0];
            const res = await fetch('https://mill-cloud.id/articles/articles_data.json')
            const posts = await res.json()
            
            const currentArticle = posts.data.filter(l => l.id == id);
            const othersArticle = posts.data.filter(l => l.id != id);
            return {
                currentArticle,
                othersArticle
            }
        }
    }
</script>

<template>
    <BContainer class="bv-example-row" fluid='xxl'>
        <div class="current-article">
            <div>
                <div style="text-align: center;">
                    <h3>{{ currentArticle[0].title }}</h3>
                </div>
                <span style="font-size: 13px;">{{ currentArticle[0].author }}, {{ currentArticle[0].date }}</span>
                <img v-bind:src="currentArticle[0].image" style="width: 100%; margin-top: 10px;"><br>
                <div v-html="currentArticle[0].content" style="margin-top: 20px;"></div>
            </div>
        </div>
        <div class="other-article">
            <div style="text-align: center; margin-bottom: 40px;">
                <h4>Artikel Lainnya</h4>
            </div>
            <template v-for="i in othersArticle">
                <!-- border: 1px solid #8586bb; border-radius: 5px; -->
                <div @click="gotoArticle(i.id)" class="item item-artikel" style="display: flex;  margin-bottom: 30px;">
                    <div style="width: 400px;">
                        <img class="thumbnail" v-bind:src="i.image" style="width: 100%; height: 100%; border-radius: 5px 0px 0px 5px;">
                    </div>
                    <div style="width: 1200px; padding: 5px 10px 5px 10px;">
                        <p style="font-weight: bold; font-size: 18px;">{{ i.title }}</p>
                        <p style="font-size: 14px; margin-top: 10px; text-align: justify;">{{ i.description }}</p>
                        <div class="discovery-btn" @click="gotoArticle(posts.data[3].id)">
                            <span>Discover More</span>
                            <img src="../../assets/img/down.png" style="width: 18px;">
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </BContainer>
</template>

