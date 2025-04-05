import { signify } from 'react-signify';

export const sCountItem = signify(JSON.parse(localStorage.getItem("cartItems"))?.length || 0);