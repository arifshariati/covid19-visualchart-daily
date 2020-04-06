import React from 'react';
import { Nav } from 'react-bootstrap';

const Pagination = ({dataPerPage, totalData, paginate}) =>{
    const PageNumber=[];
    for(let i=1;i<=Math.ceil(totalData/dataPerPage);i++){
        PageNumber.push(i);
    }
    return (
        <Nav>
            <ul className="pagination">
                {
                    PageNumber.map(number=>(
                        <li key={number} className="page-item">
                            <a onClick={()=>paginate(number)} href="#" className="page-link">{number}</a>
                        </li>
                    ))
                }
            </ul>
        </Nav>
    )
}
export default Pagination;