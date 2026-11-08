
window.SITTAApi = {
  async loadTemplates(names) {
    const host = document.getElementById('template-host');
    await Promise.all(names.map(async function(name) {
      const response = await fetch('templates/' + name + '.html');
      if (!response.ok) throw new Error('Template tidak ditemukan: ' + name);
      const html = await response.text();
      const tpl = document.createElement('template');
      tpl.id = 'tpl-' + name;
      tpl.innerHTML = html;
      host.appendChild(tpl);
    }));
  },
  async loadData() {
    const response = await fetch('data/dataBahanAjar.json');
    if (!response.ok) throw new Error('Data bahan ajar tidak dapat dimuat.');
    return response.json();
  },
  rupiah(value) { return 'Rp ' + Number(value || 0).toLocaleString('id-ID'); },
  tanggal(value) {
    if (!value) return '-';
    const p = String(value).split(' ')[0].split('-');
    if (p.length !== 3) return value;
    const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    return Number(p[2]) + ' ' + bulan[Number(p[1])-1] + ' ' + p[0];
  },
  tanggalJam(value) { return value || '-'; },
  safeText(value) {
    return String(value || '').replace(/[&<>"']/g, function(c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  },
  waktuLokal() {
    const d = new Date(), pad = n => String(n).padStart(2,'0');
    return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());
  }
};
