import { SHEET_ID, SHEET_NAME } from '../constants';
import { GoogleSheetRow, WolfData } from '../types';

export const fetchSheetData = async (prevData: WolfData[]): Promise<WolfData[]> => {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    
    // Sử dụng Regex để tìm nội dung bên trong hàm setResponse(...)
    const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
    
    if (!match || !match[1]) {
      console.error('Không tìm thấy dữ liệu hợp lệ trong phản hồi từ Google Sheets');
      return prevData;
    }

    const json = JSON.parse(match[1]);

    if (json.status === 'error') {
      console.error('Google Sheet API Error:', json.errors);
      return prevData;
    }

    const rows: GoogleSheetRow[] = json.table.rows;

    const parsedData: WolfData[] = rows.map((row, index) => {
      let rawName = String(row.c[0]?.v || `KHỐI ${index + 1}`);
      const revenue = Number(row.c[1]?.v || 0);
      let rawPercent = Number(row.c[2]?.v || 0);
      
      // Chuẩn hóa %: Nếu là 0.85 -> 85%, nếu là 85 -> 85%
      const percent = rawPercent <= 2 ? rawPercent * 100 : rawPercent; 
      const prev = prevData.find(p => p.id === index + 1);

      // Chuẩn hóa tên: KHỐI KD...
      let name = rawName.toUpperCase()
        .replace('KINH DOANH', 'KD')
        .replace('KHỐI KD KD', 'KHỐI KD')
        .trim();
      
      if (!name.includes('KHỐI KD')) {
          if (name.startsWith('KD')) {
            name = name.replace('KD', 'KHỐI KD');
          } else if (name.startsWith('KHỐI')) {
            name = name.replace('KHỐI', 'KHỐI KD');
          } else {
            name = `KHỐI KD ${name}`;
          }
      }

      return {
        id: index + 1,
        name: name,
        revenue,
        percent: parseFloat(percent.toFixed(2)),
        rank: 0,
        prevPercent: prev?.percent || 0
      };
    }).filter(item => item.name).slice(0, 3);

    const ranked = [...parsedData].sort((a, b) => b.percent - a.percent);
    return parsedData.map(item => ({
      ...item,
      rank: ranked.findIndex(r => r.id === item.id) + 1
    }));
  } catch (error) {
    console.error('Lỗi kết nối dữ liệu Google Sheet:', error);
    return prevData;
  }
};