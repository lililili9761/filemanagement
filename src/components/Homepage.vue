<template>
<el-container>
  <el-aside>
    <el-card class="box-card usercard" shadow="never">
      <el-dropdown>
        <span class="el-dropdown-link">
          欢迎您，<span>管理员</span><span>lililili</span><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>帮助</el-dropdown-item>
          <el-dropdown-item divided>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-card>
    <el-button class="delete" type="danger"><i class="el-icon-delete"></i>删除文件</el-button>
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleChange"
      :file-list="fileList3">
      <el-button class="upload" type="primary"><i class="el-icon-upload"></i>上传文件</el-button>
    </el-upload>
  </el-aside>
  <el-main>
    <el-table stripe highlight-current-row ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="name" label="文件名" width="120">
      </el-table-column>
      <el-table-column prop="memorysize" label="大小" class="size">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="文件名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="文件大小">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="文件类型">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="修改日期">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="作者">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="专辑">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="文件描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="类型" width="100" :filters="[{ text: 'mp4', value: 'mp4' }, { text: 'avi', value: 'avi' }]"
        :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tag === 'mp4' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</el-container>
</template>

<style>
.el-aside {
    color: #333;
    width: 16.66667% !important;
    background-color:#f8f8f8;
    font-size:12px;
    border-right:1px solid #e7e7e7;
}
.el-card {
    text-align: center;
}
.upload-demo {
    margin-top:2em;
    padding: 0 25%;
}
.delete {
    margin-top:3em;
    margin-left:25%;
}
.usercard {
    background-color:#f8f8f8;
    border-bottom:1px solid #e7e7e7;
    border-top:none;
    border-left:none;
    border-right:none;
    border-radius: none;
    padding:3em 0;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>

<script>
export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: 'xxx.mp4',
          memorysize: '1234kb',
          tag: 'mp4'
        }, {
          date: '2016-05-04',
          name: 'xxx.mp4',
          memorysize: '1234kb',
          tag: 'mp4'
        }, {
          date: '2016-05-01',
          name: 'uuu.avi',
          memorysize: '1234kb',
          tag: 'avi'
        }, {
          date: '2016-05-03',
          name: 'uuu.avi',
          memorysize: '1234kb',
          tag: 'avi'
        },{
            date: '2016-05-03',
            name: 'uuu.avi',
            memorysize: '1234kb',
            tag: 'avi'
        },{
            date: '2016-05-03',
            name: 'uuu.avi',
            memorysize: '1234kb',
            tag: 'avi'
        },{
            date: '2016-05-03',
            name: 'uuu.avi',
            memorysize: '1234kb',
            tag: 'avi'
        },{
            date: '2016-05-03',
            name: 'uuu.avi',
            memorysize: '1234kb',
            tag: 'avi'
        },{
            date: '2016-05-03',
            name: 'uuu.avi',
            memorysize: '1234kb',
            tag: 'avi'
        },{
            date: '2016-05-03',
            name: 'uuu.avi',
            memorysize: '1234kb',
            tag: 'avi'
        },{
            date: '2016-05-03',
            name: 'uuu.avi',
            memorysize: '1234kb',
            tag: 'avi'
        },{
            date: '2016-05-03',
            name: 'uuu.avi',
            memorysize: '1234kb',
            tag: 'avi'
        },{
            date: '2016-05-03',
            name: 'uuu.avi',
            memorysize: '1234kb',
            tag: 'avi'
        }],
        fileList3: [{
          name: 'food.jpeg',
          url:
          'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url:
          'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      }
    },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    filterTag(value, row) {
        return row.tag === value;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    }
    }
}
</script>