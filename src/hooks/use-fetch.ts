export const useFetch = async (url: string, options?: RequestInit) => {
  // Get token from sessionStorage (more secure than localStorage)
  const token = sessionStorage.getItem('accessToken');
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // Check if body is FormData
  const isFormData = options?.body instanceof FormData;

  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    headers: {
      // Only set Content-Type for non-FormData requests
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  // Handle 401 responses (could be invalid credentials OR session expired)
  if (response.status === 401) {
    let errorMessage = 'Authentication failed';
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // If response is not JSON, use default error message
    }

    // Check if this is a login request (no token being sent)
    const isLoginRequest = !token || url.includes('/login') || url.includes('/auth');
    
    if (isLoginRequest) {
      // This is invalid credentials during login
      throw new Error(errorMessage || 'Invalid email or password');
    } else {
      // This is a session expiry (token was sent but rejected)
      // Clear all auth data
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('userData');
      localStorage.removeItem('rememberUser');
      
      // Redirect to login page
      window.location.href = '/login';
      throw new Error('Session expired. Please log in again.');
    }
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