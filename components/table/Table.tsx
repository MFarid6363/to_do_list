import React, { useEffect, useState } from 'react';
import style from './table.module.css'
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TablePagination, TableSortLabel } from '@material-ui/core';
import { sort } from '../../utils';
import { Pagination } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/delete'
import useProvider from '../../providers/provider'


type order = 'desc' | 'asc';


const Table: React.FC = () => {
    const { deleteTask, handleStatus,taskList } = useProvider()
    const [order, setOrder] = useState<order>('asc');
    const [orderBy, setOrderBy] = useState('createDate');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const tableHead = [
        { id: "id", sorting: false, label: "No", width: undefined, minWidth: 100 },
        { id: "createDate", sorting: true, label: "Create date", width: undefined, minWidth: 100 },
        { id: "deadline", sorting: true, label: "Deadline", width: '300px', minWidth: 150 },
        { id: "description", sorting: false, label: "Description", width: undefined, minWidth: 150 },
        { id: "status", sorting: false, label: "Status", width: undefined, minWidth: 150 },
        { id: "delete", sorting: false, label: "Delete", width: undefined, minWidth: 150 },
    ]

    const handleChangePage = (_: any, newPage: number) => {
        setPage(newPage - 1);
    };

    const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <TableContainer className={style.TableContainer}>
                <MuiTable id="table-to-xls" aria-label="simple table">
                    <TableHead>
                        <TableRow className={style.TableHead}>
                            {tableHead.map(head =>
                                <TableCell key={head.id} style={{ width: head.width, minWidth: head.minWidth }}>
                                    {head.sorting ?
                                        <TableSortLabel
                                        active={orderBy === head.id}
                                        direction={orderBy === head.id ? order : 'asc'}
                                        onClick={(e) => {setOrderBy(head.id);setOrder(prev=>prev=='asc' ? 'desc' : 'asc')}}
                                        >
                                            {head.label}
                                        </TableSortLabel>
                                        :
                                        <>{head.label}</>
                                    }
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody className={style.TableBody}>
                        {taskList && taskList.length > 0 && sort(taskList,orderBy,order)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((el: { id: number; createDate: string; deadline: string; description: string; status: boolean; }, index: number) => (
                                <TableRow key={el.id}>
                                    <TableCell>
                                        <span>{index + 1}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{el.createDate}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{el.deadline}</span>
                                    </TableCell>
                                    <TableCell>
                                        <p title={el.description.length > 30 ? el.description : ""}>{el.description.length > 30 ? `${el.description.substring(0, 30)}...` : el.description}</p>
                                    </TableCell>
                                    <TableCell>
                                        <input type='checkbox' onChange={(event) => handleStatus(el.id, event.target.checked)} checked={el.status} />
                                    </TableCell>
                                    <TableCell>
                                        <i onClick={() => deleteTask(el.id)}><DeleteIcon /></i>
                                    </TableCell>

                                </TableRow>
                            ))}
                    </TableBody>
                </MuiTable>

                {taskList && taskList.length === 0 &&
                    <div className={style.NoData}>
                        No data
                    </div>
                }
            </TableContainer>
            {taskList &&
                <div className={style.PaginationContainer}>
                    <div>
                        {taskList.length !== 0 &&
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50, 100]}
                                component="div"
                                count={taskList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                classes={{ actions: style.TableAction }}
                                onPageChange={(ev,page)=>handleChangePage('',page+1)}
                            />
                        }
                    </div>
                    <div>
                        <Pagination count={Math.ceil(taskList.length / rowsPerPage)} page={page + 1} onChange={handleChangePage} shape="rounded" variant="outlined" />
                    </div>
                </div>
            }
        </div>
    );
};

export default Table;