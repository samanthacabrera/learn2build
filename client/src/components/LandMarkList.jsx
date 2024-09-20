import React from 'react';
import CreateRoute from './CreateRoute';

const LandMarkList = ({ landmarks, selectedLandmarks, setSelectedLandmarks, selectedCity }) => {
    const handleCheckboxChange = (landmark) => {
        setSelectedLandmarks((selected) => {
            if (selected.includes(landmark)) {
                return selected.filter((l) => l !== landmark);
            } else {
                return [...selected, landmark];
            }
        });
    };

    const filteredLandmarks = landmarks.filter((landmark) => landmark.city === selectedCity);

    return (
        <div className="flex flex-col items-center my-12">
            <p className="text-3xl font-bold uppercase tracking-wide text-gray-800 mb-2">
                2. Plan your Route
            </p>
            <ul className="mb-6 w-full max-w-md"> 
                {filteredLandmarks.map((landmark) => (
                    <li key={landmark._id} className="mb-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectedLandmarks.includes(landmark)}
                                onChange={() => handleCheckboxChange(landmark)}
                                className="form-checkbox h-5 w-5 text-gray-800"
                            />
                            <span>{landmark.name}</span>
                        </label>
                        {selectedLandmarks.includes(landmark) && (
                            <div className="p-2 mt-1 bg-gray-100 rounded-lg"> 
                                {landmark.desc}  
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <CreateRoute selectedLandmarks={selectedLandmarks} />
        </div>
    );
};

export default LandMarkList;
