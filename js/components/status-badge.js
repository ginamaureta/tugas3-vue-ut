
Vue.component('status-badge', {
  template: '#tpl-status-badge',
  props: { status: { type: String, required: true } },
  computed: {
    statusClass: function() {
      return this.status === 'Aman' ? 'safe' : this.status === 'Menipis' ? 'low' :
        this.status === 'Kosong' ? 'empty' : this.status === 'Dalam Perjalanan' ? 'transit' :
        this.status === 'Selesai' ? 'done' : 'pending';
    }
  }
});
