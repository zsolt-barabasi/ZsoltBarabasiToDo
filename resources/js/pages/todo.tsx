import { DateFilter } from '@/components/DateFilter';
import { ToDoModal } from '@/components/ToDoModal';
import type { Todo } from '@/constants';
import { ToDoPriority } from '@/constants';
import { deleteAPI, getAllAPI, updateAPI } from '@/requests';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Checkbox, Container, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function Todo({ todos }: { todos: Todo[] }) {
    const [todoList, setTodoList] = useState<Todo[]>(todos);
    const [filteredList, setFilteredList] = useState<Todo[]>(todos);
    const [editingTodo, setEditingTodo] = useState<Todo>();
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        !showModal && setEditingTodo(undefined);
    }, [showModal]);

    const fetchTodos = useCallback(async () => {
        const todosJson = await getAllAPI();
        setTodoList(todosJson);
    }, []);

    const deleteTodo = useCallback(
        async (id: number) => {
            await deleteAPI(id);
            fetchTodos();
        },
        [todos],
    );

    const columns: GridColDef<Todo[][number]>[] = useMemo(
        () => [
            {
                field: 'mark',
                type: 'actions',
                headerName: 'Mark',
                flex: 0.3,
                getActions: (params) => [
                    <Tooltip title={'Mark as ' + (params.row.status ? 'In progress' : 'Completed')} placement="right" arrow>
                        <GridActionsCellItem
                            icon={<Checkbox checked={params.row.status} />}
                            label="Mark"
                            onClick={async () => {
                                await updateAPI({
                                    ...params.row,
                                    status: !params.row.status,
                                });
                                fetchTodos();
                                setShowModal(false);
                            }}
                        />
                    </Tooltip>,
                ],
            },
            {
                field: 'title',
                headerName: 'Title',
                flex: 1,
            },
            {
                field: 'description',
                headerName: 'Description',
                flex: 1,
            },
            {
                field: 'priority',
                headerName: 'Priority',
                flex: 0.4,
                valueGetter: (value, _row) => ToDoPriority[value],
            },
            {
                field: 'status',
                headerName: 'Status',
                flex: 0.5,
                valueGetter: (value, _row) => (value ? 'Completed' : 'In progress'),
            },
            {
                field: 'created_at',
                headerName: 'Created date',
                flex: 1,
                type: 'dateTime',
                valueGetter: (value) => new Date(value),
            },
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Actions',
                flex: 0.5,
                getActions: (params) => [
                    <Tooltip title={'Delete Todo'} placement="left" arrow>
                        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => deleteTodo(params.row.id)} />
                    </Tooltip>,
                    <Tooltip title={'Edit Todo'} placement="left" arrow>
                        <GridActionsCellItem
                            icon={<EditOutlinedIcon />}
                            label="Edit"
                            onClick={() => {
                                setEditingTodo(params.row);
                                setShowModal(true);
                            }}
                        ></GridActionsCellItem>
                    </Tooltip>,
                ],
            },
        ],
        [setEditingTodo, setShowModal, deleteTodo],
    );
    return (
        <>
            <Container className="flex flex-col gap-2.5">
                <Box className="mt-10 flex min-w-full flex-col justify-center">
                    <Box className="flex justify-center align-middle">
                        <Typography variant="h4">{"Zsolt's ToDo list"}</Typography>
                    </Box>
                    <DateFilter todoList={todoList} setFilteredList={setFilteredList} />
                    <DataGrid
                        rows={filteredList}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                        showToolbar
                        slotProps={{
                            toolbar: {
                                csvOptions: { disableToolbarButton: true },
                                printOptions: { disableToolbarButton: true },
                            },
                        }}
                    />
                </Box>
                <ToDoModal fetchTodos={fetchTodos} todo={editingTodo} showModal={showModal} setShowModal={setShowModal} />
            </Container>
        </>
    );
}
