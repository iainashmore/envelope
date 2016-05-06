

define(function(envelope){
    
        var Envelope = function Envelope(templateName) {
         
            this.templateName = templateName;
            this.records = {};
            this.children = [];
            this.content = $('<content></content>');
            this.template = $('<type_'+ templateName +'></type_' + templateName+'>');
            
            console.log("loading template = " + this.templateName);
            
            var me = this;
            
            $('<div>').load(this.templateName + ".html", function(data) {
                me.template.append(this);
                me.template.find('.content').append(me.content);
            });
            
            this.raise = function (eventName){
                me.template.trigger(eventName);
            }
            
            this.listen = function(eventName,callback){
                this.template.on(eventName,function() {
                    callback();
                });
            }

            this.addChild = function(child){
                this.children.push(child);
                this.content.append(child.envelope.template);
            }
            
            this.setAttribute = function(attributeName,attributeValue){
                console.log('set attribute ' + attributeName + " = " + attributeValue);
                this.template.find('.'+ attributeName).text(attributeValue);
            }
            
            this.getAttribute = function(attributeName,attributeValue){
                console.log('get attribute ' + attributeName);
                return this.template.find('.'+ attributeName).text();
            }
            
            this.setStyle = function(attributeName,attributeValue){
                this.content.parent().parent().css(attributeName,attributeValue); 
            }
            
          
        }
        
        return Envelope;
});