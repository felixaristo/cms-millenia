<script>
import router from '@/router';
import axios from 'axios';
import Swal from 'sweetalert2';
export default{
        data(){
            return {
                username: null,
                password: null
            }
        },
        methods: {
            gotoArticle(id){
                window.location.href = "/article/" + id
            },
            async login(){
                console.log(this.username);
                console.log(this.password);
                let data = {
                    "username": this.username,
                    "password": this.password
                }
                await axios.post(import.meta.env.VITE_BASE_URL_API + 'auth/login', data).then((resp) => {
                    console.log(resp.status);
                    sessionStorage.setItem('login', 'true');
                    sessionStorage.setItem('user', JSON.stringify(resp.data));
                    if(resp.status){
                        router.push('/')
                    }else{
                        Swal.fire({
                            title: "Unauthorized!",
                            text: "Wrong username or password!",
                            icon: "error"
                            }).then(() => {
                            })
                    }
                })
            } 
        },
        async setup(){
            // const res = await fetch('https://mill-cloud.id/articles/articles_data.json')
            // const posts = await res.json()
            let session = await sessionStorage.getItem('login');
            console.log(session);
            sessionStorage.clear();
            
            // return {
            //     posts
            // }
        },
        mounted(){
            // console.log();
            
            // let el = window.location.hash;
            // console.log(el);
            // if(typeof el !== 'undefined' && el != ''){
            //     console.log('ini');
            //     console.log(el.replace('#',''));
                
            //     var element = document.getElementById(el.replace('#',''))
            //     var elementPosition = element.getBoundingClientRect().top;
            //     console.log(elementPosition);
            //     var headerOffset = 10;
            //     var offsetPosition = elementPosition;
      
            //     window.scrollTo({
            //         top: offsetPosition,
            //         behavior: "smooth"
            //     });
            //     // .scrollIntoView({ behavior: "smooth" });
            // }
            
            // // if (typeof el.length === undefined) {
            // //     // document.getElementById(el).scrollIntoView({ behavior: "smooth" });
            // // }
        }
    }
</script>
<template>
    <div class="bg-gradient-primary">
            <div class="container" style="height: 100vh;">

        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-4 col-lg-4 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <!-- <div class="col-lg-6 d-none d-lg-block bg-login-image"></div> -->
                            <div class="col-lg-12">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Username..." v-model="username" @keyup.enter="login()">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password" v-model="password" @keyup.enter="login()">
                                        </div>
                                        <span class="btn btn-primary btn-user btn-block" v-on:click="login()">
                                            Login
                                        </span>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        </div>
    </div>
</template>