<template>
    <div class="footer">
        <div class="footer-container">
            <div class="footerList">
                <div class="footerItem">
                    <h4>购物指南</h4>
                    <ul class="footerItemCon">
                        <li>购物流程</li>
                        <li>会员介绍</li>
                        <li>生活旅行/团购</li>
                        <li>常见问题</li>
                        <li>购物指南</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>配送方式</h4>
                    <ul class="footerItemCon">
                        <li>上门自提</li>
                        <li>211限时达</li>
                        <li>配送服务查询</li>
                        <li>配送费收取标准</li>
                        <li>海外配送</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>支付方式</h4>
                    <ul class="footerItemCon">
                        <li>货到付款</li>
                        <li>在线支付</li>
                        <li>分期付款</li>
                        <li>邮局汇款</li>
                        <li>公司转账</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>售后服务</h4>
                    <ul class="footerItemCon">
                        <li>售后政策</li>
                        <li>价格保护</li>
                        <li>退款说明</li>
                        <li>返修/退换货</li>
                        <li>取消订单</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>特色服务</h4>
                    <ul class="footerItemCon">
                        <li>夺宝岛</li>
                        <li>DIY装机</li>
                        <li>延保服务</li>
                        <li>尚品汇E卡</li>
                        <li>尚品汇通信</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>帮助中心</h4>
                    <!--          <img src="./images/wx_cz.jpg" />-->
                </div>
            </div>
            <div class="copyright">
                <ul class="helpLink">
                    <li>
                        关于我们
                        <span class="space"></span>
                    </li>
                    <li>
                        联系我们
                        <span class="space"></span>
                    </li>
                    <li>
                        关于我们
                        <span class="space"></span>
                    </li>
                    <li>
                        商家入驻
                        <span class="space"></span>
                    </li>
                    <li>
                        营销中心
                        <span class="space"></span>
                    </li>
                    <li>
                        友情链接
                        <span class="space"></span>
                    </li>
                    <li>
                        关于我们
                        <span class="space"></span>
                    </li>
                    <li>
                        营销中心
                        <span class="space"></span>
                    </li>
                    <li>
                        友情链接
                        <span class="space"></span>
                    </li>
                    <li>关于我们</li>
                </ul>
                <p>地址：北京市昌平区宏福科技园综合楼6层</p>
                <p>京ICP备19006430号</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
    };
</script>

<style scoped lang="less">
  .footer {
    background-color: #eaeaea;

    .footer-container {
      width: 1200px;
      margin: 0 auto;
      padding: 0 15px;

      .footerList {
        padding: 20px;
        border-bottom: 1px solid #e4e1e1;
        border-top: 1px solid #e4e1e1;
        overflow: hidden;
        padding-left: 40px;

        .footerItem {
          width: 16.6666667%;
          float: left;

          h4 {
            font-size: 14px;
          }

          .footerItemCon {
            li {
              line-height: 18px;
              font-size: 5px;
              opacity: 60%;
            }
          }

          &:last-child img {
            width: 121px;
          }
        }
      }
      .copyright {
        padding: 20px;

        .helpLink {
          text-align: center;

          li {
            display: inline;

            .space {
              border-left: 1px solid #666;
              width: 1px;
              height: 13px;
              background: #666;
              margin: 8px 10px;
            }
          }
        }

        p {
          margin: 10px 0;
          text-align: center;
        }
      }
    }
  }
  /* 清除内外边距 */
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote,
  dl, dt, dd, ul, ol, li,
  pre,
  fieldset, lengend, button, input, textarea,
  th, td {
    margin: 0;
    padding: 0;
  }

  /* 设置默认字体 */
  body,
  button, input, select, textarea { /* for ie */
    /*font: 12px/1 Tahoma, Helvetica, Arial, "宋体", sans-serif;*/
    font: 12px/1.3 "Microsoft YaHei",Tahoma, Helvetica, Arial, "\5b8b\4f53", sans-serif; /* 用 ascii 字符表示，使得在任何编码下都无问题 */
    color: #333;
  }


  h1 { font-size: 18px; /* 18px / 12px = 1.5 */ }
  h2 { font-size: 16px; }
  h3 { font-size: 14px; }
  h4, h5, h6 { font-size: 100%; }

  address, cite, dfn, em, var, i{ font-style: normal; } /* 将斜体扶正 */
  b, strong{ font-weight: normal; } /* 将粗体扶细 */
  code, kbd, pre, samp, tt { font-family: "Courier New", Courier, monospace; } /* 统一等宽字体 */
  small { font-size: 12px; } /* 小于 12px 的中文很难阅读，让 small 正常化 */

  /* 重置列表元素 */
  ul, ol { list-style: none; }

  /* 重置文本格式元素 */
  a { text-decoration: none; color: #666;}


  /* 重置表单元素 */
  legend { color: #000; } /* for ie6 */
  fieldset, img { border: none; }
  button, input, select, textarea {
    font-size: 100%; /* 使得表单元素在 ie 下能继承字体大小 */
  }

  /* 重置表格元素 */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* 重置 hr */
  hr {
    border: none;
    height: 1px;
  }
  .clearFix::after{
    content:"";
    display: block;
    clear:both;
  }
  /* 让非ie浏览器默认也显示垂直滚动条，防止因滚动条引起的闪烁 */
  html { overflow-y: scroll; }

  a:link:hover{
    color : rgb(79, 76, 212) !important;
    text-decoration: underline;
  }

  /* 清除浮动 */
  .clearfix::after {
    display: block;
    height: 0;
    content: "";
    clear: both;
    visibility: hidden;
  }
</style>

