<script setup>
    const attendants = [
      {
        app: 'whatsapp',
        label: 'Hubungi',
        name: 'Customer Service',
        number: '6281946542828',
        avatar: {
          src: 'http://mill-cloud.id/storage/img/man.png'
        }
      }
    ]

    function hideMenu(){
      var element = document.getElementById("nav-offcanvas");
      // element[0].style.display = "none"
      element.setAttribute("style","display:none");
      element.classList.remove("show");

      var element2 = document.getElementsByClassName("offcanvas-backdrop");
      console.log(element2);
      // element2[0].style.display = "none"
      // element2.remove()
      // while(element2.length > 0){
          element2[0].parentNode.removeChild(element2[0]);
      // }

      document.getElementsByTagName("body")[0].style.overflow = "auto"

      // document.getElementsByClassName("navbar2")[0].style.display = "none";
      
    }

</script>
<template>

  <!-- <BNavbar class="color-tone navbar1" v-b-color-mode="'dark'" variant="primary">
        <BNavbarBrand tag="h1" class="mb-0" href="/"><img src="../src/assets/img/logo.png" alt="" width="120"></BNavbarBrand>
        <BNavbarNav class="navbar1-item">
            <BNavItem href="/#aboutus">OUR VALUES</BNavItem>
            <BNavItem href="/#artikel">OUR PRODUCT</BNavItem>
            <BNavItem href="/#transformasicloud">RECIPES</BNavItem>
            <BNavItem href="/#petasolusi">WHAT'S NEW</BNavItem>
            <BNavItem href="/#manfaatbisniserp">GALLERY</BNavItem>
        </BNavbarNav>
    </BNavbar>
    <BNavbar class="color-tone navbar2" v-b-color-mode="'dark'" :toggleable="true" variant="primary" :auto-close="'outside'">
        <BNavbarBrand tag="h1" class="mb-0" href="/"><img src="../src/assets/img/logo.png" alt="" width="120"></BNavbarBrand>
        <BNavbarToggle target="nav-offcanvas" />
        <BOffcanvas id="nav-offcanvas" placement="end" is-nav>
            <BNavbarNav>
              <BNavItem href="/#aboutus">OUR VALUES</BNavItem>
              <BNavItem href="/#artikel">OUR PRODUCT</BNavItem>
              <BNavItem href="/#transformasicloud">RECIPES</BNavItem>
              <BNavItem href="/#petasolusi">WHAT'S NEW</BNavItem>
              <BNavItem href="/#manfaatbisniserp">GALLERY</BNavItem>
            </BNavbarNav>
        </BOffcanvas>
    </BNavbar> -->

  <Suspense>
    <RouterView />
  </Suspense>

</template>

