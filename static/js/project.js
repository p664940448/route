var vue = new Vue({
    data: {
        loading: false,
        activeName: 'source',
        form: {
            id: "",
            title: "",
            gitAddress: "",
            tag: "",
            gitUser: "",
            gitPassword: "",            
            buildCmd: "mvn clean package",
            copyfiles: "",
            deployKind: "localhost",
            remoteIp: "",
            sslUser: "root",
            sslPassword:"",
            targetDir: "/opt/tomcat8280/webapps",
            deployAfter_script: ""
        },
        config:[
            { 
                file: "",
                params: [
                {
                    str1: "",
                    str2:""
                    }
                ]
            }

        ],
    },
    el: "#app",
    methods:{
        addFile: function(){
            var _self = this;
            var conf = {
                file: "",
                params: [
                    {
                        str1:"",
                        str2:""
                    }
                ]
            }

            _self.form.config.push(conf)
            console.log(_self.config);
        },
        deleteFile: function(index){
            this.form.config.splice(index,1);
        },
        deleteParam: function(index,subIndex){
            this.form.config[index].params.splice(subIndex,1);
        },
        addParam: function(index){
            var param = {
                str1: "",
                str2: ""
            };

            this.form.config[index].params.push(param);
        },
        goback: function(){
            document.location='index';
        },
        save: function(){
            //保存
            var _self = this;
            _self.form.config = JSON.stringify(_self.config);
            if(op==='add' || op==='copy'){
                postData("saveProject",_self.form,_self,function(response){
                    if(response.state==="0"){
                        document.location='index';
                    }else{
                        _self.$message.error(response.message);
                    }
                })
            }else{
                postData("updateProject",_self.form,_self,function(response){
                    if(response.state==="0"){
                        document.location='index';
                    }else{
                        _self.$message.error(response.message);
                    }
                })
            }
            
        }
    },
    created: function(){
        var _self =this;
        if(op==='edit' || op==='copy'){
            getData("getProject?id="+id,null,_self,function(response){
                _self.form = response;
                _self.config = JSON.parse(response.config);
            })
        }
    }
});