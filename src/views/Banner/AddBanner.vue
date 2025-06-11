<script>
import router from '@/router';
import $ from "jquery";
import { ref } from 'vue';
import Editor from '@/components/Editor.vue';
import axios from 'axios';
import Swal from 'sweetalert2'
// tinymce.init({
//         selector: '#mytextarea',
//         license_key: 'ncwczehoeh6tvtg8kitt8c6j9mostmox71ompuqlm70crdam'
//       });
// 
    export default{
        data(){
            const fields = ['No', 'first_name', 'last_name', 'show_details']
            const items = [
                {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
                {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
                {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
                {age: 38, first_name: 'Jami', last_name: 'Carney'},
            ]
            
            const file = ref<null | File>(null)
            let dataEditor = null
            let user = null
            const options = [
                {text: 'A', value: 'A', disabled: false},
                {text: 'B', value: 'B', disabled: false},
                {text: 'C', value: 'C', disabled: false},
                {text: 'D', value: {d: 1}, disabled: true},
                {text: 'E', value: 'E', disabled: false},
                {text: 'F', value: 'F', disabled: false},
                ]
            return {
                articleJson: null,
                currentArticle: null,
                othersArticle: null,
                items: items,
                fields: fields,
                file: file,
                dataEditor: dataEditor,
                title: null,
                description: null,
                image: null,
                content: null,
                author: null,
                user: user,
                itemsArticle: null,
                selected: null,
                options: options,
                order: null
            }
        },
        methods: {
            gotoArticle(id){
                window.location.href = "/article/" + id
            },
            logout(){
                sessionStorage.clear();
                location.reload();
            },
            async submitForm(){
                // console.log(this.dataEditor);
                // console.log(this.title);
                // console.log(this.image);
                // console.log(this.description);
                let formData = new FormData();

                let userData = sessionStorage.getItem('user');
                userData = JSON.parse(userData);

                // formData.append('title', this.title);
                formData.append('image', this.image);
                formData.append('article', this.selected);
                formData.append('order', this.order);
                // formData.append('description', this.description);
                // formData.append('content', this.dataEditor);

                

                if(this.image !== null && this.selected !== null && this.order !== null){
                
                    await axios.post(import.meta.env.VITE_BASE_URL_API + 'banner/create', formData).then((resp) => {
                        console.log(resp.status);
                        console.log(resp);
                        if(resp.status == 200){
                            Swal.fire({
                            title: "Success!",
                            text: "Banner success uploaded!",
                            icon: "success"
                            }).then(() => {
                                router.push('/banner'); 
                            })
                        }else{
                            Swal.fire({
                            title: "Problems!",
                            text: "Contact the Administrator!",
                            icon: "error"
                            }).then(() => {
                                router.push('/'); 
                            })
                        }
                    })
                }else{
                    Swal.fire({
                        title: "Empty form!",
                        text: "Please check the form must be full filled!",
                        icon: "error"
                    })
                }
            },
            async getData(){
                await axios.get(import.meta.env.VITE_BASE_URL_API + 'article/list/0/0').then((resp) => {
                    console.log(resp.status);
                    
                    // this.itemsArticle = JSON.parse(JSON.stringify(this.data))
                    // console.log(JSON.parse(JSON.stringify(this.data)));
                    this.itemsArticle = resp.data.data

                    this.itemsArticle.forEach(element => {
                        element.action = element.id
                    });
                })

                this.options = this.itemsArticle
            },
        },
        
        async setup(){
            let login = await sessionStorage.getItem('login');
            console.log(login);
            if(login === null || login != 'true'){
                router.push('/login');
            }
        },
        mounted(){
            // alert('ok')
            this.getData()
        }
    }

    
</script>

<template>
<div id="wrapper">
    
        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div class="sidebar-brand-text mx-3"><img src="../../assets/img/logo.png" width="100"></div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <Menu/>

            <!-- <li class="nav-item">
                <a class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-star"></i>
                    <span>Banner</span></a>
            </li> -->


        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>


                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">


                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <span class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-on:click="logout()">
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">Logout</span>
                                <!-- <img class="img-profile rounded-circle"
                                    src="img/undraw_profile.svg"> -->
                            </span>
                        </li>

                    </ul>

                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Add Banner</h1>
                    </div>
                    <BForm>
                        
                        <!-- <BFormGroup class="col-lg-12" id="input-group-2" label="Description" label-for="input-2">
                            <BFormTextarea placeholder="Enter description..." rows="2" v-model="description" required />
                        </BFormGroup><br> -->
                        <BFormGroup class="col-lg-12" id="input-group-2" label="Image" label-for="input-2">
                            <BFormFile v-model="image" />
                        </BFormGroup><br>
                        <BFormGroup class="col-lg-12" id="input-group-2" label="Article Relation" label-for="input-2">
                            <BFormSelect
                                v-model="selected"
                                :options="options"
                            />
                        </BFormGroup><br>
                        <BFormGroup class="col-lg-12" id="input-group-2" label="Order" label-for="input-2">
                            <BFormInput id="input-2"  placeholder="Order.." v-model="order" required  />
                        </BFormGroup><br>
                        <!-- <BFormGroup class="col-lg-12" id="input-group-2" label="Content" label-for="input-2">
                            <Editor v-model="dataEditor"/>
                        </BFormGroup><br> -->
                        <BFormGroup class="col-lg-12" id="input-group-2" label-for="input-2">
                            <span @click="submitForm()"  class="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"><i
                                class="fas fa-plus fa-sm text-white-50"></i> Submit</span>
                        </BFormGroup><br>
                    </BForm>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; mill-cloud 2025</span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
</template>
