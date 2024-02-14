// 유저가 값을 입력한다.
// + 버튼을 클릭하면 할 일이 추가된다.
// delete 버튼을 누르면 할 일이 삭제된다.
// check 버튼을 누르면 할 일에 취소선이 그어진다. 배경색도 회색으로 바꾼다.
// 모두-진행 중-끝남 탭을 누르면 언더바가 이동한다.
// 끝남 탭은 끝난 아이템만, 진행 중 탭은 진행 중인 아이템만 나온다.
// 모두 탭을 누르면 다시 모두 탭으로 돌아온다.

let COMPLETE = true;
let ONGOING = false;
let NOTHING = undefined;
let ban = NOTHING;
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("mousedown", addTask);


let allButton = document.getElementById("all-tab");
let ongoingButton = document.getElementById("ongoing-tab");
let doneButton = document.getElementById("done-tab");

allButton.addEventListener("click", function() {
    document.getElementById("underline").style.left = 0 + "px";
});
ongoingButton.addEventListener("click", function() {
    document.getElementById("underline").style.left = 90 + "px";
});
doneButton.addEventListener("click", function() {
    document.getElementById("underline").style.left = 180 + "px";
});


function addTask() {
    let task = {
        id: new Date().getTime() + Math.random(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskInput.value = '';
    taskList.push(task);
    render();
}

function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        if (ban !== NOTHING && taskList[i].isComplete == ban) continue;
        if (taskList[i].isComplete) {
            resultHTML += `<div class="task task-done">
            <span>
                ${taskList[i].taskContent}
            </span>
            <div class="button-box">
                <button onclick="toggleComplete('${taskList[i].id}')">
                    <i class="fa-solid fa-rotate-left rotate-sign"></i>
                </button>
                <button onclick="deleteTask('${taskList[i].id}')">
                    <i class="fa-solid fa-trash-can trash-sign"></i>
                </button>
            </div>
        </div>`
        } else {
            resultHTML += `<div class="task">
            <span>
                ${taskList[i].taskContent}
            </span>
            <div class="button-box">
                <button onclick="toggleComplete('${taskList[i].id}')">
                    <i class="fa-solid fa-check check-sign"></i>
                </button>
                <button onclick="deleteTask('${taskList[i].id}')">
                    <i class="fa-solid fa-trash-can trash-sign"></i>
                </button>
            </div>
        </div>`
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete ^= true;
            break;
        }
    }
    render();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

function showAll() {
    ban = NOTHING;
    render();
}

function showOngoingList() {
    ban = COMPLETE;
    render();
}

function showCompleteList() {
    ban = ONGOING;
    render();
}