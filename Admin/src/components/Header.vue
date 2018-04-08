<template>
    <div class="function-zone">
        <span>
            <span class="filter">状态过滤</span>
            <el-switch
                    v-model="filter"
                    active-color="#13ce66"
                    inactive-color="#9e9e9e"
                    @change="changeFilterStatus"
            >
            </el-switch>
        </span>
        <span>
            <span class="save">修改状态后请保存</span>
            <el-button type="primary" icon="el-icon-check" size="mini" @click="save"></el-button>
        </span>
        <el-button type="warning" size="mini" class="side" @click="toChPsw">修改密码</el-button>
        <el-button type="danger" size="mini" class="side" @click="signOut">注销</el-button>
    </div>
</template>
<script>
    import Bus from '../assets/Bus'
    import cookie from '../utils/cookie'

    export default {
        data() {
            return {
                filter: false
            }
        },
        methods: {
            changeFilterStatus(status) {
                Bus.$emit('changeFilterStatus', status)
            },
            save() {
                Bus.$emit('save', 'savedata')
            },
            toChPsw() {
                this.$router.push('/chpsw')
            },
            signOut(){
                try {
                    cookie.remove('TOKEN')
                } catch (err) {
                    console.log(err)
                }
                this.$router.push('/login')
            }
        }
    }
</script>
<style lang="scss" scoped>


    .function-zone {
        margin-top: 20px;
    }

    .filter, .save {
        font-size: 16px;
        color: #fff;

    }

    .save {
        margin-left: 40px;
    }

    .side {
        margin-left: 30px;
    }
</style>