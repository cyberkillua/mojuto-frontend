const useFetch = async (url: string, options?: RequestInit) => {
  const token = localStorage.getItem('token');
  const baseURL= import.meta.env.VITE_API_BASE_URL;
  
  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default useFetch;