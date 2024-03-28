import React from 'react'
import { useTable } from 'react-table'
import { useMemo } from 'react'

import { CATEGORY_COLUMNS } from './categoryColumns'

const CategoryTable = ({ categories }) => {
    // Pending memoize
    const columns = useMemo(() => CATEGORY_COLUMNS, [])
    const data = useMemo(() => categories, [categories])

    // const columns = CATEGORY_COLUMNS
    // const data = categories

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance

    return (
        <>
            <table className="table" {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </th>
                                    ))
                                }

                            </tr>

                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>
                                                {
                                                    cell.render('Cell')
                                                }
                                            </td>
                                        }

                                        )
                                    }

                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </>
    )
}

export default CategoryTable
