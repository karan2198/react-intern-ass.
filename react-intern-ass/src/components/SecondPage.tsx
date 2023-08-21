import React from 'react';
import DataGridComponent from './DataGridComponent';
import DepartmentHierarchy from './DepartmentHierarchy';

const SecondPage: React.FC = () => {
    return (
        <div>
         <DataGridComponent  />
            <DepartmentHierarchy/>
        </div>
    );
};

export default SecondPage;
