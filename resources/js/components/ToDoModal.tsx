import type { Todo } from '@/constants';
import { ToDoPriority } from '@/constants';
import { createAPI, updateAPI } from '@/requests';
import CloseIcon from '@mui/icons-material/Close';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Button, Dialog, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import { Dispatch, useCallback, useEffect, useState } from 'react';

type ToDoModalProps = {
    fetchTodos: () => void;
    todo?: Todo;
    showModal: boolean;
    setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export function ToDoModal({ fetchTodos, todo, showModal, setShowModal }: ToDoModalProps) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState(ToDoPriority.P1);
    const [status, setStatus] = useState<boolean>(false);

    const closeHandler = () => {
        setShowModal(false);
        setTitle('');
        setDescription('');
        setPriority(ToDoPriority.P1);
        setStatus(false);
    };

    const createToDoHandler = useCallback(async () => {
        await createAPI({
            title,
            description,
            priority,
            status,
        });
        fetchTodos();
        closeHandler();
    }, [title, description, priority, todo]);

    const editTodoHandler = useCallback(async () => {
        await updateAPI({
            ...(todo ?? { id: -1 }),
            title,
            description,
            priority,
            status,
        });
        fetchTodos();
        closeHandler();
    }, [title, description, priority, todo]);

    useEffect(() => {
        if (showModal && todo) {
            setTitle(todo.title);
            setDescription(todo.description);
            setPriority(todo.priority);
            setStatus(todo.status);
        }
    }, [showModal, todo]);

    return (
        <Box className="flex">
            <Tooltip title={'Create ToDo'} placement="right" arrow>
                <IconButton onClick={() => setShowModal(true)} size="large">
                    <PlaylistAddOutlinedIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <Dialog onClose={closeHandler} open={showModal} className="relative">
                <Tooltip title={'Close'} placement="left" arrow>
                    <IconButton className="!absolute top-2 right-2" onClick={closeHandler}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
                <Box className="flex min-w-sm flex-col gap-5 p-8">
                    <DialogTitle>Create a ToDo</DialogTitle>
                    <TextField
                        required
                        id="title"
                        label="Title"
                        placeholder="Title"
                        defaultValue={title}
                        onChange={(event) => setTitle(event.target.value ?? '')}
                        error={!title.length}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        placeholder="Description"
                        defaultValue={description}
                        multiline
                        rows={4}
                        onChange={(event) => setDescription(event.target.value ?? '')}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="priorityLabel">Priority</InputLabel>
                        <Select
                            labelId="priorityLabel"
                            id="priority"
                            value={priority}
                            label="Priority"
                            onChange={(event) => setPriority(event.target.value ?? '')}
                        >
                            <MenuItem value={ToDoPriority.P0}>{ToDoPriority[0]}</MenuItem>
                            <MenuItem value={ToDoPriority.P1}>{ToDoPriority[1]}</MenuItem>
                            <MenuItem value={ToDoPriority.P2}>{ToDoPriority[2]}</MenuItem>
                        </Select>
                    </FormControl>
                    <Box className="mt-5 flex justify-end">
                        {todo ? (
                            <Tooltip title={'Edit ToDo'} placement="left" arrow>
                                <Box>
                                    <Button variant="contained" disabled={!title.length} onClick={editTodoHandler} startIcon={<SaveOutlinedIcon />}>
                                        {'Edit ToDo'}
                                    </Button>
                                </Box>
                            </Tooltip>
                        ) : (
                            <Tooltip title={'Create ToDo'} placement="left" arrow>
                                <Box>
                                    <Button variant="contained" disabled={!title.length} onClick={createToDoHandler} startIcon={<SaveOutlinedIcon />}>
                                        {'Create ToDo'}
                                    </Button>
                                </Box>
                            </Tooltip>
                        )}
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}
