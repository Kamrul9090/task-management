import Link from "next/link";

const ShowTask = ({ taskList, deleteTask, editTask }) => {
    return (
        <div>
            {
                taskList.map((task, index) => <div key={index}>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    <p>{task.status}</p>
                    <button onClick={() => deleteTask(index)} className="bg-red-800 text-white p-2 rounded-md font-bold">Delete</button>
                    {/* <Link href={`/task/edit`}>
                    </Link> */}
                    <button onClick={() => editTask(index)} className="bg-red-800 text-white p-2 rounded-md font-bold">Edit</button>
                </div>)
            }
        </div>
    );
};

export default ShowTask;
