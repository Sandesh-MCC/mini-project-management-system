const BASE_URL = 'http://localhost:4000';

let currentProjectId = null;


async function loadProjects() {
    const res = await fetch(`${BASE_URL}/projects`);
    const result = await res.json();
    const container = document.getElementById('project-list');
    container.innerHTML = '';

    result.data.forEach(p => {
        container.innerHTML += `
                <div class="card">
                    <h3>${p.name}</h3>
                    <p style="color: #666;">${p.description}</p>
                    <div class="flex">
                        <button class="btn btn-blue" onclick="openProject('${p._id}', '${p.name}')">View Tasks</button>
                        <button class="btn btn-red" onclick="deleteProject('${p._id}')">Delete</button>
                    </div>
                </div>
            `;
    });
}

async function addProject() {
    const name = document.getElementById('pName').value;
    const description = document.getElementById('pDesc').value;
    if (!name || !description) return alert("Fill all fields");

    await fetch(`${BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
    });
    document.getElementById('pName').value = '';
    document.getElementById('pDesc').value = '';
    loadProjects();
}

async function deleteProject(id) {
    if (confirm("Delete this project and all tasks?")) {
        await fetch(`${BASE_URL}/projects/${id}`, { method: 'DELETE' });
        loadProjects();
    }
}


function openProject(id, name) {
    currentProjectId = id;
    document.getElementById('task-form-title').innerText = `Add Task to: ${name}`;
    document.getElementById('project-page').classList.add('hidden');
    document.getElementById('task-page').classList.remove('hidden');
    loadTasks();
}

function showProjects() {
    document.getElementById('project-page').classList.remove('hidden');
    document.getElementById('task-page').classList.add('hidden');
    loadProjects();
}


let editingTaskId = null; // Track karne ke liye ki kaunsa row edit ho raha hai

async function loadTasks() {
    const status = document.getElementById('statusFilter').value;
    const res = await fetch(`${BASE_URL}/projects/${currentProjectId}/tasks?status=${status}`);
    const result = await res.json();
    const tbody = document.getElementById('task-list');
    tbody.innerHTML = '';

    result.data.forEach(t => {
        const isEditing = editingTaskId === t._id;

        tbody.innerHTML += `
            <tr>
                <td>
                    ${isEditing 
                        ? `<input type="text" id="edit-title-${t._id}" value="${t.title}" style="width:90%; padding:5px;">
                           <br><input type="text" id="edit-desc-${t._id}" value="${t.description}" style="width:90%; margin-top:5px; padding:5px;">` 
                        : `<b>${t.title}</b><br><small>${t.description}</small>`
                    }
                </td>
                <td><span style="color: ${t.priority === 'high' ? 'red' : 'orange'}">${t.priority.toUpperCase()}</span></td>
                <td>
                    <select id="select-${t._id}">
                        <option value="todo" ${t.status === 'todo' ? 'selected' : ''}>To Do</option>
                        <option value="in-progress" ${t.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="done" ${t.status === 'done' ? 'selected' : ''}>Done</option>
                    </select>
                </td>
                <td>${new Date(t.due_date).toLocaleDateString()}</td>
                <td>
                    ${isEditing 
                        ? `<button class="btn btn-green" onclick="saveEdit('${t._id}')">Save</button>
                           <button class="btn" style="background:#ccc;" onclick="cancelEdit()">Cancel</button>` 
                        : `<button class="btn btn-blue" onclick="enableEdit('${t._id}')">Update</button>
                           <button class="btn btn-red" onclick="deleteTask('${t._id}')">Delete</button>`
                    }
                </td>
            </tr>
        `;
    });
}


async function handleUpdate(taskId) {
    const newStatus = document.getElementById(`select-${taskId}`).value;
    
   
    await updateTaskStatus(taskId, newStatus);
    
    alert("Task updated successfully!");
}

async function addTask() {
    const title = document.getElementById('tTitle').value;
    const description = document.getElementById('tDesc').value;
    const priority = document.getElementById('tPriority').value;
    const due_date = document.getElementById('tDate').value;

    if (!title || !due_date) return alert("Title and Date are required");

    await fetch(`${BASE_URL}/projects/${currentProjectId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority, due_date })
    });
    loadTasks();
}

async function updateTaskStatus(taskId, newStatus) {
    await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    });
    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
}

function enableEdit(taskId) {
    editingTaskId = taskId;
    loadTasks(); 
}

function cancelEdit() {
    editingTaskId = null;
    loadTasks();
}

async function saveEdit(taskId) {
    const updatedTitle = document.getElementById(`edit-title-${taskId}`).value;
    const updatedDesc = document.getElementById(`edit-desc-${taskId}`).value;
    const updatedStatus = document.getElementById(`select-${taskId}`).value;

    try {
        const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title: updatedTitle, 
                description: updatedDesc, 
                status: updatedStatus 
            })
        });

        if (response.ok) {
            alert("Task Updated!");
            editingTaskId = null; // Edit mode off
            loadTasks(); // Table refresh
        }
    } catch (error) {
        console.error("Update failed:", error);
    }
}

loadProjects();