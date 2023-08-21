import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const DataGridComponent: React.FC = () => {
    const [data, setData] = useState<Post[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'body', headerName: 'Body', width: 400 },
    ];

    return (
        <div style={{ height: 400, width: '100%',margin:'10em',marginTop:'20em' }}>
            <DataGrid rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]} />
        </div>
    );
};

export default DataGridComponent;
