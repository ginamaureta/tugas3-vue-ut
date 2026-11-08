
Vue.component('app-modal', {
  template: '#tpl-app-modal',
  data: function(){ return {visible:false,title:'Konfirmasi',message:'',resolve:null}; },
  methods: {
    buka: function(title,message){ var self=this; this.title=title;this.message=message;this.visible=true;
      return new Promise(function(resolve){self.resolve=resolve;}); },
    setuju: function(){this.visible=false;if(this.resolve)this.resolve(true);},
    batal: function(){this.visible=false;if(this.resolve)this.resolve(false);}
  }
});
