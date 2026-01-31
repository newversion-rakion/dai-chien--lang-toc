export const SHEET_ID = '1LlO6KI_SfHcN4k0Vfmh7bQxxH4F0w0hW';
export const SHEET_NAME = 'Doanh số';

// Direct Google Drive download links format
const getDriveUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

export const BG_IMAGE = getDriveUrl('1XIBTGn_DDelmemwbA_9aiBy63Broc_wF');
export const WOLF_ICONS = [
  getDriveUrl('1yktiFwi1krqxONnL9ntnfW9BK5iRDrTN'),
  getDriveUrl('1ctyNIaAn9T2uOpPCxUUkesokD5BaEmo1'),
  getDriveUrl('1Y6o9fTBkHxV_9uDuICsUaDHqiz85DrUf')
];

/** 
 * TRACK CALIBRATION 
 * Tinh chỉnh lại để sói đứng ngay ngắn trên vạch trắng đen
 */
export const TRACK_START_PERCENT = 13.5; 
export const TRACK_END_PERCENT = 78.0; 

/**
 * Vị trí trục dọc (Y) của 3 làn đua
 */
export const LANE_TOP_POSITIONS = ['62.5%', '73.5%', '84.5%'];

// Tần suất làm mới dữ liệu: 20 giây
export const REFRESH_INTERVAL = 20 * 1000;