
(function(){
  var templateNames=['status-badge','app-modal','stock-table','do-tracking','order-form'];
  Promise.all([SITTAApi.loadTemplates(templateNames),SITTAApi.loadData()]).then(function(results){
    var dataset=results[1];
    var tracking={};
    (dataset.tracking||[]).forEach(function(row){Object.keys(row).forEach(function(no){tracking[no]=Object.assign({},row[no],{perjalanan:(row[no].perjalanan||[]).slice()});});});
    // Data contoh tambahan agar variasi status pengiriman dapat dicoba.
    if(!tracking['DO2025-0002'])tracking['DO2025-0002']={nim:'098765432',nama:'Budi Santoso',status:'Selesai',ekspedisi:'REG',tanggalKirim:'2025-08-20',paket:'PAKET-UT-002',jumlah:1,total:140000,perjalanan:[{waktu:'2025-08-20 09:05:11',keterangan:'Penerimaan di Loket: SALEMBA'},{waktu:'2025-08-21 08:40:02',keterangan:'Dalam perjalanan ke UPBJJ Makassar'},{waktu:'2025-08-22 14:12:45',keterangan:'Diterima oleh mahasiswa (Budi Santoso)'}]};
    if(!tracking['DO2025-0003'])tracking['DO2025-0003']={nim:'112233445',nama:'Andi Pratama',status:'Menunggu Diproses',ekspedisi:'EXP',tanggalKirim:'2025-08-27',paket:'PAKET-UT-001',jumlah:2,total:240000,upbjjTujuan:'Denpasar',perjalanan:[{waktu:'2025-08-27 08:15:00',keterangan:'Dokumen DO dibuat di gudang UPBJJ Jakarta'}]};
    var vm=new Vue({
      el:'#app',
      data:{
        tab:'stok',
        tabs:[{id:'stok',label:'Stok Bahan Ajar'},{id:'tracking',label:'Tracking DO'},{id:'order',label:'Pemesanan'}],
        stok:(dataset.stok||[]).map(function(x){return Object.assign({},x);}),
        upbjjList:dataset.upbjjList||[],
        kategoriList:dataset.kategoriList||[],
        paketList:dataset.paket||[],
        pengirimanList:dataset.pengirimanList||[],
        tracking:tracking
      },
      watch:{
        tab:function(next){document.title='SITTA — '+(next==='stok'?'Stok Bahan Ajar':next==='tracking'?'Tracking DO':'Pemesanan');},
        stok:{deep:true,handler:function(){/* watcher kedua: perubahan stok terpantau dan UI diperbarui */}}
      },
      methods:{
        tambahStok:function(item){this.stok.unshift(Object.assign({},item));},
        ubahStok:function(item){var i=this.stok.findIndex(function(x){return x.kode===item.kode;});if(i>=0)this.$set(this.stok,i,Object.assign({},item));},
        hapusStok:function(kode){this.stok=this.stok.filter(function(x){return x.kode!==kode;});},
        buatDO:function(payload){this.$set(this.tracking,payload.nomor,payload.data);},
        tambahProgress:function(payload){
        var d=this.tracking[payload.nomor];if(!d)return;
        if(!Array.isArray(d.perjalanan))this.$set(d,'perjalanan',[]);
        d.perjalanan.push({waktu:SITTAApi.waktuLokal(),keterangan:String(payload.keterangan||'').trim()});
        this.$set(d,'status',payload.status||'Dalam Perjalanan');
      }
      }
    });
    window.sittaApp=vm;
  }).catch(function(error){
    console.error(error);
    document.getElementById('app').innerHTML='<div class="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-xl border"><h1 class="font-bold text-lg text-rose-700">Aplikasi gagal dimuat</h1><p class="text-sm mt-2">Pastikan proyek dijalankan melalui Live Server atau web server lokal agar file JSON dan template dapat diakses.</p><p class="text-xs text-slate-500 mt-3">'+error.message+'</p></div>';
  });
})();
