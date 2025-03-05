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
            
            const file = ref<null | File>(null)
            let dataEditor = null
            let user = null
            return {
                articleJson: null,
                currentArticle: null,
                othersArticle: null,
                file: file,
                dataEditor: dataEditor,
                title: null,
                description: null,
                image: null,
                content: null,
                author: null,
                user: user,
                previewImage: null
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
            async getData(id){
                await axios.get(import.meta.env.VITE_BASE_URL_API + 'article/detail/' + id).then((resp) => {
                    console.log(resp);
                    let items = resp.data.data
                    this.title = items.title
                    this.description = items.description
                    this.dataEditor = items.content
                    this.previewImage = items.image
                })
            },
            async submitForm(){
                // console.log(this.dataEditor);
                // console.log(this.title);
                // console.log(this.image);
                // console.log(this.description);
                let formData = new FormData();

                let userData = sessionStorage.getItem('user');
                userData = JSON.parse(userData);

                formData.append('title', this.title);
                if(this.image !== null){
                    formData.append('image', this.image);
                }
                formData.append('author', userData.id);
                formData.append('description', this.description);
                formData.append('content', this.dataEditor);

                if(this.title !== null && this.description !== null && this.dataEditor !== null){
                
                    await axios.post(import.meta.env.VITE_BASE_URL_API + 'article/update/' + this.$route.params.id, formData).then((resp) => {
                        console.log(resp.status);
                        console.log(resp);
                        if(resp.status == 200){
                            Swal.fire({
                            title: "Success!",
                            text: "Article success uploaded!",
                            icon: "success"
                            }).then(() => {
                                router.push('/'); 
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
            }
        },
        async setup(){
            let login = await sessionStorage.getItem('login');
            console.log(login);
            if(login === null || login != 'true'){
                router.push('/login');
            }
        },
        async mounted(){
            console.log(this.$route.params.id);
            await this.getData(this.$route.params.id);
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
            <li class="nav-item active">
                <a class="nav-link" href="/">
                    <i class="fas fa-fw fa-list"></i>
                    <span>Article</span></a>
            </li>
<!-- 
            <li class="nav-item">
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
                        <h1 class="h3 mb-0 text-gray-800">Detail Article</h1>
                    </div>
                    <BForm>
                        <BFormGroup class="col-lg-12" id="input-group-2" label="Title" label-for="input-2">
                            <BFormInput id="input-2"  placeholder="Enter title.." v-model="title" required  />
                        </BFormGroup><br>
                        <BFormGroup class="col-lg-12" id="input-group-2" label="Description" label-for="input-2">
                            <BFormTextarea placeholder="Enter description..." rows="2" v-model="description" required />
                        </BFormGroup><br>
                        <div style="margin: 0px 0px 10px 10px;">
                            <img :src="previewImage" width="500">
                        </div>
                        <BFormGroup class="col-lg-12" id="input-group-2" label="Image" label-for="input-2">
                            <BFormFile v-model="image" />
                        </BFormGroup><br>
                        <BFormGroup class="col-lg-12" id="input-group-2" label="Content" label-for="input-2">
                            <Editor v-model="dataEditor"/>
                        </BFormGroup><br>
                        <BFormGroup class="col-lg-12" id="input-group-2" label-for="input-2">
                            <span @click="submitForm()"  class="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"><i
                                class="fa fa-spinner fa-sm text-white-100"></i> Save Changes</span>
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
