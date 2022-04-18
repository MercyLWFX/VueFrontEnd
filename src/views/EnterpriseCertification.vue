<template>
    <div>
        <div style="margin: 10px 0">
            <el-popconfirm
                    class="ml-5"
                    confirm-button-text='确定'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="您确定批量删除这些数据吗？"
                    @confirm="delBatch"
            >
                <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
            </el-popconfirm>

        </div>
        <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'" max-height="480px"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="userId" label="申请人ID" width="80"></el-table-column>
            <el-table-column label="企业法人营业执照">
                <template slot-scope="scope">
                    <el-button type="primary" @click="preview(scope.row.businessLicence)">预览</el-button>
                </template>
            </el-table-column>
            <el-table-column label="企业认证公函">
                <template slot-scope="scope">
                    <el-button type="primary" @click="preview(scope.row.certificationLetter)">预览</el-button>
                </template>
            </el-table-column>
            <el-table-column label="商标注册证">
                <template slot-scope="scope">
                    <el-button type="primary" @click="preview(scope.row.registrationCertificate)">预览</el-button>
                </template>
            </el-table-column>
            <el-table-column label="税务登记证">
                <template slot-scope="scope">
                    <el-button type="primary" @click="preview(scope.row.taxCertificate)">预览</el-button>
                </template>
            </el-table-column>
            <el-table-column label="是否同意">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.agree" active-color="#13ce66" inactive-color="#ccc" @change="changeEnable(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作"  width="200" align="center">
                <template slot-scope="scope">
                    <el-popconfirm
                            class="ml-5"
                            confirm-button-text='确定'
                            cancel-button-text='我再想想'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定删除吗？"
                            @confirm="del(scope.row.id)"
                    >
                        <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EnterpriseCertification",
        data() {
            return {
                tableData: [],
                name: '',
                multipleSelection: [],
                pageNum: 1,
                pageSize: 5,
                total: 0,
                myHeaders: {token:JSON.parse(localStorage.getItem("token"))},
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.request.get("/certify/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                    }
                }).then(res => {

                    console.log(res)
                    this.tableData = res.data.records
                    this.total = res.data.total

                })
            },
            changeEnable(row) {
                console.log(row)
                this.request.post("/certify/update", row).then(res => {
                    if (res.code === '200') {
                        this.$message.success("操作成功")
                    }
                })
            },
            del(id) {
                this.request.delete("/certify/" + id).then(res => {
                    if (res.code === '200') {
                        this.$message.success("删除成功")
                        this.load()
                    } else {
                        this.$message.error("删除失败")
                    }
                })
            },
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val
            },
            delBatch() {
                let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
                this.request.post("/certify/del/batch", ids).then(res => {
                    if (res.code === '200') {
                        this.$message.success("批量删除成功")
                        this.load()
                    } else {
                        this.$message.error("批量删除失败")
                    }
                })
            },
            reset() {
                this.name = ""
                this.load()
            },
            handleSizeChange(pageSize) {
                console.log(pageSize)
                this.pageSize = pageSize
                this.load()
            },
            handleCurrentChange(pageNum) {
                console.log(pageNum)
                this.pageNum = pageNum
                this.load()
            },
            handleFileUploadSuccess(res) {
                console.log(res)
                this.load()
            },
            preview(url) {
                window.open('https://file.keking.cn/onlinePreview?url=' + encodeURIComponent(window.btoa((url))))
            },
        }
    }
</script>

<style scoped>

</style>