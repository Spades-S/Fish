<template>
    <div class="container">
        <el-row :gutter="5" class="head">
            <el-col :span="1">序号</el-col>
            <el-col :span="4">产品名</el-col>
            <el-col :span="2">订购数量</el-col>
            <el-col :span="2">姓名</el-col>
            <el-col :span="3">联系电话</el-col>
            <el-col :span="2">地区</el-col>
            <el-col :span="5">地址</el-col>
            <el-col :span="3">留言</el-col>
            <el-col :span="2">订单状态</el-col>
        </el-row>
        <template v-for="(order,index) in orders">
            <el-row :gutter="5" class="order-item">
                <el-col :span="1">{{index + 1}}</el-col>
                <el-col :span="4">{{order.productName}}</el-col>
                <el-col :span="2">{{order.productNum}}</el-col>
                <el-col :span="2">{{order.name}}</el-col>
                <el-col :span="3">{{order.tel}}</el-col>
                <el-col :span="2">{{order.province}}</el-col>
                <el-col :span="5">{{order.address}}</el-col>
                <el-col :span="3">{{order.message}}</el-col>
                <el-col :span="2">
                    <el-switch
                            v-model="order.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="1"
                            :inactive-value="0"
                            :data-orderid="order.id"
                            class="order-switch"
                            @click.native="orderClick"
                            :disabled="order.status ===1"
                    >
                    </el-switch>
                </el-col>
            </el-row>
        </template>

        <el-pagination
                background
                layout="prev, pager, next"
                :total="total" :page-size="15" class="pagination" :current-page="page" @current-change="pageChange"
                :key="total">
        </el-pagination>
    </div>
</template>
<script>
    import axios from 'axios'
    import Bus from '../assets/Bus'
    import { Notification } from 'element-ui'

    //    axios.defaults.baseURL = 'http://localhost:3000'
    axios.defaults.withCredentials = true

    export default {
        data() {
            return {
                orders: [],
                page: 1,
                filtered: false,
                total: 0,
                IdtoChange: []
            }
        },
        created() {
            this.getCurrentPageData()
            this.getTotal()
            Bus.$on('changeFilterStatus', (status) => {
                this.filtered = status
                this.page = 1
                this.getCurrentPageData()
                this.getTotal()
            })
            Bus.$on('save', () => {
                this.saveData()
            })

        },
        methods: {
            getCurrentPageData() {
                axios.get(`/orders/${this.filtered}/${this.page}`)
                    .then(res => {
                        this.orders = res.data
                    }).catch(err => {
                    console.log(err.respnose.message)
                    if (err.response.status === 401) {
                        this.$router.push('/login')
                    }
                })
            },
            getTotal() {
                axios.get(`/total/${this.filtered}`)
                    .then(res => {
                        this.total = res.data
                    }).catch(err => {
                    console.log(err.message)
                    if (err.response.status === 401) {
                        this.$router.push('/login')
                    }
                })
            },
            pageChange(currentPage) {
                this.page = currentPage
                this.getCurrentPageData()
            },
            orderClick(e) {
                let switchDivEle = ''
                if (e.target.parentNode.className.includes('order-switch')) {
                    switchDivEle = e.target.parentNode
                } else {
                    switchDivEle = e.target.parentNode.parentNode
                }
                if (!switchDivEle.className.includes('is-disabled')) {
                    this.IdtoChange = [...this.IdtoChange, switchDivEle.dataset.orderid]
                }
            },
            saveData() {
                if (this.IdtoChange.length > 0) {
                    axios.put('/orders', {
                        data: {
                            idtochange: this.IdtoChange
                        }
                    }).then(res => {
                        this.IdtoChange = []
                        Notification({
                            title: '成功',
                            message: '保存成功',
                            type: 'success',
                            duration: 2000
                        })
                    }).catch(err => {

                        if (err.response.status === 401) {
                            Notification({
                                title: '失败',
                                message: '请重新登录',
                                type: 'err',
                                duration: 500
                            })
                            setTimeout(() => {
                                this.$router.push('/login')
                            }, 1000)
                        } else {
                            Notification({
                                title: '失败',
                                message: '保存失败',
                                type: 'err',
                                duration: 2000
                            })
                        }
                    })
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        position: absolute;
        top: 150px;
        bottom: 20px;
        left: 20px;
        right: 20px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        background: rgba(156, 154, 154, 0.22);
        .head {
            position: sticky;
            top: 0;
            padding-top: 5px;
            border-bottom: 1px solid #fff;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            line-height: 40px;
            background: rgb(156, 154, 154);
            color: #fff;
            z-index: 100;
        }
        .order-item {
            border-bottom: 1px solid #cacaca;
            padding: 8px 0;
            line-height: 30px;
            font-size: 16px;
            color: #000000;
            &:nth-of-type(2n+1) {
                background: rgba(134, 132, 132, 0.22);
            }

        }
        .pagination {
            margin-top: 30px;
            margin-bottom: 30px;
        }

    }

</style>