!function(){
    var view = document.querySelector('section.message')

    var model = {
        init:function(){
            AV.init({
                appId: "VMwkmfKUPwcCruewFA0uOQr7-gzGzoHsz",
                appKey: "zE4KVKad7xOYXkDAxVTwdlV8",
                serverURLs: "https://vmwkmfku.lc-cn-n1-shared.com"
              });
        },
        fetch: function(){//获取数据
            var query = new AV.Query('Message');
            return query.find() //promise对象
        },
        save: function(name,content){//保存数据
            var Message = AV.Object.extend('Message');
                var message = new Message()
                return message.save({ //promise对象
                    'name' : name,
                    'content': content
                })
        }
    }

    var controller = {
        view: null,
        messageList:null,
        model:null,
        init: function(view,model){
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },

        loadMessages: function(){
            this.model.fetch().then((messages)=>{
                let array = messages.map((item)=> item.attributes)
                array.forEach((item)=>{
                let li = document.createElement('li')
                li.innerText = `${item.name}:${item.content}`
                let messageList = document.querySelector('#messageList')
                this.messageList.appendChild(li)
        })
    })
        },
        bindEvents:function(){   
           this.form.addEventListener('submit',(e)=>{
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage:function (){
            let myForm = this.form

            if(myForm.querySelector('input[name=content]').value!==''&&myForm.querySelector('input[name=name]').value!==''){
                let content=myForm.querySelector('input[name=content]').value
                let name=myForm.querySelector('input[name=name]').value    
                var Message = AV.Object.extend('Message');
                var message = new Message()
                this.model.save(name,content).then(function(object){
                    let li = document.createElement('li')
                    li.innerText = `${object.attributes.name}:${object.attributes.content}`
                    let messageList = document.querySelector('#messageList')
                    messageList.appendChild(li)
                })
            }
            else {
                alert('用户名或者留言不能为空！')
            }

        }
    }
   
    //   var TestObject = AV.Object.extend('TestObject');
    //   var testObject = new TestObject();
    //   testObject.set('words', 'Hello world!');
    //   testObject.save().then(function (testObject) {
    //     console.log('保存成功。')
    //   })
    
    controller.init(view,model)
       
}.call()