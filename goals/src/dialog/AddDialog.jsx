import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material'
import { UseGoalsProvider } from '../Context/goalsContex'
import { buttonBgColor } from '../utils/color'
import { Close } from '@mui/icons-material';

const priorities = ["Low", "Medium", "High"];

const AddDialog = () => {
    const {
        openAddGolsDialog,
        setOpenAddGoalsDialog,
        title,
        setTitle,
        description,
        setDescription,
        dueDate,
        setDueDate,
        priority,
        setPriority,
        category,
        setCategory,
        handleAddTask,
        addGoalsLoading,
        UpdateLoading,
        isUpdate,
        handleUpdateTask
    } = UseGoalsProvider() || {}
    // console.log(openAddGolsDialog);

    const _600 = useMediaQuery("(max-width:700px)");

    return (
        <Dialog fullWidth open={openAddGolsDialog}>
            <DialogTitle position="relative" textAlign="center" variant="h5">
              {isUpdate?" Update  Your Goals":" Add Your Goals"} 
            </DialogTitle>

            <IconButton
                sx={{ position: 'absolute', top: 2, right: 2 }}
                onClick={() => setOpenAddGoalsDialog(pre => !pre)}
            >
                <Close sx={{ color: "red", fontSize: "1.5rem" }} />
            </IconButton>

            <DialogContent>

                {/* Title Field */}
                <Stack mt={2}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        name="tital"
                        label="Title"
                        fullWidth
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Stack>

                {/* Description Field */}
                <Stack mt={2}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        name="description"
                        label="Description"
                        fullWidth
                        required
                        multiline
                        rows={3}
                        size="small"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Stack>

                {/* Due Date Field */}
                <Stack mt={2}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        name="dueDate"
                        label="Due Date"
                        fullWidth
                        required
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </Stack>

                {/* Priority Select */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Priority</InputLabel>
                    <Select
                        name="priority"
                        label="Priority"
                        required
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        {priorities.map((priority, i) => (
                            <MenuItem key={i} value={priority}>
                                {priority}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Category Field */}
                <Stack mt={2}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        name="category"
                        label="Category"
                        fullWidth
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Stack>

                {/* Submit Button */}
                <Button
                    onClick={isUpdate?handleUpdateTask:handleAddTask}
                    sx={{ width: "100%", mt: 4 }}
                    variant="contained"
                    style={{ background: `${buttonBgColor}` }}
                >
                    {
                        isUpdate ? (
                            UpdateLoading ? (
                                <CircularProgress sx={{ fontWeight: "900" }} size={'1.8rem'} color="warning" />
                            ) : "Update Goals"
                        ) : (

                            addGoalsLoading ? (

                                <CircularProgress sx={{ fontWeight: "900" }} size={'1.8rem'} color="warning" />
                            ) : "Add Goals"

                        )

                    }

                </Button>

            </DialogContent>
        </Dialog>
    );
};

export default AddDialog;
