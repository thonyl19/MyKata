﻿let views = {
  Form1() {
    var _vue = {
      template: `
<div class="container-fluid">
	<form class="form-horizontal">
		<div class="form-group">
			<label class="col-sm-2 control-label">Email</label>
			<div class="col-sm-10">
				<p class="form-control-static">email@example.com</p>
			</div>
		</div>
		<div class="form-group">
		<label for="inputPassword" class="col-sm-2 control-label">Password</label>
		<div class="col-sm-10">
			<input type="password" class="form-control" id="inputPassword" placeholder="Password">
		</div>
		</div>
	</form>
</div>
`
    };
    return { _vue };
  },
  Form2() {
    var _vue = {
      template: `
                    <div class="container-fluid">
                        <div class="row">
                            <div class="form-group col-lg-6">
                                <label class="col-sm-3 control-label">Email</label>
                                <div class="col-sm-9">
                                    <p class="form-control-static">email@example.com</p>
                                </div>
                            </div>
                            <div class="form-group col-lg-6">
                                <label for="inputPassword" class="col-sm-3 control-label">Password</label>
                                <div class="col-sm-9">
                                    <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                                </div>
                            </div>
                            <div class="form-group col-lg-6">
                                <label class="col-sm-3 control-label">Email</label>
                                <div class="col-sm-9">
                                    <p class="form-control-static">email@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
    };
    return { _vue };
  },
  panel_1() {
    var _css = `
                .b{
                    border: 1px solid rgba(0, 0, 0, 0.12);
                }
                /* ========================================================================
                Component: slim-scroll.less
                ========================================================================== */
                [data-scrollable] {
                    display: block;
                }

                .slimScrollBar {
                    opacity: 1 !important;
                    background-color: rgba(0, 0, 0, 0.35) !important;
                    border: 0 !important;
                    border-radius: 1px !important;
                }

                .slimScrollRail {
                    opacity: 1 !important;
                    background-color: rgba(0, 0, 0, 0.15) !important;
                    border: 0 !important;
                    border-radius: 0 !important;
                    bottom: 0;
                }
                .sty_img{
                    content:url("../img/head.png");
                }
                `;
    var _vue = {
      template: `
                    <div class="panel b">
         <div class="panel-heading">
            <div class="pull-right label label-danger">5</div>
            <div class="pull-right label label-success">12</div>
            <div class="panel-title">Team messages</div>
         </div>
         <!-- START list group-->
         <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 180px;"><div data-height="180" data-scrollable="" class="list-group" style="overflow: hidden; width: auto; height: 180px;">
            <!-- START list group item-->
            <a href="#" class="list-group-item">
               <div class="media-box">
                  <div class="pull-left">
                     <img  alt="Image" class="media-box-object img-circle thumb32 sty_img">
                  </div>
                  <div class="media-box-body clearfix">
                     <small class="pull-right">2h</small>
                     <strong class="media-box-heading text-primary">
                        <span class="circle circle-success circle-lg text-left"></span>Catherine Ellis</strong>
                     <p class="mb-sm">
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                     </p>
                  </div>
               </div>
            </a>
            <!-- END list group item-->
            <!-- START list group item-->
            <a href="#" class="list-group-item">
               <div class="media-box">
                  <div class="pull-left">
                     <img  alt="Image" class="media-box-object img-circle thumb32 sty_img">
                  </div>
                  <div class="media-box-body clearfix">
                     <small class="pull-right">3h</small>
                     <strong class="media-box-heading text-primary">
                        <span class="circle circle-success circle-lg text-left"></span>Jessica Silva</strong>
                     <p class="mb-sm">
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla facilisi.</small>
                     </p>
                  </div>
               </div>
            </a>
            <!-- END list group item-->
            <!-- START list group item-->
            <a href="#" class="list-group-item">
               <div class="media-box">
                  <div class="pull-left">
                  <img  alt="Image" class="media-box-object img-circle thumb32 sty_img">
                  </div>
                  <div class="media-box-body clearfix">
                     <small class="pull-right">4h</small>
                     <strong class="media-box-heading text-primary">
                        <span class="circle circle-danger circle-lg text-left"></span>Jessie Wells</strong>
                     <p class="mb-sm">
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                     </p>
                  </div>
               </div>
            </a>
            <!-- END list group item-->
            <!-- START list group item-->
            <a href="#" class="list-group-item">
               <div class="media-box">
                  <div class="pull-left">
                  <img  alt="Image" class="media-box-object img-circle thumb32 sty_img">
                  </div>
                  <div class="media-box-body clearfix">
                     <small class="pull-right">1d</small>
                     <strong class="media-box-heading text-primary">
                        <span class="circle circle-danger circle-lg text-left"></span>Rosa Burke</strong>
                     <p class="mb-sm">
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                     </p>
                  </div>
               </div>
            </a>
            <!-- END list group item-->
            <!-- START list group item-->
            <a href="#" class="list-group-item">
               <div class="media-box">
                  <div class="pull-left">
                  <img  alt="Image" class="media-box-object img-circle thumb32 sty_img">
                  </div>
                  <div class="media-box-body clearfix">
                     <small class="pull-right">2d</small>
                     <strong class="media-box-heading text-primary">
                        <span class="circle circle-danger circle-lg text-left"></span>Michelle Lane</strong>
                     <p class="mb-sm">
                        <small>Mauris eleifend, libero nec cursus lacinia...</small>
                     </p>
                  </div>
               </div>
            </a>
            <!-- END list group item-->
         </div><div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 7px; position: absolute; top: 34px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 104.18px;"></div><div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div></div>
         <!-- END list group-->
         <!-- START panel footer-->
         <div class="panel-footer clearfix">
            <div class="input-group">
               <input type="text" placeholder="Type message .." class="form-control input-sm">
               <span class="input-group-btn">
                  <button type="button" class="btn btn-default btn-sm"><i class="fa fa-paperclip"></i>
                  </button>
               </span>
            </div>
         </div>
         <!-- END panel-footer-->
      </div>
`
    };
    return { _vue, _css };
  },
  panel_label() {
    /*
                1.變動 頁籤 色調風格
                2.radio 套用 vue 
                3.class 搭配 vue 動態變更樣式的方法
                */
    var _obj = {
      _css: `
                        .panel-heading-1{
                            margin:0px;
                            padding:3px 10px 0 15px;
                            border       : 1px solid #ccc;
                            border-radius: 3em 1em 0 0 ;
                            border-bottom:0px !important;
                            background:linear-gradient(130deg, transparent 30% , #557777 50%);
                        }
                        .panel-heading-2{
                            margin:0px;
                            padding:3px 10px 0 15px;
                            border       : 1px solid #ccc;
                            border-radius: 3em 1em 0 0 ;
                            border-bottom:0px !important;
                            background:linear-gradient(top,white,#0099FF);
                            background:-moz-linear-gradient(top,white,#0099FF);
                            background:-webkit-linear-gradient(top,white,#0099FF);
                        }
                        `,
      _vue: {
        template: `
                <div>{{sel}}
                    <ul>
                        <li v-for="(idx) in list">
                        <input type=radio v-model.number="sel" :value="idx" />
                        {{idx}}</li>
                    </ul>
                    <label class="panel-heading">Head</label>
                    <div class="panel panel-default" v-bind:class="[sel == 1 ? 'panel-heading-1' : 'panel-heading-2']" >
                        Panel content
                    </div>
                    <div class="panel panel-default" v-bind:class="['panel-heading-'+sel]" >
                        Panel content
                    </div>
                    
                </div>
                `,
        data() {
          return {
            sel: 1,
            list: [1, 2]
          };
        }
      }
    };
    return _obj;
  },
  std1() {
    var _vue = {
      template: `
<div>
</div>
`
    };
    return { _vue };
  },
  std() {
    var _vue = {
      template: `
        <div>
        </div>
        `
    };
    return { _vue };
  }
};
window.sample = { views };
