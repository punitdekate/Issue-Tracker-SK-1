async function assignMember(projectId, userId) {
    try {
        const response = await fetch(`http://localhost:3000/issue-tracker/${projectId}/assignMember/${userId}`, {
            method: "POST",
            credentials: "include"
        })
        const data = await response.json();
        displayPopup(data.msg);

    } catch (error) {
        console.log(error);
    }
}

function displayPopup(message, duration = 3000) {
    const popUp = document.getElementById('popup-container');
    const popUpMsg = document.getElementById('pop-up-msg');
    popUpMsg.innerText = message;
    popUp.style.display = 'block';
    setTimeout(() => {
        popUp.style.display = 'none';
    }, duration);
}