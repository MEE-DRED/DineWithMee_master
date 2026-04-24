import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  illustration?: string;
  className?: string;
}

const defaultIcon = (
  <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  illustration,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}>
      {illustration ? (
        <img src={illustration} alt="Empty state" className="w-48 h-48 mb-6 object-contain" />
      ) : (
        <div className="mb-6">{icon || defaultIcon}</div>
      )}

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

      {description && (
        <p className="text-gray-600 max-w-md mb-6">{description}</p>
      )}

      {action && (
        <button onClick={action.onClick} className="btn-primary">
          {action.label}
        </button>
      )}
    </div>
  );
};

// Predefined empty states
export const NoConsultationsEmpty: React.FC<{ onBook: () => void }> = ({ onBook }) => (
  <EmptyState
    icon={
      <svg className="w-16 h-16 text-dwm-green-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    }
    title="No Consultations Yet"
    description="Start your health journey by booking a consultation with a qualified nutritionist."
    action={{
      label: 'Book Consultation',
      onClick: onBook,
    }}
  />
);

export const NoMealsEmpty: React.FC<{ onBrowse: () => void }> = ({ onBrowse }) => (
  <EmptyState
    icon={
      <svg className="w-16 h-16 text-dwm-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    }
    title="Your Cart is Empty"
    description="Browse our selection of healthy, nutritionist-approved meals."
    action={{
      label: 'Browse Meals',
      onClick: onBrowse,
    }}
  />
);

export const NoDataEmpty: React.FC = () => (
  <EmptyState
    icon={
      <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    }
    title="No Data Available"
    description="Start logging your health metrics to track your progress over time."
  />
);

export default EmptyState;
