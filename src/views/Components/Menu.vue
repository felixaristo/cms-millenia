<template>
    <li class="nav-item" :class="{ active: $route.path === '/' || $route.name === 'addarticle' || $route.name === 'updatearticle'}">
        <a class="nav-link" href="/">
            <i class="fas fa-fw fa-list"></i>
            <span>Article</span></a>
    </li>
    <li class="nav-item" :class="{ active: $route.name === 'banner' || $route.name === 'addbanner' || $route.name === 'updatebanner'}">
        <a class="nav-link" href="/banner">
            <i class="fas fa-fw fa-list"></i>
            <span>Banner</span></a>
    </li>
</template>
<script>
export default {
  name: "Menu"
};
</script>