
Vue.component('do-tracking', {
  template:'#tpl-do-tracking',
  props:{tracking:Object,paketList:Array},
  data:function(){return {keyword:'',nomorHasil:'',hasil:null,sudahCari:false,keterangan:'',statusBaru:'Dalam Perjalanan'};},
  computed:{perjalananTerbalik:function(){return this.hasil?this.hasil.perjalanan.slice().reverse():[];}},
  methods:{
    cari:function(){var q=this.keyword.trim().toLowerCase();this.sudahCari=true;this.hasil=null;this.nomorHasil='';
      if(!q)return;
      var keys=Object.keys(this.tracking);var no=keys.find(k=>k.toLowerCase()===q);
      if(!no)no=keys.find(k=>String(this.tracking[k].nim).toLowerCase()===q);
      if(!no)no=keys.find(k=>k.toLowerCase().indexOf(q)>=0||String(this.tracking[k].nim).indexOf(q)>=0);
      if(no){this.nomorHasil=no;this.hasil=this.tracking[no];}
    },
    reset:function(){this.keyword='';this.nomorHasil='';this.hasil=null;this.sudahCari=false;this.keterangan='';},
    tanggal:function(v){return SITTAApi.tanggal(v);},tanggalJam:function(v){return SITTAApi.tanggalJam(v);},
    rupiah:function(v){return SITTAApi.rupiah(v);},
    namaEkspedisi:function(k){return k==='EXP'?'JNE Express':'JNE Regular';},
    tambahProgress:function(){
      if(!this.keterangan.trim()||!this.hasil)return;
      this.$emit('add-progress',{
        nomor:this.nomorHasil,
        keterangan:this.keterangan.trim(),
        status:this.statusBaru
      });
      this.keterangan='';
    }
  }
});
