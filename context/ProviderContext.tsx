import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface ProviderContextType {
  totalEmployers: number;
  totalEnrolled: number;
  pendingEnrollments: number;
  // newPatients: number; // Removed newPatients
  totalRevenue: number;
  employerEnrollmentsTotalEmployers: number;
  employerEnrollmentsTotalEnrolled: number;
  updateMetrics: (newMetrics: Partial<ProviderContextType>) => void;
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

export const useProviderContext = () => {
  const context = useContext(ProviderContext);
  if (context === undefined) {
    throw new Error('useProviderContext must be used within a ProviderContextProvider');
  }
  return context;
};

export const ProviderContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState({
    totalEmployers: 0,
    totalEnrolled: 0,
    pendingEnrollments: 0,
    // newPatients: 0, // Removed newPatients
    totalRevenue: 0,
    employerEnrollmentsTotalEmployers: 0,
    employerEnrollmentsTotalEnrolled: 0,
  });

  const updateMetrics = useCallback((newMetrics: Partial<ProviderContextType>) => {
    setMetrics(prevMetrics => ({
      ...prevMetrics,
      ...newMetrics,
    }));
  }, []);

  const contextValue = useMemo(() => ({
    ...metrics,
    updateMetrics,
  }), [metrics, updateMetrics]);

  return (
    <ProviderContext.Provider value={contextValue}>
      {children}
    </ProviderContext.Provider>
  );
};

