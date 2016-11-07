var XHR = new function () {
        var self = this;
     	//this.SERVICES_URL = 'http://localhost:8080/Water';
		this.SERVICES_URL = 'http://120.26.132.250';
       // this.SERVICES_URL = 'http://localhost:8080/Water';
        this.URLS = {
            /*admin*/
            login           : '/admin/logincheck',                                                       //通过restful接口访问
            admin           : '/admin/adminManager',                                   
            addAdmin        : '/admin/addAdmin',
            deleteAdmin     : '/admin/deleteAdmin',
            updateAdmin     : '/admin/updateAdmin',
            /*services*/
            addBusiness     : '/business/addBusiness',
            deleteBusiness  : '/business/deleteBusiness',
            updateBusiness  : '/business/updateBusiness',
            findBusinessList: '/business/findListByTid',
            findBusiness    : '/business/findListByAll',
            services        : '/business/findListByTid',
            /*com-info*/
            updateComInfo   : '/company/updateCompanyInfo',
            findComInfo     : '/company/findCompanyInfo',
            /*news*/
            addNew          : '/news/addNew',
            deleteNew       : '/news/deleteNew',
            updateNew       : '/news/updateNew',
            findNewList     : '/news/findListByTid',
            findNew         : '/news/findListByAll',
            newses          : '/news/findListByTid',
            /*tech*/
            addTech         : '/tech/addTech',
            deleteTech      : '/tech/deleteTech',
            updateTech      : '/tech/updateTech',
            findTechList    : '/tech/findListByTid',
            findTech        : '/tech/findListByAll',
            teches          : '/tech/findListByTid',
            /*upload*/
            uploadPic       : '/upload/picture',
            uploadVi        : '/upload/video'

        };
        this.getUrl = function (options) { 
            var func = options.func;                                                              
            return self.SERVICES_URL + this.URLS[func];
        };
        $.each(['get', 'post', 'put', 'delete'], function (key, action) {                                 //通过each方法遍历数组，回调传入的是数组的索引和对应值
            self[action] = function (options) {
                $.extend(options, {                                                            //给jquery这个全局对象扩展的方法，将后面的数据赋给options
                    url  : self.getUrl(options),
                    type : action.toUpperCase()
                });
                if (action === 'post' || action === 'put') {
                    options.contentType =options.contentType || 'application/x-www-form-urlencoded';        //对于post等要模拟表单提交，要设置contentType
                    options.data = JSON.stringify(options.data);                                            
                }
                return $.ajax(options);                                      //ajax调用时需要url和type属性 如果是put或者post需要文件头设置
            }
        });
    };
   
