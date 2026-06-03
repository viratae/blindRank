const ranker = (function rankController() {
    const rankForm = document.querySelector('#rankForm');
    const inputPage = document.querySelector('#inputPage');
    const rankPage = document.querySelector('#rankPage');
    const numberInput = document.querySelector('#numberInput');
    const numberMessage = document.querySelector('#numberMessage');
    const rankInput = document.querySelector('#rankInput');
    const rankMessage = document.querySelector('#rankMessage');
    let rankItems = [];
    let count;
    
    function showNumError() {
        numberMessage.classList.remove("show");
        numberInput.setCustomValidity("");
        let message = "";
        let rankInputValues = rankInput.value;
        rankInputValues = rankInputValues.replace(/\s*,\s*/g, ",");
        rankItems = rankInputValues.split(",");
        if(Number(numberInput.value) > rankItems.length) {
            console.log("Count exceeds list size!!");
            message = "Count exceeds list size";
            numberMessage.classList.add("show");
        }
        else {
            message = "";
            numberMessage.classList.remove("show");
        }
        numberInput.setCustomValidity(message);
        numberMessage.textContent = message;
    }
    function showRankError() {
        rankMessage.classList.remove("show");
        rankInput.setCustomValidity("");
        let message = "";
        if(rankInput.validity.valueMissing) {
            message = "Please enter a list to blind rank from";
            rankMessage.classList.add("show");
        }
        else {
            message = "";
            rankMessage.classList.remove("show");
        }
        rankInput.setCustomValidity(message);
        rankMessage.textContent = message;
    }
    // NEED TO SEPARATE
    rankInput.addEventListener('input', () => {
        showRankError()
    });
    numberInput.addEventListener('input', () => {
        showNumError()
    });
    rankForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showRankError();
        showNumError()
        if(!rankInput.checkValidity()) {
            return;
        }
        if(!numberInput.checkValidity()) {
            return;
        }
        count = document.querySelector('#numberInput').value;
        let rankInputValues = rankInput.value;
        rankInputValues = rankInputValues.replace(/\s*,\s*/g, ",");
        rankItems = rankInputValues.split(",");
        renderer.showHide(rankPage, inputPage);
        renderer.displayRankOptions(count);
        renderer.updateMatch(getItem());
        
        // for(let i = 0; i < count; i++) {
        //     blindItem.textContent = getItem();
        //     matchNumber.textContent = i + 1;

        // }
    });
    let rankings = [];
    
    function getCount() {
        return count;
    }
    function updateRankings(index, value) {
        rankings[index] = value;
        console.log(rankings);
    }
    let selectedItem;
    function getItem() {
        let index = Math.floor(Math.random() * rankItems.length);
        selectedItem = rankItems[index];
        rankItems.splice(index, 1);
        return selectedItem;
    }
    function getSelectedItem() {
        return selectedItem;
    }
    function getRankings() {
        return rankings;
    }
    return {
        updateRankings,
        getSelectedItem,
        getRankings,
        getItem,
        getCount
    }
})();
const renderer = (function () {
    let matchCount = 1;
    function updateMatch(match) {
        const blindItem = document.querySelector('#blindItem');
        const matchNumber = document.querySelector('#matchNumber');
        blindItem.textContent = match;
        matchNumber.textContent = matchCount;
        matchCount++;
    }
    function showHide(show, hide) {
        show.classList.remove("hidden");
        hide.classList.add("hidden");
    }
    function displayRankOptions(count) {
        const rankOptions = document.querySelector('#rankOptions');
        for(let i = 0; i < count; i++) {
            const button = document.createElement("button");
            button.textContent = (i + 1) + ". ";
            const span = document.createElement("span");
            button.appendChild(span);
            button.addEventListener('click', () => {
                span.textContent = ranker.getSelectedItem();
                button.disabled = true;
                ranker.updateRankings(i, ranker.getSelectedItem());
                if(matchCount - 1 == ranker.getCount()) {
                    showFinalRankings(ranker.getRankings());
                    return;
                }
                updateMatch(ranker.getItem());
            });
            rankOptions.appendChild(button);
        }
    }
    function showFinalRankings(result) {
        const resultsPage = document.querySelector('#resultsPage');
        const rankPage = document.querySelector('#rankPage');
        showHide(resultsPage, rankPage);

        
        let rank = 1;
        const table = document.querySelector('#table');
        result.forEach(item => {
            const tr = document.createElement("tr");
            const th = document.createElement("th");
            th.textContent = rank;
            rank++
            const td = document.createElement("td");
            td.textContent = item;
            tr.appendChild(th);
            tr.appendChild(td);
            table.appendChild(tr);
        });
    }
    return {
        showHide,
        displayRankOptions,
        updateMatch
    }
})();
export {
    ranker,
}
