// 유저가 값을 입력한다.
// + 버튼을 클릭하면 할 일이 추가된다.
// delete 버튼을 누르면 할 일이 삭제된다.
// check 버튼을 누르면 할 일에 취소선이 그어진다. 배경색도 회색으로 바꾼다.
// 모두-진행 중-끝남 탭을 누르면 언더바가 이동한다.
// 끝남 탭은 끝난 아이템만, 진행 중 탭은 진행 중인 아이템만 나온다.
// 모두 탭을 누르면 다시 모두 탭으로 돌아온다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("mousedown", addTask);


function addTask() {
    let taskContent = taskInput.value;
    taskInput.value = '';
    taskList.push(taskContent);
    render();
}

function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `<div class="task">
        <span>
            ${taskList[i]}
        </span>
        <div class="button-box">
            <button>
                <i class="fa-solid fa-check check-sign"></i>
            </button>
            <button>
                <i class="fa-solid fa-trash-can trash-sign"></i>
            </button>
        </div>
    </div>`
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}