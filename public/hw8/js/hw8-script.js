// HW8 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer


// --- Components ---

const TaskCard = (props) => {
    return (
        <div className="task-card">

            <div className="task-info">
                <strong>{props.task.name}</strong>

                <span className={"badge " + props.task.priority.toLowerCase()}>
                    {props.task.priority}
                </span>
            </div>

            <button onClick={() => props.onDelete(props.task.id)}>
                X
            </button>

        </div>
    );
};



const TaskList = (props) => {

    if (props.tasks.length === 0) {
        return (
            <p className="empty-message">
                No tasks yet - add one above!
            </p>
        );
    }

    return (
        <div>
            {props.tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={props.onDelete}
                />
            ))}
        </div>
    );
};



const App = () => {

// --- State ---
    const [tasks, setTasks] = React.useState([]);
    const [taskName, setTaskName] = React.useState("");
    const [priority, setPriority] = React.useState("Medium");
    const [error, setError] = React.useState("");


// --- Event Handlers ---

    const addTask = () => {

        if (taskName.trim() === "") {
            setError("Task name cannot be empty.");
            return;
        }

        setError("");

        const newTask = {
            id: Date.now(),
            name: taskName.trim(),
            priority: priority
        };

        setTasks([...tasks, newTask]);

        setTaskName("");
        setPriority("Medium");
    };


    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };


    const clearAll = () => {
        setTasks([]);
    };


// --- JSX ---

    return (
        <div className="app">

            <h1>Quick Tasks</h1>

            <p className="task-count">
                {tasks.length} task{tasks.length === 1 ? "" : "s"}
            </p>


            <div className="form-area">

                <input
                    type="text"
                    placeholder="Enter a task"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />


                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>


                <button onClick={addTask}>
                    Add Task
                </button>


                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

            </div>


            <TaskList
                tasks={tasks}
                onDelete={deleteTask}
            />


            {tasks.length > 0 && (
                <button
                    className="clear-button"
                    onClick={clearAll}
                >
                    Clear All
                </button>
            )}

        </div>
    );
};


// --- Mount ---
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);