import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  IconButton,
  Box,
  Tooltip,
  Stack,
  Divider,
  Button,
  CircularProgress
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import TodayIcon from "@mui/icons-material/Today";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Category, Edit } from "@mui/icons-material";
import { UseGoalsProvider } from "../Context/goalsContex";
import toast from "react-hot-toast";



// ====== Show color in priority elemant ======
const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "#004d4d";
    case "Medium":
      return "#803300";
    case "Low":
      return "#99004d";
    default:
      return "#9e9e9e";
  }
};


// ========= Date formet in 1 may 2025 this formet ========
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

// ============ canvert the srt date in 1may 2025 this formet  ========
const isToday = (dateStr) => {
  const today = new Date();
  const date = new Date(dateStr);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// ============ Over due date  ===========
const isOverdue = (dateStr) => {
  const today = new Date();
  const date = new Date(dateStr);
  return date < today.setHours(0, 0, 0, 0);
};


// ==========  count overdue date ======
const getOverdueDays = (dueDateStr) => {
  const dueDate = new Date(dueDateStr);
  const today = new Date();
  const diffTime = today - dueDate;
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};


// ============== Main components =======
const TaskItem = ({ tasks, onToggleComplete, onDelete, onUpdate }) => {
  const { deliteLoading } = UseGoalsProvider() || {}
  tasks.map((e) => {
    console.log(e)
  })


  return (
    <Grid container spacing={3}>
      {tasks.map((task) => {
        const isCompleted = task.completed;
        const priorityColor = getPriorityColor(task.priority);
        const today = isToday(task.dueDate);
        const overdue = !isCompleted && isOverdue(task.dueDate);

        let status = "Upcoming";
        let statusColor = "info";
        let statusIcon = <UpcomingIcon fontSize="small" />;


        if (isCompleted) {
          status = "Completed";
          statusColor = "success";
          statusIcon = <CheckCircleIcon fontSize="small" />;

        } else if (overdue) {
          status = `Overdue`;
          statusColor = "error";
          statusIcon = <ErrorOutlineIcon fontSize="small" />;

        } else if (today) {
          status = "Active";
          statusColor = "success";
          statusIcon = <TodayIcon fontSize="small" />;
        }

        return (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card
              elevation={6}
              sx={{
                minWidth: { xs: "330px ", md: "430px" },
                borderRadius: 4,
                borderLeft: `6px solid ${priorityColor}`,
                backgroundColor: isCompleted ? "#d6d6c2" : "#ffffff",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)"
                },
                cursor: "default"
              }}
            >
              <CardContent>
                {/* Title and Complete Toggle */}
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: isCompleted ? "text.secondary" : "text.primary",
                      textDecoration: isCompleted ? "line-through" : "none",
                      flexGrow: 1
                    }}
                  >
                    {task.title}
                  </Typography>


                  <Tooltip title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}>
                    <IconButton
                      onClick={() => isCompleted ? (toast.error("This task is already completed.")) : onToggleComplete(task.id)}
                      color={statusColor}
                      size="small"
                    >
                      {isCompleted ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon sx={{ fontSize: "1.6rem", color: "green" }} />}
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1.5,
                    minHeight: 40,
                    fontStyle: task.description ? "normal" : "italic"
                  }}
                >
                  {task.description || "No description provided."}
                </Typography>

                <Divider sx={{ my: 1 }} />

                {/* Date */}
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <CalendarMonthIcon fontSize="small" color="action" />
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(task.dueDate)}
                  </Typography>
                  {overdue && !isCompleted && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ ml: 1, fontWeight: "bold" }}
                    >
                      ({getOverdueDays(task.dueDate)} day{getOverdueDays(task.dueDate) > 1 ? "s" : ""} overdue)
                    </Typography>
                  )}
                </Stack>

                {/* Chips */}
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 1 }}>
                  <Chip
                    label={task.priority}
                    size="small"
                    sx={{
                      backgroundColor: priorityColor,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    icon={<LabelImportantIcon sx={{ color: "white", }} />}
                  />
                  {task.category && (
                    <Chip label={task.category} size="small" sx={{ color: "black", padding: "5px", fontWeight: "bold", }} variant="outlined" />
                  )}

                  <Chip
                    label={status}
                    color={statusColor}
                    size="small"
                    icon={statusIcon}
                    sx={{ fontWeight: "bold" }}
                  />
                </Stack>

                {/* Actions */}
                <Stack direction="row" mt={4} justifyContent="space-between">

                  <Tooltip title={isCompleted ? "You can't edit a completed task." : "Edit Task"}>
                    <Button variant="contained" onClick={() => !isCompleted ? onUpdate(task.id, task.title, task.description, task.dueDate, task.priority, task.category) : (toast.error("This task is already completed and cannot be edited."))} color="warning" size="small">
                      <Edit /> Edit
                    </Button>
                  </Tooltip>

                  <Tooltip title="Delete Task">
                    <Button variant="contained" onClick={() => onDelete(task.id)} color="error" size="small">
                      {
                        deliteLoading === task.id ? (
                          <CircularProgress sx={{ fontWeight: "900" }} size={'1rem'} color="inherit" />
                        ) : (<>
                          Delete < DeleteIcon />
                        </>

                        )
                      }
                    </Button>
                  </Tooltip>



                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TaskItem;
