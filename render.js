const ranker = (function rankController() {
    const rankForm = document.querySelector('#rankForm');
    const inputPage = document.querySelector('#inputPage');
    const rankPage = document.querySelector('#rankPage');
    const numberInput = document.querySelector('#numberInput');
    const rankInput = document.querySelector('#rankInput');
    let rankItems = [];
    let count;
    rankForm.addEventListener('submit', (e) => {
        e.preventDefault();
        count = document.querySelector('#numberInput').value;
        let rankInputValues = rankInput.value;
        rankInputValues = rankInputValues.replace(/\s*,\s*/g, ",");
        rankItems = rankInputValues.split(",");
        console.log(rankItems);
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
        console.log(match);
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
                    console.log("FINISHED");
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
