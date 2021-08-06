<template>
  <div class='bg'>
    <div class='my-container'>
      <div class='wrap'>
        <div class='con'>
          <el-row :gutter='20'>
            <el-col :span='6' v-for='item in tokens'>
              <el-card class='box-card' shadow='hover'>
                <div slot='header' class='clearfix'>
                  <span>nft:{{ tokenAddr }}:{{ item.token_id }}</span>
                </div>
                <div class='box-card-content'>
                  <img :src='item.token_uri' class='image' />
                </div>
              </el-card>
            </el-col>
          </el-row>
          <span :v-show='nodata'>暂无数据</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodata: false,
      form: {
        token_addr: '0x538588892018cd2781d33b4001da2ff922f30a80',
        addr: '',
      },
      tokenAddr: null,
      tokens: [],
    };
  },
  created() {
    this.form.addr = this.$route.query.addr;
    this.query();
  },
  methods: {
    query() {
      if (!this.form.addr || this.form.addr == '') {
        console.log('weid为空');
        this.nodata = true;
      }

      let that = this;
      this.$axios({
        url:'https://weimang.cyberemd.com/welight/api/v1/nft/get_balance',
        method: 'get',
        params: ({
                  token_addr: that.form.token_addr,
                  addr: that.form.addr,
                })
      })
      .then(function(res){
        console.log('res', res);
        if (res.data.error_code == 0) {
          let balance = res.data.result.balance;
          if (balance && balance.length > 0) {
            that.tokenAddr = balance[0].token_addr;
            that.tokens = balance[0].tokens;
          } else {
            that.nodata = true;
          }
        } else {
          that.nodata = true;
        }
      })
      .catch(function (error) {
        that.nodata = true;
      });

    },
  },
};
</script>

<style lang='scss' scoped>

// bg and list css
.bg {
  background: #f0f2f3;
  width: 100%;
  padding: 0 !important;
  height: calc(100%);
  height: -webkit-calc(100%);
  height: -moz-calc(100%);
}

.my-container {
  padding: 30px;
  height: calc(100% - 120px);
  height: -webkit-calc(100% - 120px);
  height: -moz-calc(100% - 120px);
  overflow-y: auto;
  .wrap {
    height: calc(100%);
    height: -webkit-calc(100%);
    height: -moz-calc(100%);
    display: flex;
    flex-flow: column;
    box-sizing: border-box;
    .tab {
      height: 50px;
      overflow: hidden;
      background: #f7fafb;
      .tab-item {
        float: left;
        width: 120px;
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        color: #313437;
        text-align: center;
        cursor: pointer;
        &.active {
          border-top: 3px solid #0378ff;
          color: #0378ff;
          background: #fff;
        }
      }
    }
    .con {
      flex: 1;
      padding: 20px;
      box-sizing: border-box;
      background: #fff;
      overflow: auto;
      .link {
        cursor: pointer;
      }
      .blue {
        color: #0378ff;
      }
      .red {
        color: #ff0903;
      }
      .grey {
        color: rgba(61, 63, 66, 0.5);
      }
      /deep/.el-table th.gutter {
        display: table-cell !important;
      }
      /deep/.el-table colgroup.gutter {
        display: table-cell !important;
      }
      .sec1-search {
        overflow: hidden;
        float: left;
        font-size: 14px;
        margin-right: 10px;
        .sec1-search-box {
          float: left;
          width: 200px;
        }
        .sec1-search-icon {
          float: left;
          width: 38px;
          height: 38px;
          background: #0378ff;
          border-radius: 0px 3px 3px 0px;
          cursor: pointer;
          img {
            display: block;
            width: 24px;
            height: 24px;
            margin-top: 7px;
            margin-left: 7px;
          }
        }
      }
    }
    .list {
      overflow: auto;
      height: calc(100% - 120px);
    }
    .list-breadcrumb {
      overflow: auto;
      height: calc(100% - 150px);
    }
    .pagination {
      margin-top: 30px;
      text-align: center;
      /deep/.el-pager li {
        border: 1px solid rgba(215, 218, 224, 1);
        background: transparent;
        color: rgba(49, 52, 55, 0.8);
      }
      /deep/.el-pager li:not(.disabled).active {
        color: #fff;
        background: #306ff6;
        border: none;
      }
      /deep/.el-input__inner {
        background: transparent;
      }
    }
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  /deep/.el-input__inner {
    border: none;
    background: #f4f7fa;
    border-radius: 3px 0px 0px 3px;
  }
}

.front-blue {
  color: #0378ff;
  padding-right: 5px;
}

.elcard-imgdiv {
  height: 300px;
  margin: 0 auto;
}

.image {
  max-width: 100%;
  height: 300px;
  display: block;
  margin: 0 auto;
}
.box-card {
  width: 300px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
.clearfix span {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap !important;
}
</style>