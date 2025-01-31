import React, { createContext, useContext, useState, useEffect } from 'react';

interface BrokerContextType {
  totalClients: number;
  totalEnrolledEmployees: number;
  totalRevenue: number;
  updateEnrollment: (newClients: number, newEmployees: number, newRevenue: number) => void;
}

const BrokerContext = createContext<BrokerContextType | undefined>(undefined);

export const useBrokerContext = () => {
  const context = useContext(BrokerContext);
  if (context === undefined) {
    throw new Error('useBrokerContext must be used within a BrokerContextProvider');
  }
  return context;
};

export const BrokerContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalClients, setTotalClients] = useState(0);
  const [totalEnrolledEmployees, setTotalEnrolledEmployees] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const updateEnrollment = (newClients: number, newEmployees: number, newRevenue: number) => {
    setTotalClients((prev) => prev + newClients);
    setTotalEnrolledEmployees((prev) => prev + newEmployees);
    setTotalRevenue((prev) => prev + newRevenue);
  };

  return (
    <BrokerContext.Provider value={{ totalClients, totalEnrolledEmployees, totalRevenue, updateEnrollment }}>
      {children}
    </BrokerContext.Provider>
  );
};

