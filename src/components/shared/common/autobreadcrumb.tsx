import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbConfig {
  [key: string]: {
    label: string;
    icon?: React.ReactNode;
  };
}

// Configure your route labels and icons here
const routeConfig: BreadcrumbConfig = {
  'dashboard': { label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
  'uploads': { label: 'Uploads' },
  'analyze': { label: 'Analysis' },
  'settings': { label: 'Settings' },
  'profile': { label: 'Profile' },
  'users': { label: 'Users' },
  'reports': { label: 'Reports' },
  'wallet': { label: 'Wallet' },
  'transactions': { label: 'Transactions' },
};

interface AutoBreadcrumbProps {
  className?: string;
  maxItems?: number;
  showHome?: boolean;
  customLabels?: BreadcrumbConfig;
}

export const AutoBreadcrumb: React.FC<AutoBreadcrumbProps> = ({
  className = "",
  maxItems = 4,
  showHome = true,
  customLabels = {}
}) => {
  const location = useLocation();
  
  // Merge custom labels with default config
  const fullConfig = { ...routeConfig, ...customLabels };
  
  // Parse the current path into segments
  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment !== '');

  // Generate breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;
    
    // Check if this segment is a dynamic ID (UUID pattern or numeric)
    const isDynamicId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment) || 
                       /^\d+$/.test(segment);
    
    // Get label from config or use the segment itself
    let label = fullConfig[segment]?.label || segment;
    
    // If it's a dynamic ID, try to get a more meaningful label
    if (isDynamicId) {
      const previousSegment = index > 0 ? pathSegments[index - 1] : '';
      if (previousSegment === 'uploads') {
        label = 'Upload Details';
      } else if (previousSegment === 'users') {
        label = 'User Details';
      } else {
        label = 'Details';
      }
    }
    
    // Capitalize first letter
    label = label.charAt(0).toUpperCase() + label.slice(1);
    
    return {
      label,
      path,
      isLast,
      icon: fullConfig[segment]?.icon,
      segment
    };
  });

  // Add home breadcrumb if enabled
  const allItems = showHome 
    ? [{ 
        label: 'Home', 
        path: '/', 
        isLast: false, 
        icon: <Home className="h-4 w-4" />,
        segment: 'home'
      }, ...breadcrumbItems]
    : breadcrumbItems;

  // Handle overflow with ellipsis
  const shouldShowEllipsis = allItems.length > maxItems;
  const displayItems = shouldShowEllipsis 
    ? [
        allItems[0], // First item (Home)
        { label: '...', path: '', isLast: false, icon: null, segment: 'ellipsis' },
        ...allItems.slice(-(maxItems - 2)) // Last few items
      ]
    : allItems;

  // Don't show breadcrumb if we're at root
  if (pathSegments.length === 0 && showHome) {
    return null;
  }

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {displayItems.map((item, index) => (
          <React.Fragment key={item.segment + index}>
            <BreadcrumbItem>
              {item.segment === 'ellipsis' ? (
                <BreadcrumbEllipsis className="h-4 w-4" />
              ) : item.isLast ? (
                <BreadcrumbPage className="text-[#D5F0FF] text-[1.2rem] font-medium flex items-center gap-1">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link 
                    to={item.path}
                    className="text-[#8EA2AD] hover:text-[#D5F0FF] text-[1.2rem] flex items-center gap-1 transition-colors"
                  >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && item.segment !== 'ellipsis' && index < displayItems.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-[#8EA2AD]" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// Usage examples:

// Basic usage
export const SimpleBreadcrumb = () => (
  <AutoBreadcrumb />
);

// With custom styling
export const StyledBreadcrumb = () => (
  <AutoBreadcrumb 
    className="mb-4 px-4"
    maxItems={5}
    showHome={true}
  />
);

// With custom labels
export const CustomBreadcrumb = () => (
  <AutoBreadcrumb 
    customLabels={{
      'crypto-portfolio': { label: 'Crypto Portfolio' },
      'nft-collection': { label: 'NFT Collection' }
    }}
    maxItems={3}
  />
);

// Example of how to use in your layout
export const LayoutWithBreadcrumb = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full">
    <div className="px-[3rem] pt-[2rem]">
      <AutoBreadcrumb 
        className="mb-[2rem]"
        customLabels={{
          'uploads': { label: 'Upload Management' },
          'analyze': { label: 'Portfolio Analysis' }
        }}
      />
    </div>
    {children}
  </div>
);