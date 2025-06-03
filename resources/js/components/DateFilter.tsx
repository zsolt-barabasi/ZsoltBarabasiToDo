import type { Todo } from '@/constants';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Dispatch, useEffect, useState } from 'react';

dayjs.extend(isBetween);

type DateFilterProps = {
    todoList: Todo[];
    setFilteredList: Dispatch<React.SetStateAction<Todo[]>>;
};

export function DateFilter({ todoList, setFilteredList }: DateFilterProps) {
    const [from, setFrom] = useState<Dayjs | null>(null);
    const [to, setTo] = useState<Dayjs | null>(null);
    useEffect(() => {
        if (from && to) {
            setFilteredList(todoList.filter((todo: Todo) => dayjs(todo.created_at).isBetween(from.startOf('d'), to.endOf('d'))));
        } else {
            setFilteredList(todoList);
        }
    }, [from, to, todoList]);

    return (
        <Box className="mt-8 flex justify-end">
            <DatePicker
                label="From"
                defaultValue={from}
                onChange={setFrom}
                slotProps={{
                    field: { clearable: true },
                }}
            />
            <DatePicker
                label="To"
                defaultValue={to}
                onChange={setTo}
                slotProps={{
                    field: { clearable: true },
                }}
            />
        </Box>
    );
}
