const useFetch = async (url: string, options?: RequestInit) => {
  // Get token from sessionStorage (more secure than localStorage)
  const token = sessionStorage.getItem('accessToken');
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  

  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  // Handle 401 responses (token expired or invalid)
  if (response.status === 401) {
    // Clear all auth data
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userData');
    localStorage.removeItem('rememberUser');
    
    // Redirect to login page
    window.location.href = '/login';
    throw new Error('Session expired. Please log in again.');
  }

  // Handle other HTTP errors
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // If response is not JSON, use default error message
    }
    
    throw new Error(errorMessage);
  }

  return response.json();
};

export default useFetch;