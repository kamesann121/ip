let map = L.map('map').setView([35.6895, 139.6917], 10); // 初期表示は東京

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

function lookupIP() {
  const ip = document.getElementById('ipInput').value.trim();
  const token = '45b111696e6966'; // ← ここにipinfo.ioのAPIキーを入れてね！

  if (!ip) {
    alert('IPアドレスを入力してください');
    return;
  }

  fetch(`https://ipinfo.io/${ip}?token=${token}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTPエラー: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      const loc = data.loc.split(',');
      const lat = parseFloat(loc[0]);
      const lon = parseFloat(loc[1]);

      document.getElementById('info').innerHTML = `
        <p><strong>IP:</strong> ${data.ip}</p>
        <p><strong>国:</strong> ${data.country}</p>
        <p><strong>地域:</strong> ${data.region}</p>
        <p><strong>都市:</strong> ${data.city}</p>
        <p><strong>位置:</strong> ${data.loc}</p>
      `;

      map.setView([lat, lon], 13);
      L.marker([lat, lon]).addTo(map)
        .bindPopup(`IP: ${data.ip}<br>${data.city}`)
        .openPopup();
    })
    .catch(err => {
      alert('情報取得に失敗しました');
      console.error('エラー内容:', err);
    });
}
