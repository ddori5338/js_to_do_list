// 유저가 값을 입력한다.
// + 버튼을 클릭하면 할 일이 추가된다.
// delete 버튼을 누르면 할 일이 삭제된다.
// check 버튼을 누르면 할 일에 취소선이 그어진다. 배경색도 회색으로 바꾼다.
// 모두-진행 중-끝남 탭을 누르면 언더바가 이동한다.
// 끝남 탭은 끝난 아이템만, 진행 중 탭은 진행 중인 아이템만 나온다.
// 모두 탭을 누르면 다시 모두 탭으로 돌아온다.

// 추가로 하고 싶은 일
// 1. 빈 체크 박스를 왼쪽으로 뺀다. 박스를 누르면 체크가 된 박스가 된다.
// 2. 수정 버튼을 추가한다. 수정 버튼을 누르면 기존 문자열 위치에 인풋박스가 생긴다.
// 3. 수정 버튼과 삭제 버튼은 작게 만들어서 오른쪽에 2행 1열로 배치한다.
// 4. 체크 박스를 누르면 문자열에 취소선이 그어지는데, 왼쪽에서 오른쪽으로 그어진다.
// 5. 드래그 앤 드롭 기능으로 순서를 바꿀 수 있다.

let COMPLETE = true;
let ONGOING = false;
let NOTHING = undefined;
let ban = NOTHING;
let timerSet = false;
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

taskInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && !timerSet) {
        timerSet = true;
        setTimeout(() => {
            addTask();
            timerSet = false;
        }, 100);
    }
});

function addTask() {
    if (taskInput.value == null || taskInput.value.trim() === '') {
        alert("할 일을 입력해주세요.");
        taskInput.value = '';
        return;
    }
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