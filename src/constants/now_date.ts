const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // 월(0~11) → +1
const dd = String(today.getDate()).padStart(2, '0');

export const FORMATTED = `${yyyy}-${mm}-${dd}`;
