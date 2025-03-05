<script>
import router from '@/router';
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
    export default{
        props:{
            tes: "ok"
        },
        data(){
            const fields = ['image', 'title', 'description', 'action']
            const items = []
            return {
                data: null,
                items: null,
                fields: fields,
                items: items
            }
        },
        methods: {
            gotoArticle(id){
                window.location.href = "/update-article/" + id
            },
            gotoPage(page){
                router.push('add-article');
            },
            logout(){
                sessionStorage.clear();
                location.reload();
            },
            async deleteArticle(id, title){
                // alert(title);
                console.log(title);
                
                Swal.fire({
                    title: "Are you sure want to delete?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.deleteFunction(id);
                        // console.log(deleteResp);
                        
                        // if( == 200){
                            Swal.fire({
                            title: "Success!",
                            text: "Delete article success!",
                            icon: "success"
                            }).then(() => {
                                location.reload()
                            })
                        // }
                    }
                });
            },
            async deleteFunction(id){
                return await axios.delete(import.meta.env.VITE_BASE_URL_API + 'article/delete/' + id).then((resp) => {
                    console.log(resp.status);
                    return resp.status;
                })
            },
            async getData(){
                
                await axios.get(import.meta.env.VITE_BASE_URL_API + 'article/list/1/10').then((resp) => {
                    console.log(resp.status);
                    
                    this.items = JSON.parse(JSON.stringify(this.data))
                    // console.log(JSON.parse(JSON.stringify(this.data)));
                    this.items = resp.data.data

                    this.items.forEach(element => {
                        element.action = element.id
                    });
                })
            }
        },
        async setup(){
            let login = await sessionStorage.getItem('login');
            console.log(login);
            if(login === null || login != 'true'){
                router.push('/login');
            }
            
        },
        mounted(){
            // console.log('ino');
            
            this.getData();
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
                        <h1 class="h3 mb-0 text-gray-800">Article</h1>
                        <span @click="gotoPage('add-article')"  class="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"><i
                                class="fas fa-plus fa-sm text-white-50"></i> Add</span>
                    </div>
                    <!-- Content Row -->
                    <div>
                        <BTable striped hover :items="items" :fields="fields" responsive="sm">
                            <template #cell(image)="row">
                                <img :src="row.value" width="200">
                            </template>
                            <template #cell(action)="row2">
                                <BButton size="sm" class="mr-2 btn-info" v-on:click="gotoArticle(row2.value)">
                                    <i class="fas fa-arrow-right fa-sm text-white-100"></i>
                                </BButton>
                                <BButton size="sm" class="btn-danger" v-on:click="deleteArticle(row2.value, title)">
                                    <i class="fas fa-trash fa-sm text-white-100"></i>
                                </BButton>
                            </template>
                        </BTable>
                    </div>

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
