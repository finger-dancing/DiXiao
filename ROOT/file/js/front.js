"use strict";
var index;
var id;
var tid;
var D={};

$(function(){
  if(document.title=="home"){
    let data={};
    data.tid=1;
    
    $.post(XHR.getUrl({func:'newses'}), data, function(res) {      
      tid=res.data[0].tid;      
      D['newses'+tid]=res.data;      
      //renderIndexList(".index-news-list",res.data,8,'href="news.html"');    
      renderAllList(".index-news-list",res.data,8);    
    });
    $.post(XHR.getUrl({func:'teches'}), data, function(res) {
      tid=res.data[0].tid;
      D['teches'+tid]=res.data;
      //renderIndexList(".index-tech-list",res.data,8,'href="product.html"');
      renderAllList(".index-tech-list",res.data,8);
    });
  }
  if(document.title=="newses"||"teches"||"services"){
     let data={};
     data.tid=1;
     $.post(XHR.getUrl({func:document.title}), data, function(res) {
      tid=res.data[0].tid;
      console.log(tid);
      D[document.title+tid]=res.data;
      console.log(D);      
      renderAllList(".newslist",res.data,res.data.length);
    });
  }
  if(document.title=="abouts"){
     
     $.get(XHR.getUrl({func:'findComInfo'}), function(res) {      
      D[document.title]=res.data;
      
      $('.comShorts').html(res.data.introduction);
      $('.comIdea').html(res.data.philosophy);
      $('.comPro').html(res.data.history);
    });
  }
  
});

$(document).on("click",".index-news-list .item-title",function(){
  id=$(this).data('id');
  tid=$(this).data('tid');
  var resData=D["newses"+tid];
  getIndex(resData);
  window.open("news.html");
  renderAllItem(".newslist",resData[index]);
});

$(document).on("click",".index-tech-list .item-title",function(){
  id=$(this).data('id');
  tid=$(this).data('tid');
  var resData=D["teches"+tid];
  getIndex(resData);
  window.open("product.html");
  renderAllItem(".newslist",resData[index]);  
});


$(document).on("click",".tabli",function(){
  $(this).addClass("active").siblings().removeClass('active');
});


/* all set */

$(document).on("click",".tabli",function(){
  tid=$(this).data('tid');
  var data={};
  data.tid=tid;
  if($(this).parent().hasClass("newses")){
    $.post(XHR.getUrl({func:'newses'}), data, function(res) {
      D[document.title+tid]=res.data;      
      
      renderAllList(".newslist",res.data,res.data.length);
    });
  }
  if($(this).parent().hasClass("teches")){
    $.post(XHR.getUrl({func:'teches'}), data, function(res) {
      D[document.title+tid]=res.data;
      renderAllList(".newslist",res.data,res.data.length);
    });
  }
  if($(this).parent().hasClass("services")){
    $.post(XHR.getUrl({func:'services'}), data, function(res) {
      D[document.title+tid]=res.data;
      renderAllList(".newslist",res.data,res.data.length);
    });
  }

});

function renderAllList(tag,res,length){
  
  length=length<res.length?length:res.length;
  var html="",head="";
  for (var i=0;i<length;i++){    
    var time=""
    if(res[i].publishtime){
      time+='<span class="item-time pull-right">'+res[i].publishtime+'</span>';
    }
    head=res[i].title||res[i].name
    html+='<div class="all-item"><i></i><a class="item-title" data-id="'+res[i].id+'" data-tid="'+res[i].tid+'">'+head+'</a>'+time+' </div>';
  } 
  $(tag).html(html);
}

function renderIndexList(tag,res,length,href){
  
  length=length<res.length?length:res.length;
  var html="",head="";
  for (var i=0;i<length;i++){    
    var time=""
    if(res[i].publishtime){
      time+='<span class="item-time pull-right">'+res[i].publishtime+'</span>';
    }
    head=res[i].title||res[i].name
    html+='<div class="all-item"><a class="item-title" '+href+' data-id="'+res[i].id+'" data-tid="'+res[i].tid+'">'+head+'</a>'+time+' </div>';
  } 
  $(tag).html(html);
}

$(document).on('click','.item-title',function(){
  id=$(this).data('id');
  console.log(id);
  tid=$(this).data('tid');
  
  var resData=D[document.title+tid];
   
  getIndex(resData);
  
  renderAllItem(".newslist",resData[index]);
});

function getIndex(data){
  
  for (var i=0;i<data.length;i++){
    if(id==data[i].id){
      index=i;
    }
  }
}

function getPrev(data){
  index=index-1;
  if(index<0){
    return false;
  }   
}

function getNext(data){
  index=index+1;
  if(index==data.length){
    return false;
  }   
}

function renderAllItem(tag,res){
    var content,html="",name="",publishtime="",author="",p="",pic="",vi="";
    
    if(res.title){
      name+='<h4>'+res.title+'</h4>';
    }
    if(res.name){
      name+='<h4>'+res.name+'</h4>';
    }
    if(res.author){
      author+='<h5>'+res.author+'</h5>';
    }
    if(res.publishtime){
      publishtime+='<h5>'+res.publishtime+'</h5>';
    }
    if(res.content){
      p+='<p>'+res.content+'</p>';
    }
    if(res.introduction){
      p+='<p>'+res.introduction+'</p>';
    }
    if(res.picture){
      pic+='<img  class="newsimg" src="'+res.picture+'" alt=" " />';
    }
    if(res.video){
      vi+='<div class="video"><video src="'+res.video+'" controls="controls"></video></div>';
    }
    html+='<div class="newsitem"><div class="project-grid-text1">'+name+author+publishtime+pic+p+vi+'<div><a class="prev col-md-4 pull-left">上一篇</a><a class="list col-md-4">回目录</a><a class="next col-md-4 pull-right">下一篇</a></div></div><div class="clearfix"></div></div>';


    $(tag).html(html);

}

$(document).on('click','.next',function(){
  var resData=D[document.title+tid];
  getNext(resData);
  renderAllItem(".newslist",resData[index]);
});

$(document).on('click','.prev',function(){
  var resData=D[document.title+tid];
  getPrev(resData);
  renderAllItem(".newslist",resData[index]);
});

$(document).on('click','.list',function(){
  var resData=D[document.title+tid];  
  renderAllList(".newslist",resData);
});