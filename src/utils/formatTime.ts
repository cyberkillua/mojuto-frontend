export const formatRelativeTime = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Get start of today and yesterday for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const inputDate = new Date(date);
  inputDate.setHours(0, 0, 0, 0);
  
  // If it's today and within hours
  if (inputDate.getTime() === today.getTime()) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    if (diffInHours > 0) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes > 0) {
        return `${diffInMinutes} minutes ago`;
      } else {
        return 'Just now';
      }
    }
  }
  
  // If it's yesterday
  if (inputDate.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  }
  
  // Otherwise show the date
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};