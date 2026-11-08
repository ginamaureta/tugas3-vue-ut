
Vue.component('order-form',{
 template:'#tpl-order-form',
 props:{upbjjList:Array,paketList:Array,pengirimanList:Array,tracking:Object},
 data:function(){return {form:{nim:'',nama:'',ekspedisi:'REG',upbjjTujuan:'',paketKode:'',jumlah:1,tanggalKirim:this.today()},error:'',berhasil:''};},
 computed:{
   nomorBerikutnya:function(){var year=new Date().getFullYear();var seq=Object.keys(this.tracking).filter(k=>k.indexOf('DO'+year+'-')===0).reduce((m,k)=>Math.max(m,Number(k.split('-')[1])||0),0)+1;return 'DO'+year+'-'+String(seq).padStart(4,'0');},
   paketDipilih:function(){return this.paketList.find(p=>p.kode===this.form.paketKode);},
   total:function(){return this.paketDipilih?this.paketDipilih.harga*Number(this.form.jumlah||0):0;},
   hariIni:function(){return this.today();}
 },
 watch:{'form.paketKode':function(){this.error='';},'form.jumlah':function(){this.error='';}},
 methods:{
  today:function(){var d=new Date(),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());},
  rupiah:function(v){return SITTAApi.rupiah(v);},
  judulBahan:function(k){var data=this.$root.stok.find(x=>x.kode===k);return data?data.judul:'Bahan ajar di luar paket';},
  simpanDO:function(){
   this.error='';this.berhasil='';
   if(!/^\d{8,12}$/.test(this.form.nim)){this.error='NIM harus terdiri dari 8–12 digit angka.';return;}
   if(this.form.nama.trim().length<3||!this.form.upbjjTujuan||!this.paketDipilih||!this.form.tanggalKirim||this.form.tanggalKirim<this.today()||Number(this.form.jumlah)<1||Number(this.form.jumlah)>99){this.error='Periksa kembali seluruh isian. Pastikan data valid.';return;}
   var no=this.nomorBerikutnya;var data={nim:this.form.nim.trim(),nama:this.form.nama.trim(),status:'Menunggu Diproses',ekspedisi:this.form.ekspedisi,tanggalKirim:this.form.tanggalKirim,paket:this.form.paketKode,jumlah:Number(this.form.jumlah),total:this.total,upbjjTujuan:this.form.upbjjTujuan,perjalanan:[{waktu:SITTAApi.waktuLokal(),keterangan:'Dokumen '+no+' dibuat di gudang UPBJJ Jakarta'}]};
   this.$emit('create-do',{nomor:no,data:data});this.berhasil=no;this.form={nim:'',nama:'',ekspedisi:'REG',upbjjTujuan:'',paketKode:'',jumlah:1,tanggalKirim:this.today()};
  }
 }
});
