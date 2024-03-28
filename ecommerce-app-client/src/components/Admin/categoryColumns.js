const handleEdit = () => alert('Pending implementation')
const handleDelete = () => alert('Pending implementation')

// let i = 0
export const CATEGORY_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
        Cell: ({ row, index }) => index
        // Cell: ({ row }) => i = i + 1
    },
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Actions",
        accessor: 'actions',
        Cell: ({ row }) => {
            return (
                <div>
                    <button className="btn btn-primary me-3" onClick={handleEdit}>Edit</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            );
        }
    }
]