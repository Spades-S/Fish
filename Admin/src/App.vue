<template>
    <div id="app">
        <div class="name">订单管理系统</div>
        <router-view name="function"></router-view>
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'App',
        data(){
            return {}
        }

    }
</script>

<style lang="scss">
    body {
        margin: 0;
        padding: 0;
    }

    #app {
        position: fixed;
        height: 100%;
        width: 100%;
        margin: 0;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        background: url(./assets/background.png) center;
        -webkit-background-size: cover;
        background-size: cover;
        background: linear-gradient(#8ccad9, #d6c3ac);
        .name {
            margin-top: 30px;
            font-size: 25px;
            color: #fff;
        }

    }


</style>
