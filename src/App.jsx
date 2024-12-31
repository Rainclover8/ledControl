import React from 'react';

function App() {
  const controlLED = async (state) => {
    try {
      const response = await fetch(`http://localhost:5001/led?state=${state}`, {
        method: 'POST',
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Hata:', error);
      alert('Bir hata oluştu.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Arduino LED Kontrol</h1>
      <button
        onClick={() => controlLED('on')}
        style={{ marginRight: '10px', padding: '10px 20px' }}
      >
        LED Aç
      </button>
      <button
        onClick={() => controlLED('off')}
        style={{ padding: '10px 20px' }}
      >
        LED Kapat
      </button>
    </div>
  );
}

export default App;
