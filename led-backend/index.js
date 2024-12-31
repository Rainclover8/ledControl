const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors()); // CORS için izin veriyoruz

let arduinoPort;

// Arduino'nun bağlı olduğu seri port
try {
  arduinoPort = new SerialPort({
    path: '/dev/tty.usbserial-1120', // Arduino'nuzun bağlı olduğu portu kontrol edin
    baudRate: 9600,
  });

  const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

  arduinoPort.on('open', () => {
    console.log('Arduino bağlantısı kuruldu.');
  });

  arduinoPort.on('error', (err) => {
    console.error('Seri port hatası:', err);
  });
} catch (err) {
  console.error('Arduino bağlantısı kurulamadı:', err);
}

// LED kontrol endpointi
app.post('/led', (req, res) => {
  const { state } = req.query;

  if (!arduinoPort) {
    return res.status(500).json({ error: 'Arduino bağlantısı hatalı' });
  }

  if (state === 'on') {
    arduinoPort.write('1');
    res.json({ message: 'LED Açıldı' });
  } else if (state === 'off') {
    arduinoPort.write('0');
    res.json({ message: 'LED Kapatıldı' });
  } else {
    res.status(400).json({ error: 'Geçersiz komut' });
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Backend ${port} portunda çalışıyor.`);
});
