import React from 'react';

const MedicationManagement = () => {
  const medications = [
    { id: '1', name: 'Lisinopril', stock: 45, lowStock: false },
    { id: '2', name: 'Metformin', stock: 12, lowStock: true },
    { id: '3', name: 'Amlodipine', stock: 67, lowStock: false },
    { id: '4', name: 'Atorvastatin', stock: 8, lowStock: true }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-dwm-green-deep">Medication Inventory</h4>
        <button className="btn-primary text-sm">
          Add Medication
        </button>
      </div>
      
      <div className="space-y-3">
        {medications.map((med) => (
          <div key={med.id} className="flex items-center justify-between p-3 bg-dwm-green-pale rounded-lg">
            <div>
              <div className="font-medium text-dwm-green-deep">{med.name}</div>
              <div className="text-sm text-dwm-text-mid">
                Stock: {med.stock} units
              </div>
            </div>
            <div className="text-right">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                med.lowStock 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {med.lowStock ? 'Low Stock' : 'In Stock'}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <button className="btn-secondary w-full">
          View Full Inventory
        </button>
      </div>
    </div>
  );
};

export default MedicationManagement;
