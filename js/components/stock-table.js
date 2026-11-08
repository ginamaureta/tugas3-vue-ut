
Vue.component('ba-stock-table', {
  template: '#tpl-stock-table',
  props: {items:Array,upbjjList:Array,kategoriList:Array},
  data: function(){return {filterUpbjj:'',filterKategori:'',filterStok:'',sortBy:'',formTerbuka:false,modeEdit:false,pesanError:'',form:{}};},
  computed: {
    kategoriTersedia: function(){return this.kategoriList.slice();},
    filteredItems: function(){
      var self=this;var arr=this.items.filter(function(x){
        if(self.filterUpbjj&&x.upbjj!==self.filterUpbjj)return false;
        if(self.filterKategori&&x.kategori!==self.filterKategori)return false;
        if(self.filterStok==='aman'&&self.status(x)!=='Aman')return false;
        if(self.filterStok==='menipis'&&self.status(x)!=='Menipis')return false;
        if(self.filterStok==='kosong'&&self.status(x)!=='Kosong')return false;
        return true;
      });
      if(this.sortBy)arr.sort(function(a,b){if(self.sortBy==='judul')return a.judul.localeCompare(b.judul);return Number(a[self.sortBy])-Number(b[self.sortBy]);});
      return arr;
    }
  },
  watch: {
    filterUpbjj:function(){this.filterKategori='';},
    filterStok:function(){/* computed memperbarui daftar tanpa mutasi data sumber */}
  },
  methods:{
    status:function(x){return Number(x.qty)===0?'Kosong':Number(x.qty)<Number(x.safety)?'Menipis':'Aman';},
    jumlahStatus:function(s){return this.items.filter(x=>this.status(x)===s).length;},
    rupiah:function(v){return SITTAApi.rupiah(v);},
    catatanAman:function(v){return SITTAApi.safeText(v).replace(/&lt;(\/?)((?:em|strong|i|u|b))&gt;/gi,'<$1$2>').replace(/&lt;\/((?:em|strong|i|u|b))&gt;/gi,'</$1>');},
    resetFilter:function(){this.filterUpbjj='';this.filterKategori='';this.filterStok='';this.sortBy='';},
    kosongkan:function(){return {kode:'',judul:'',kategori:'',upbjj:'',lokasiRak:'',harga:0,qty:0,safety:0,catatanHTML:''};},
    bukaTambah:function(){this.modeEdit=false;this.form=this.kosongkan();this.pesanError='';this.formTerbuka=true;},
    bukaEdit:function(x){this.modeEdit=true;this.form=Object.assign({},x);this.pesanError='';this.formTerbuka=true;},
    tutupForm:function(){this.formTerbuka=false;},
    simpan:function(){
      var harga=Number(this.form.harga), qty=Number(this.form.qty), safety=Number(this.form.safety);
      if(!this.form.kode||!this.form.judul||!this.form.kategori||!this.form.upbjj||!this.form.lokasiRak||
         !Number.isFinite(harga)||!Number.isFinite(qty)||!Number.isFinite(safety)||
         harga<0||qty<0||safety<0||!Number.isInteger(qty)||!Number.isInteger(safety)){
        this.pesanError='Lengkapi seluruh data dengan nilai yang valid. Harga harus angka dan stok harus bilangan bulat minimal 0.';return;
      }
      this.form.harga=harga;this.form.qty=qty;this.form.safety=safety;
      if(!this.modeEdit&&this.items.some(x=>x.kode.toLowerCase()===this.form.kode.toLowerCase())){this.pesanError='Kode mata kuliah sudah digunakan.';return;}
      this.$emit(this.modeEdit?'update':'create',Object.assign({},this.form));this.tutupForm();
    },
    konfirmasiHapus:async function(x){var ok=await this.$root.$refs.modal.buka('Hapus bahan ajar?','Data '+x.kode+' — '+x.judul+' akan dihapus. Tindakan ini tidak dapat dibatalkan.');if(ok)this.$emit('delete',x.kode);}
  }
});
