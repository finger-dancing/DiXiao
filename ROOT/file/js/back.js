var login=false;
var accoutdata;
var cominfo;
var newsdata;
var serdata;
var techdata;
var itemid;
/*登录*/
$('.nav-login').click(function(){	
	$('#loginModal').modal('show');	
});

$('.login-save').click(function(){	
	var logindata={};	
	logindata.username=$('.loginusername').val();
	logindata.password=$('.loginpassword').val();	
     
	$.post(XHR.getUrl({func: 'login'}), logindata, function(res) {
		$('#loginModal').modal('hide');	
		
		if(res.code){
		  	$('.nav-logout').css('display','block');
		    $('.nav-login').css('display','none');
		    login=true;
		} 
	});       
});

$('.nav-logout').click(function(){	
	$('.nav-logout').css('display','none');
	$('.nav-login').css('display','block');
	login=false;
});


/*账户管理*/


function renderTable(data,total){
	var html='';   
	for(var i=0;i<total;i++){
	console.log(data[i]);
        
		html+='<tr><td>'+data[i].username+'</td><td>'+data[i].name+'</td><td>'+data[i].email+'</td><td data-id="'+data[i].id+'" class="text-center"><a class="edititem editaccoutitem">更改</a><a class="delitem delaccoutitem">删除</a></td></tr>';
	}
	console.log(html);
	$('.accout-do tbody').html(html);
		
}

$('.accout-do').click(function(){
	if(!login){
		return false;
	}
	$('.accout-do').css('display','block').siblings().css('display','none');
	$.get(XHR.getUrl({func: 'admin'}), function(res) {
	    accoutdata=res.data;
	    var length=accoutdata.length;	
	    renderTable(accoutdata,length);
	}); 
});

$(document).on("click",".delaccoutitem", function() {
    if(!login){
		return false;
	}
	var id = $(this).parent().data('id');
	var data={};
	data.id=id;	

	$.post(XHR.getUrl({func:'deleteAdmin'}), data, function(res) {
		if (res.code){
	  		$.get(XHR.getUrl({func: 'admin'}), function(res) {
	  			console.log(res);
			    accoutdata=res.data;
			    var length=accoutdata.length;	
			    renderTable(accoutdata,length);
			});
	    }
	});
});


$('.addaccoutitem').click(function(){
	if(!login){
		return false;
	}	
	$('.username').val('');
	$('.password').val('');
	$('.nickname').val('');
	$('.email').val('');
	$('.accout-save').data('id','');
	$('#accoutModal').modal('show');		
});

$(document).on("click",".editaccoutitem", function() {
	if(!login){
		return false;
	}
	var id=$(this).parent().data('id')
    for (var i=0;i<accoutdata.length;i++){
    	if(id==accoutdata[i].id){
    		$('.username').val(accoutdata[i].username);
			$('.password').val(accoutdata[i].password);
			$('.nickname').val(accoutdata[i].name);
			$('.email').val(accoutdata[i].email);
    	}
    }
	$('#accoutModal').modal('show');	
	$('.accout-save').data('id',id);	//data()赋值方法
});


$('.accout-save').click(function(){
	var data={};
	data.id=$(this).data('id');
	data.username=$('.username').val();
	data.password=$('.password').val();
	data.name=$('.nickname').val();
	data.email=$('.email').val();
	console.log(data);
	
	if($(this).data('id')){
		$.post(XHR.getUrl({func: 'updateAdmin'}), data, function(res) {	
		    $(this).data('id','');		
			$.get(XHR.getUrl({func: 'admin'}), function(res) {
			    accoutdata=res.data;
			    var length=accoutdata.length;	
			    renderTable(accoutdata,length);
			});
		}); 
		
	}else{
		$.post(XHR.getUrl({func:'addAdmin'}), data, function(res) {		    
		    $.get(XHR.getUrl({func:'admin'}), function(res) {
			    accoutdata=res.data;
			    var length=accoutdata.length;	
			    renderTable(accoutdata,length);
			});
		}); 
		
	}
	$('#accoutModal').modal('hide');
	
});

/*公司信息*/

function renderComInfo(cominfo){
	
	$('.com-info-set').html('<h4>公司名称</h4><div class="com-name com-name-set">'+cominfo.name+'</div><h4>公司创办人</h4><div class="com-founder com-founder-set">'+cominfo.founder+'</div><h4>创办时期</h4><div class="com-founddate com-founddate-set">'+cominfo.founddate+'</div><h4>公司简介</h4><div class=" com-introducttion com-introducttion-set">'+cominfo.introduction+'</div><h4>公司理念</h4><div class="com-philosophy com-philosophy-set">'+cominfo.philosophy+'</div><h4>发展历程</h4><div class="com-history com-history-set">'+cominfo.history+'</div>');
}

$('.com-do').click(function(){

	if(!login){
		return false;
	}
	$('.com-do').css('display','block').siblings().css('display','none');
	$.get(XHR.getUrl({func: 'findComInfo'}), function(res) {
		console.log(res);
		if(res.code){
			cominfo=res.data;
			console.log(cominfo);
			console.log(cominfo.founddate);
			cominfo.founddate=cominfo.founddate.toString();
			console.log(cominfo.founddate);
			renderComInfo(cominfo);

		}		
	}); 
	    
});

$(document).on("click",".editcomitem", function() {
	if(!login){
		return false;
	}
	var id=cominfo.id;
	$('.cname').val(cominfo.name);
	$('.cfounder').val(cominfo.founder);
	$('.cfounddate').val(cominfo.founddate);
	$('.cintroduction').val(cominfo.introduction);
	$('.cphilosophy').val(cominfo.philosophy);
	$('.chistory').val(cominfo.history);  


	$('#comModal').modal('show');	
	
});


$('.com-save').click(function(){
	var data={};
	data.name=$('.cname').val();
	data.founder=$('.cfounder').val();
	data.founddate=$('.cfounddate').val();
	data.introduction=$('.cintroduction').val();
	data.philosophy=$('.cphilosophy').val();
	data.history=$('.chistory').val();
	
	
	console.log(data);
	    
	$.post(XHR.getUrl({func:'updateComInfo'}), data, function(res) {
		    console.log(res);
		    $.get(XHR.getUrl({func:'findComInfo'}), function(res) {
				if(res.code){
					cominfo=res.data;
					renderComInfo(cominfo);
				}		
			}); 
		}); 
    $('#comModal').modal('hide');
	 
});

/*新闻*/
function renderNewsAll(data,total){
	var html='';    
	for(var i=0;i<total;i++){
		html+='<div class="project-grid-text1"><h4>'+data[i].title+'</h4><a data-id="'+data[i].id+'" class="more news-more">Read More</a></div>';
	}
	$('.list-news .product-grid').html(html);		
}

$('.news-do').click(function(){
	if(!login){
		return false;
	}
	$('.content-table .news-do').css('display','block').siblings().css('display','none');
    $('.list-news-item').css('display','none').siblings().css('display','block');
	$.get(XHR.getUrl({func: 'findNew'}), function(res) {
	    newsdata=res.data;
	    var length=newsdata.length;	
	    renderNewsAll(newsdata,length);
	}); 
});

$(document).on("click",".news-more", function() {
	itemid = $(this).data('id');
    $('.list-news-item').css('display','block').siblings().css('display','none');
	var html='';
	for(var i=0;i<newsdata.length;i++){
		if(itemid==newsdata[i].id){
			html+='<h4>'+newsdata[i].title+'</h4><div class="middle"><h4>'+newsdata[i].tid+'</h4><h5>'+newsdata[i].author+'</h5><h5>'+newsdata[i].publishtime+'</h5></div><img class="newsimg"src="'+XHR.SERVICES_URL+newsdata[i].picture+'" alt=" "/><p>'+newsdata[i].content+'</p><div class="video"><video src="'+XHR.SERVICES_URL+newsdata[i].video+'" controls="controls"></video></div><div class="item-set"><a class="edititem editnewsitem">更新</a><a class="list menuitem menunewsitm">回目录</a><a class="delitem delnewsitem">删除</a></div>';	
		}
	}
	$('.list-news-item .project-grid-text1').html(html);	
});

$(document).on("click",".delnewsitem", function() {
    if(!login){
		return false;
	}	
	var data={};
	data.id=itemid;	

	$.post(XHR.getUrl({func:'deleteNew'}), data, function(res) {
		console.log(data);
		if (res.code){ 
			console.log(res);
	  		$('.list-news-item').css('display','none').siblings().css('display','block');
			$.get(XHR.getUrl({func: 'findNew'}), function(res) {
			    newsdata=res.data;
			    var length=newsdata.length;	
			    renderNewsAll(newsdata,length);
			}); 
	    }
	});
});

$(document).on("click",".menunewsitem", function() {
  	$('.list-news-item').css('display','none').siblings().css('display','block');
    $.get(XHR.getUrl({func: 'findNew'}), function(res) {
			    newsdata=res.data;
			    var length=newsdata.length;	
			    renderNewsAll(newsdata,length);
			});   	
});

$('.addnewsitem').click(function(){
	if(!login){
		return false;
	}	
	$('.ntitle').val('');
	$('.ntid').val('');
	$('.nauthor').val('');
	$('.npulishtime').val('');
	$('.ncontent').val('');
	$('.npicture').html('');
	$('.nvideo').html('');
	$('.newses .status').html('');
	$('.newses .preview').html('');
	$('.news-save').data('id','');
	$('#newsModal').modal('show');	
	console.log(itemid);	
});

$(document).on("click",".editnewsitem", function() {
	if(!login){
		return false;
	}
	
    for (var i=0;i<newsdata.length;i++){
    	if(itemid==newsdata[i].id){
    		$('.ntitle').val(newsdata[i].title);
			$('.ntid').val(newsdata[i].tid);
			$('.nauthor').val(newsdata[i].author);
			$('.npulishtime').val(newsdata[i].publishtime);
			$('.ncontent').val(newsdata[i].content);
			$('.npicture').html(newsdata[i].picture);
			$('.nvideo').html(newsdata[i].video);
			
			$('.newses .status').html('');
            if(newsdata[i].video){
					$('.newses .preview').html('<video src="'+newsdata[i].video+'" controls="controls"></video>');
				}
			if(newsdata[i].picture){
					$('.newses .preview').html('<img src="'+newsdata[i].picture+'" />');
				}

    	}
    }
	$('#newsModal').modal('show');	
	$('.news-save').data('id',itemid);	//data()赋值方法
	console.log(itemid);
});


$('.news-save').click(function(){
	var data={};	
	data.title=$('.ntitle').val();
	data.tid=$('.ntid').val();
	data.publishtime=$('.npublishtime').val();
	data.author=$('.nauthor').val();
	data.content=$('.ncontent').val();
	data.picture=$('.npicture').html();
	data.video=$('.nvideo').html();
	console.log(data);
	
	if($(this).data('id')){
		data.id=$(this).data('id');
		
		console.log(data);
		$.post(XHR.getUrl({func:'updateNew'}), data, function(res) {
		    $(this).data('id','');	
		    console.log(res);		
			/*$.get(XHR.getUrl({func: 'findNew'}), function(res) {
				
			    newsdata=res.data;
			    var length=newsdata.length;	
			    renderNewsAll(newsdata,length);
			}); */
		}); 
		
	}else{
		
		
		console.log(data);
		$.post(XHR.getUrl({func:'addNew'}), data, function(res) {		    
		    $.get(XHR.getUrl({func: 'findNew'}), function(res) {
		    	console.log(res);
			    newsdata=res.data;
			    var length=newsdata.length;	
			    renderNewsAll(newsdata,length);
			}); 
		}); 
		
	}
	$('#newsModal').modal('hide');
	
}); 

/*业务*/
function renderSerAll(data,total){
	var html='';    
	for(var i=0;i<total;i++){
		html+='<div class="project-grid-text1"><h4>'+data[i].name+'</h4><a data-id="'+data[i].id+'" class="more ser-more">Read More</a></div>';
	}
	$('.list-ser .product-grid').html(html);		
}

$('.ser-do').click(function(){
	if(!login){
		return false;
	}
	$('.content-table .ser-do').css('display','block').siblings().css('display','none');
    $('.list-ser-item').css('display','none').siblings().css('display','block');
	$.get(XHR.getUrl({func: 'findBusiness'}), function(res) {
	    serdata=res.data;
	    var length=serdata.length;	
	    renderSerAll(serdata,length);
	}); 
});

$(document).on("click", ".ser-more", function() {
	itemid = $(this).data('id');
    $('.list-ser-item').css('display','block').siblings().css('display','none');
	var html='';
	for(var i=0;i<serdata.length;i++){
		if(itemid==serdata[i].id){
			html+='<h4>'+serdata[i].name+'</h4><div class="middle"><h4>'+serdata[i].tid+'</h4></div><img class="newsimg" src="'+XHR.SERVICES_URL+serdata[i].picture+'" alt=" "/><p>'+serdata[i].introduction+'</p><div class="video"><video src="'+XHR.SERVICES_URL+serdata[i].video+'" controls="controls"></video></div><div class="item-set"><a class="edititem editseritem">更新</a><a class="list menuitem menuseritm">回目录</a><a class="delitem delseritem">删除</a></div>';	
		}
	}
	$('.list-ser-item .project-grid-text1').html(html);	
});

$(document).on("click",".delseritem", function() {
    if(!login){
		return false;
	}	
	var data={};
	data.id=itemid;	

	$.post(XHR.getUrl({func:'deleteBusiness'}), data, function(res) {
		console.log(data);
		if (res.code){ 
			console.log(res);
	  		$('.list-ser-item').css('display','none').siblings().css('display','block');
			$.get(XHR.getUrl({func: 'findBusiness'}), function(res) {
			    serdata=res.data;
			    var length=serdata.length;	
			    renderSerAll(serdata,length);
			}); 
	    }
	});
});

$(document).on("click",".menuseritem", function() {
  	$('.list-ser-item').css('display','none').siblings().css('display','block');
    $.get(XHR.getUrl({func:'findBusiness'}), function(res) {
			    serdata=res.data;
			    var length=serdata.length;	
			    renderSerAll(serdata,length);
			});   	
});

$('.addseritem').click(function(){
	if(!login){
		return false;
	}	
	$('.sname').val('');
	$('.stid').val('');
	$('.sintroduction').val('');
	$('.spicture').html('');
	$('.svideo').html('');
	$('#serModal .status').html('');
	$('#serModal .preview').html('');
	$('.ser-save').data('id','');
	$('#serModal').modal('show');	
	console.log(itemid);	
});

$(document).on("click",".editseritem", function() {
	if(!login){
		return false;
	}
	
    for (var i=0;i<serdata.length;i++){
    	if(itemid==serdata[i].id){
    		$('.sname').val(serdata[i].name);
			$('.stid').val(serdata[i].tid);
			$('.sintroduction').val(serdata[i].introduction);
			$('.spicture').html(serdata[i].picture);
			$('.svideo').html(serdata[i].video);

			$('#serModal .status').html('');
			if(serdata[i].video){
					$('#serModal .preview').html('<video src="'+serdata[i].video+'" controls="controls"></video>');
				}
			if(serdata[i].picture){
					$('#serModal .preview').html('<img src="'+serdata[i].picture+'" />');
				}
    	}
    }
	$('#serModal').modal('show');	
	$('.ser-save').data('id',itemid);	//data()赋值方法
	console.log(itemid);
});


$('.ser-save').click(function(){
	var data={};	
	data.name=$('.sname').val();
	data.tid=$('.stid').val();
	data.introduction=$('.sintroduction').val();
	data.picture=$('.spicture').html();
	data.video=$('.svideo').html();
	
	if($(this).data('id')){
		data.id=$(this).data('id');
		
		console.log(data);
		$.post(XHR.getUrl({func:'updateBusiness'}), data, function(res) {
		     $(this).data('id','');	
		     console.log(res);

		    //刷新当前项  获取最新列表
		    /*itemid = $(this).data('id');				

		    
		    $.get(XHR.getUrl({func: 'findBusiness'}), function(res) {
			    serdata=res.data;
			    var html='';
				for(var i=0;i<serdata.length;i++){
					if(itemid==serdata[i].id){
						html+='<h4>'+serdata[i].name+'</h4><div class="middle"><h4>'+serdata[i].tid+'</h4></div><img class="newsimg" src="'+XHR.SERVICES_URL+serdata[i].picture+'" alt=" "/><p>'+serdata[i].introduction+'</p><div class="video"><video src="'+XHR.SERVICES_URL+serdata[i].video+'" controls="controls"></video></div><div class="item-set"><a class="edititem editseritem">更新</a><a class="list menuitem menuseritm">回目录</a><a class="delitem delseritem">删除</a></div>';	
					}
				}
				$('.list-ser-item .project-grid-text1').html(html);	
		        $('.list-ser-item').css('display','block').siblings().css('display','none');
			});
			*/
		}); 
		
	}else{		
		
		console.log(data);
		$.post(XHR.getUrl({func:'addBusiness'}), data, function(res) {	
		    console.log(res);
	    
		    $.get(XHR.getUrl({func: 'findBusiness'}), function(res) {
		    	console.log(res);
			    serdata=res.data;
			    var length=serdata.length;	
			    renderSerAll(serdata,length);
			}); 
		}); 
		
	}
	$('#serModal').modal('hide');
	
}); 

/*技术*/
function renderTechAll(data,total){
	var html='';    
	for(var i=0;i<total;i++){
		html+='<div class="project-grid-text1"><h4>'+data[i].name+'</h4><a data-id="'+data[i].id+'" class="more tech-more">Read More</a></div>';
	}
	$('.list-tech .product-grid').html(html);		
}

$('.tech-do').click(function(){
	if(!login){
		return false;
	}
	$('.content-table .tech-do').css('display','block').siblings().css('display','none');
    $('.list-tech-item').css('display','none').siblings().css('display','block');
	$.get(XHR.getUrl({func:'findTech'}), function(res) {
		console.log(res);
	    techdata=res.data;
	    var length=techdata.length;	
	    renderTechAll(techdata,length);
	}); 
});

$(document).on("click", ".tech-more", function() {
	itemid = $(this).data('id');
    $('.list-tech-item').css('display','block').siblings().css('display','none');
	var html='';
	for(var i=0;i<techdata.length;i++){
		if(itemid==techdata[i].id){
			html+='<h4>'+techdata[i].name+'</h4><div class="middle"><h4>'+techdata[i].tid+'</h4></div><img class="newsimg" src="'+XHR.SERVICES_URL+techdata[i].picture+'" alt=" "/><p>'+techdata[i].introduction+'</p><div class="video"><video src="'+XHR.SERVICES_URL+techdata[i].video+'" controls="controls"></video></div><div class="item-set"><a class="edititem edittechitem">更新</a><a class="list menuitem menutechitm">回目录</a><a class="delitem deltechitem">删除</a></div>';	
		}
	}
	$('.list-tech-item .project-grid-text1').html(html);	
});

$(document).on("click",".deltechitem", function() {
    if(!login){
		return false;
	}	
	var data={};
	data.id=itemid;	

	$.post(XHR.getUrl({func:'deleteTech'}), data, function(res) {
		console.log(data);
		if (res.code){ 
			console.log(res);
	  		$('.list-tech-item').css('display','none').siblings().css('display','block');
			$.get(XHR.getUrl({func: 'findTech'}), function(res) {
			    techdata=res.data;
			    var length=techdata.length;	
			    renderTechAll(techdata,length);
			}); 
	    }
	});
});

$(document).on("click",".menutechitem", function() {
  	$('.list-tech-item').css('display','none').siblings().css('display','block');
    $.get(XHR.getUrl({func: 'findTech'}), function(res) {
			    techdata=res.data;
			    var length=techdata.length;	
			    renderTechAll(techdata,length);
			});   	
});

$('.addtechitem').click(function(){
	if(!login){
		return false;
	}	
	$('.tname').val('');
	$('.ttid').val('');
	$('.tintroduction').val('');
	$('.tpicture').html('');
	$('.tvideo').html('');
	$('.teches .status').html('');
	$('.teches .preview').html('');
	$('.tech-save').data('id','');
	$('#techModal').modal('show');	
	console.log(itemid);	
});

$(document).on("click",".edittechitem", function() {
	if(!login){
		return false;
	}
	
    for (var i=0;i<techdata.length;i++){
    	if(itemid==techdata[i].id){
    		$('.tname').val(techdata[i].name);
			$('.ttid').val(techdata[i].tid);
			$('.tintroduction').val(techdata[i].introduction);
			$('.tpicture').html(techdata[i].picture);
			$('.tvideo').html(techdata[i].video);

			$('.teches .status').html('');
			if(techdata[i].video){
					$('.teches .preview').html('<video src="'+techdata[i].video+'" controls="controls"></video>');
				}
			if(techdata[i].picture){
					$('.teches .preview').html('<img src="'+techdata[i].picture+'" />');
				}



    	}
    }
	$('#techModal').modal('show');	
	$('.tech-save').data('id',itemid);	//data()赋值方法
	console.log(itemid);
});


$('.tech-save').click(function(){
	var data={};	
	data.name=$('.tname').val();
	data.tid=$('.ttid').val();
	data.introduction=$('.tintroduction').val();
	data.picture=$('.tpicture').html();
	data.video=$('.tvideo').html();
	
	if($(this).data('id')){
		data.id=$(this).data('id');		
		console.log(data);
		$.post(XHR.getUrl({func:'updateTech'}), data, function(res) {
		    	
		    console.log(res);		
			/*$.get(XHR.getUrl({func: 'findTech'}), function(res) {
				
			    techdata=res.data;
			    var length=techdata.length;	
			    renderTechAll(techdata,length);
			});*/
		}); 
		
	}else{		
		
		console.log(data);
		$.post(XHR.getUrl({func:'addTech'}), data, function(res) {	
		     console.log(res);	    
		    $.get(XHR.getUrl({func: 'findTech'}), function(res) {
		    	
			    techdata=res.data;
			    var length=techdata.length;	
			    renderTechAll(techdata,length);
			}); 
		}); 
		
	}
	$('#techModal').modal('hide');
	
});

/*文件上传*/

 $(document).on("click",'.fileSubmit',function(){
 	var parent=$(this).parent();
 	var ptag=parent.attr("class");
 	var data = new FormData(parent); 
 	var status=$(this).siblings('.status');
 	var preview=$(this).siblings('.preview');
 	status.html('正在上传...');
	$.ajax({ 
		url: XHR.getUrl({func:'update'+ptag}), 
		type: 'POST', 
		data: data, 
		dataType: 'JSON', 
		cache: false, 
		processData: false, 
		contentType: false,
		done: function(res){
			if(res.code){
				status.html('上传成功');
				$(this).siblings('.hide').html(res.src);
				if(ptag=="Vi"){
					preview.html('<video src="'+res.src+'" controls="controls"></video>');
				}else{
					preview.html('<img src="'+res.src+'" />');
				}
                
			}else{
				status.html('上传失败');
			}
		}
	}); 

 });

