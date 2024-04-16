import React from 'react'
import userType from '%/types/user.type';

export default function Table(props: propType) {
    return (
        <main className='flex flex-col items-center h-full'>
            <p className='text-4xl my-10'>User table.</p>
            <table className="table-auto h-fit w-fit">
                <thead>
                    <tr className='bg-green border-gray-light h-10' key={-1}>
                        {props.columns.map((val, index) => <th key={index}>{val}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.map((val, index) => (
                            <tr key={index} onClick={() => {props.onClick(index);}} className={'h-10 ' + ((index % 2 == 1)?'bg-gray-light':'')}>
                                {val.map((val1, index1) => <td key={index1}>{val1}</td>)}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </main>
    )
}

interface propType {
    data: Array<Array<string>>,
    columns: Array<string>,
    onClick: Function
}