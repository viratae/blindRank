const ranker = (function rankController() {
    const rankForm = document.querySelector('#rankForm');
    const inputPage = document.querySelector('#inputPage');
    const rankPage = document.querySelector('#rankPage');
    const numberInput = document.querySelector('#numberInput');
    const rankInput = document.querySelector('#rankInput');
    rankForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let rankItems = [];
        let rankInputValues = rankInput.value;
        rankInputValues = rankInputValues.replace(/\s*,\s*/g, ",");
        rankItems = rankInputValues.split(",");
        console.log(rankItems);
        renderer.showHide(rankPage, inputPage);
    });
    let rankings = [];
    function updateRankings(index, value) {
        rankings[index] = value;
        console.log(rankings);
    }
    return {
        updateRankings
    }
})();
const renderer = (function () {
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
                span.textContent = "WOO I CHANGED";
                button.disabled = true;
                ranker.updateRankings(i, "test");
            });
            rankOptions.appendChild(button);
        }
    }
    return {
        showHide,
        displayRankOptions
    }
})();
export {
    ranker,
    
}
renderer.displayRankOptions(5);
