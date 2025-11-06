let map = L.map('map').setView([35.6895, 139.6917], 10); // 初期は東京

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

function lookupIP() {
  const ip = document.getElementById('ipInput').value;
  fetch(`https://ipinfo.io/${ip}?token=YOUR_TOKEN`)
    .then(res => res.json())
    .then(data => {
      const loc = data.loc.split(',');
      const infoDiv = document.getElementById('info');
      infoDiv.innerHTML = `
        <p><strong>IP:</strong> ${data.ip}</p>
        <p><strong>国:</strong> ${data.country}</p>
        <p><strong>地域:</strong> ${data.region}</p>
        <p><strong>都市:</strong> ${data.city}</p>
        <p><strong>位置:</strong> ${data.loc}</p>
      `;
      map.setView([loc[0], loc[1]], 13);
      L.marker([loc[0], loc[1]]).addTo(map)
        .bindPopup(`IP: ${data.ip}<br>${data.city}`)
        .openPopup();
    })
    .catch(err => {
      alert('情報取得に失敗しました');
      console.error(err);
    });
}
